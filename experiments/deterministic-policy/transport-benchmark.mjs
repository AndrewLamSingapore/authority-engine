import { createServer as createHttpServer } from 'node:http';
import { createServer as createNetServer, createConnection } from 'node:net';
import { once } from 'node:events';
import { performance } from 'node:perf_hooks';
import { writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import assert from 'node:assert/strict';
import { branchVerdict } from './kernel.mjs';
const marker = 'synthetic-loopback-fixture';
const envelope = { state: 82, authorization: marker };
const encoded = JSON.stringify(envelope);
function invoke(input) {
  if (!input || input.authorization !== marker) throw new Error('Unauthorized fixture');
  if (Object.keys(input).sort().join(',') !== 'authorization,state') throw new Error('Invalid envelope');
  return { verdict: branchVerdict(input.state) };
}
assert.deepEqual(invoke(envelope), { verdict: 2 });
assert.throws(() => invoke({ state: 82, authorization: 'invalid' }));
const reply = text => JSON.stringify(invoke(JSON.parse(text)));
const pipePath = process.platform === 'win32' ? `\\\\.\\pipe\\abex-verdict-${process.pid}` : `${os.tmpdir()}/abex-verdict-${process.pid}.sock`;
const pipe = createNetServer(socket => {
  socket.setTimeout(5000, () => socket.destroy()); let buffer = '';
  socket.on('error', () => {});
  socket.on('data', chunk => {
    buffer += chunk;
    if (buffer.length > 4096) { socket.destroy(); return; }
    let index;
    while ((index = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0,index); buffer = buffer.slice(index+1);
      try { socket.write(reply(line)+'\n'); } catch { socket.destroy(); }
    }
  });
});
const http = createHttpServer((request,response) => {
  if (request.method !== 'POST' || request.url !== '/verdict') { response.writeHead(404).end(); return; }
  let body=''; request.setTimeout(5000, () => request.destroy());
  request.on('data', chunk => { body += chunk; if (body.length > 4096) request.destroy(); });
  request.on('end', () => {
    try { response.writeHead(200, { 'content-type': 'application/json' }).end(reply(body)); }
    catch { response.writeHead(400).end(); }
  });
});
const summary = values => {
  const sorted=[...values].sort((a,b)=>a-b), mean=values.reduce((a,b)=>a+b,0)/values.length;
  return { p50: sorted[Math.ceil(.50*sorted.length)-1], p95: sorted[Math.ceil(.95*sorted.length)-1], p99: sorted[Math.ceil(.99*sorted.length)-1], mean, stddev: Math.sqrt(values.reduce((a,n)=>a+(n-mean)**2,0)/values.length) };
};
function pipeClient() {
  const socket=createConnection(pipePath); let resolveResponse, rejectResponse, buffer='';
  socket.on('data', chunk => { buffer += chunk; const index=buffer.indexOf('\n'); if(index>=0){ const line=buffer.slice(0,index);buffer=buffer.slice(index+1);resolveResponse?.(JSON.parse(line));resolveResponse=undefined;rejectResponse=undefined; } });
  socket.on('error', error => rejectResponse?.(error));
  return { ready: once(socket,'connect'), request: () => new Promise((resolve,reject) => { resolveResponse=resolve;rejectResponse=reject;socket.write(encoded+'\n'); }), close: () => socket.end() };
}
const results=[];
try {
  pipe.listen(pipePath); http.listen(0,'127.0.0.1'); await Promise.all([once(pipe,'listening'),once(http,'listening')]);
  const url=`http://127.0.0.1:${http.address().port}/verdict`;
  for (const concurrency of [1,4]) for (const method of ['direct_object','direct_json','local_ipc_json','http_json']) {
    const clients=method==='local_ipc_json' ? Array.from({length:concurrency},pipeClient) : [];
    await Promise.all(clients.map(client=>client.ready));
    const latency=[]; let success=0; const callsPerWorker=256, warmupPerWorker=32;
    const operation=async worker => {
      if(method==='direct_object') return invoke(envelope);
      if(method==='direct_json') return JSON.parse(reply(encoded));
      if(method==='local_ipc_json') return clients[worker].request();
      const response=await fetch(url,{method:'POST',headers:{'content-type':'application/json'},body:encoded});
      assert.equal(response.status,200); return response.json();
    };
    const workers = async measure => Promise.all(Array.from({length:concurrency},async(_,worker)=>{
      for(let i=0;i<(measure?callsPerWorker:warmupPerWorker);i++){
        const started=performance.now(), result=await operation(worker); assert.equal(result.verdict,2);
        if(measure){latency.push((performance.now()-started)*1000);success++;}
      }
    }));
    await workers(false); const cpu=process.cpuUsage(),started=performance.now();await workers(true);const duration=performance.now()-started,used=process.cpuUsage(cpu);
    for(const client of clients) client.close();
    results.push({method,concurrency,requests:success,duration_ms:duration,requests_per_second:success/(duration/1000),latency_microseconds:summary(latency),cpu_microseconds:used.user+used.system});
  }
} finally {
  http.closeAllConnections(); await new Promise(resolve=>http.close(resolve)); await new Promise(resolve=>pipe.close(resolve));
}
const report={generated_at:new Date().toISOString(),source_commit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),benchmark_sha256:createHash('sha256').update(readFileSync(new URL('./transport-benchmark.mjs',import.meta.url))).digest('hex'),kernel_sha256:createHash('sha256').update(readFileSync(new URL('./kernel.mjs',import.meta.url))).digest('hex'),unit:'complete synthetic authorized leaf-envelope request',results,runtime:process.versions,platform:os.platform(),os_release:os.release(),cpu:os.cpus()[0]?.model,methodology:{payload_bytes:Buffer.byteLength(encoded),warmup_per_worker:32,measured_per_worker:256,connection_policy:'persistent IPC connection per worker; HTTP fetch connection pool/keepalive; direct methods in same event loop',security:'loopback or local IPC; fixed synthetic credential validated on every path; no TLS, network transit, real identity, production rate limit or fault boundary measured',operations:'same envelope validation, integer leaf function and output; direct_object omits serialization, direct_json is serialization control',other_host_workloads:'normal host, not isolated',not_tested:['native ABI','gRPC','message queues','Unix-domain sockets on Windows','authenticated cross-host or TLS service','production end-to-end transaction'],interpretation:'specific application and transport measurement only; do not generalize HTTP percentage or collapse service trust/failure boundaries'},memory:process.memoryUsage()};
if(process.argv[2])writeFileSync(process.argv[2],JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({output:process.argv[2],results}));
