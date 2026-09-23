// Public reads share one contract; write credentials remain server-only.
export const publishedPostFilter = '_type == "post" && !(_id in path("drafts.**")) && !(_id in path("versions.**"))';
export const articleListQuery = `*[${publishedPostFilter} && defined(slug.current)] | order(publishedAt desc){_id,title,"slug":slug.current,category,publishedAt,readTime,excerpt}`;
export const articleQuery = `*[${publishedPostFilter} && slug.current == $slug][0]{_id,title,category,publishedAt,readTime,excerpt,keyTakeaways,content,body}`;

export async function fetchPublishedContent(query, params = {}, { signal, fetcher = fetch, timeoutMs = 12000, useCdn = true } = {}) {
  const controller = new AbortController();
  const abort = () => controller.abort(signal?.reason);
  if (signal?.aborted) abort();
  else signal?.addEventListener('abort', abort, { once: true });
  const timeout = setTimeout(() => controller.abort(new DOMException('Content request timed out', 'TimeoutError')), timeoutMs);
  const search = new URLSearchParams({ query, perspective: 'published' });
  for (const [key, value] of Object.entries(params)) search.set(`$${key}`, JSON.stringify(value));
  try {
    const response = await fetcher(`https://h3pl1rfx.${useCdn ? 'apicdn' : 'api'}.sanity.io/v2024-01-01/data/query/production?${search}`, {
      signal: controller.signal,
      credentials: 'omit',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Content service returned ${response.status}.`);
    const data = await response.json();
    if (!data || data.error || !Object.hasOwn(data, 'result')) throw new Error('Content service returned an invalid response.');
    return data.result;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}

export function validInsightSlug(value) {
  return typeof value === 'string' && value.length > 0 && value.length <= 200 && !/[\s/\\?#]/u.test(value) && !Array.from(value).some((character) => character.charCodeAt(0) < 32);
}

const text = (value, fallback = '') => typeof value === 'string' ? value : fallback;

export function normalizeArticleList(data) {
  if (!Array.isArray(data)) throw new Error('Content service returned an invalid article list.');
  return data.filter((article) => article && validInsightSlug(article.slug) && text(article.title).trim()).map((article) => ({
    _id: text(article._id, article.slug),
    slug: article.slug,
    title: article.title,
    category: text(article.category, 'Insight'),
    readTime: text(article.readTime, '5 min'),
    excerpt: controlledArticles[article.slug]?.overview || text(article.excerpt),
  }));
}

export function normalizeArticle(data, slug) {
  if (!data || !text(data.title).trim()) return null;
  const publishedAt = data.publishedAt ? new Date(data.publishedAt) : null;
  const date = publishedAt && !Number.isNaN(publishedAt.getTime())
    ? publishedAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    : 'Date not listed';
  const body = Array.isArray(data.body)
    ? data.body.map((block) => Array.isArray(block?.children) ? block.children.map((child) => text(child?.text)).join('') : '').filter(Boolean).join('\n\n')
    : text(data.body);
  const controlled = Object.hasOwn(controlledArticles, slug) ? controlledArticles[slug] : null;
  return {
    title: data.title,
    category: text(data.category, 'Case Studies'),
    date,
    readTime: text(data.readTime, '5 min read'),
    overview: controlled?.overview || text(data.excerpt),
    keyTakeaways: controlled?.keyTakeaways || (Array.isArray(data.keyTakeaways) ? data.keyTakeaways.filter((item) => typeof item === 'string') : []),
    content: controlled?.content || text(data.content) || body || text(data.excerpt),
    controlled: Boolean(controlled),
  };
}

export const controlledArticles = {
  'the-hidden-cost-of-inefficient-warehouse-logistics': {
    overview: 'Experience-based operational ranges drawn from anonymised career records. They are not independently audited benchmarks and remain subject to source-led verification.',
    keyTakeaways: [
      'Grocery logistics: experience-based ranges of 20–40 daily deliveries and 800–2,000 SKUs',
      'International freight: experience-based ranges of 15–30 weekly shipments and 95–99% on-time performance',
      'Maxwell Excel: current container operations are supported by an anonymised 391-job operating dataset',
    ],
    content: 'Evidence boundary\n\nThe figures in this article are experience-based operational ranges reconstructed from anonymised career records. They are not independently audited benchmarks. Use them as structured evidence for discussion, not as guaranteed or universally applicable performance claims.\n\nOperational context\n\nHigh-volume distribution requires close coordination of container scheduling, manpower deployment, shipment documentation and stock accuracy. The ranges illustrate the scale and decision environment across grocery distribution, international freight and container operations.\n\nVerification rule\n\nAny range used in a résumé, interview or commercial claim must be supported by the strongest available source record. Where that source is unavailable, the range remains experience-based rather than verified.'
  },
  'supply-chain-control-tower-early-warning-system': {
    overview: 'AI-assisted synthetic demonstration of a weighted-rule early-warning method. The 24-day result comes from an engineered scenario, not a trained predictive model or measured production outcome.',
    keyTakeaways: [
      'Synthetic weighting: 35% inventory cover, 25% supplier performance, 20% backlog and 20% trajectory risk',
      'Scenario lead time: the engineered test surfaced a warning 24 days before its configured threshold breach',
      'Method demonstration: Python, SQL and Power BI-ready decision reporting',
    ],
    content: 'Evidence boundary\n\nThis is an AI-assisted synthetic demonstration. Its inputs and deterioration path were engineered to test an inspectable weighted-rule method. The 24-day warning is a scenario result; it is not a trained or validated predictive model, an employer deployment or a measured production outcome.\n\nMethod\n\nThe demonstration combines four synthetic vectors: inventory cover at 35%, supplier performance at 25%, backlog risk at 20% and trajectory risk at 20%. The rule set is designed to make each contribution inspectable and to show how weak signals can be combined before a conventional red, amber or green threshold changes.\n\nDecision use\n\nPower BI-ready decomposition and drill-through views illustrate how a manager could inspect the score and choose an intervention. Real deployment would require governed source data, back-testing, calibration, monitoring and documented decision ownership.'
  },
  'cold-chain-risk-intelligence-and-performance-analytics': {
    overview: 'AI-assisted synthetic demonstration using 1,800 generated records across six warehouse zones. It illustrates analysis and decision-support design, not employer deployment or measured production impact.',
    keyTakeaways: [
      'Synthetic dataset: 1,800 generated records across six warehouse zones',
      'Illustrated triggers: door-open duration, thermal integrity, processing delay and shift review',
      'Demonstration stack: SQL, Python and Power BI-ready reporting',
    ],
    content: 'Evidence boundary\n\nThis is an AI-assisted synthetic demonstration built from 1,800 generated records across six warehouse zones. The records are not employer data. The alerts, staffing reviews and maintenance triggers illustrate an analytical method; they are not deployed controls or measured production outcomes.\n\nAnalytical method\n\nThe demonstration checks data quality and explores temperature compliance, processing duration and shift-level patterns. It shows how door-open duration, thermal integrity and processing delay could be organised into inspectable management signals.\n\nDeployment boundary\n\nA real cold-chain implementation would require validated sensors and source systems, site-specific thresholds, quality and safety ownership, change control, false-alert monitoring and evidence that interventions improve outcomes without creating new risk.'
  }
};
