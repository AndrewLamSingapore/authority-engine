export const inquiryTypes = ['Operations Excellence Opportunity','Supply Chain or Analytics Collaboration','JARVIS / Governed AI Conversation','VELYQUA / Water Intelligence','The Portal / Discovery Collaboration','Living Worlds / Creative Collaboration','Sky Tablet / Research Conversation','Professional Inquiry','Maxwell Container Service'];
const sources = {
  'authority-engine': ['Authority Engine','Operations Excellence Opportunity',''],
  github: ['GitHub','Professional Inquiry',''],
  portal: ['The Portal','The Portal / Discovery Collaboration','I’d like to explore a connection or collaboration around The Portal.'],
  velyqua: ['VELYQUA','VELYQUA / Water Intelligence','I’d like to discuss a living-water challenge or a VELYQUA collaboration.'],
  'game-platform': ['Living Worlds','Living Worlds / Creative Collaboration','I’d like to discuss Living Worlds, world-building or a creative collaboration.'],
  'sky-tablet': ['The Sky Tablet','Sky Tablet / Research Conversation','I’d like to share a question, source or collaboration idea about The Sky Tablet.'],
  'maxwell-excel': ['Maxwell Excel','Maxwell Container Service','I’d like to discuss a container-handling requirement.'],
  jarvis: ['JARVIS','JARVIS / Governed AI Conversation','I’d like to discuss a practical governed-AI use case.'],
};
export function contactContext(search = '', state = {}) {
  const key = new URLSearchParams(search).get('source');
  const [source, inquiryType, message] = (Object.hasOwn(sources, key) ? sources[key] : sources['authority-engine']);
  return { source, inquiryType: inquiryTypes.includes(state?.inquiryType) ? state.inquiryType : inquiryType, message: typeof state?.message === 'string' ? state.message.slice(0,4000) : message };
}
