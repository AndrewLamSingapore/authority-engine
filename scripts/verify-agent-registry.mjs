import fs from 'node:fs';

const path = new URL('../public/data/jarvis-agent-registry.json', import.meta.url);
const registry = JSON.parse(fs.readFileSync(path, 'utf8'));
const forbidden = new Set(['system_prompt','credentials','endpoint','filesystem_path','tool_secrets','internal_instructions']);

if (registry.schema_version !== '1.0.0') throw new Error(`unexpected schema ${registry.schema_version}`);
if (!registry.last_updated) throw new Error('missing last_updated');
if (!registry.orchestrator || registry.orchestrator.id !== 'prime') throw new Error('invalid orchestrator');
if (!Array.isArray(registry.agents) || registry.agents.length !== 29) throw new Error(`expected 29 agents, got ${registry.agents?.length}`);

const ids = new Set(registry.agents.map(a => a.id));
if (ids.size !== 29) throw new Error('agent IDs must be unique');
for (const agent of registry.agents) {
  for (const key of Object.keys(agent)) if (forbidden.has(key)) throw new Error(`forbidden field ${key} on ${agent.id}`);
  if (!agent.reports_to || (agent.reports_to !== 'prime' && !ids.has(agent.reports_to))) throw new Error(`orphan ${agent.id}`);
}

const parent = new Map(registry.agents.map(a => [a.id, a.reports_to]));
for (const agent of registry.agents) {
  const seen = new Set(); let node = agent.id;
  while (node !== 'prime') {
    if (seen.has(node)) throw new Error(`cycle at ${agent.id}`);
    seen.add(node); node = parent.get(node);
    if (!node) throw new Error(`orphan chain at ${agent.id}`);
  }
}

console.log(JSON.stringify({ok:true, agents:29, schema_version:registry.schema_version, last_updated:registry.last_updated}));
