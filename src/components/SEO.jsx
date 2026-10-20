import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, image, favicon, canonical, noindex = false, type = 'website' }) {
  const location = useLocation();
  const baseUrl = 'https://authority-engine-app.vercel.app';
  const cleanPath = location.pathname === '/' ? '' : location.pathname.replace(/\/$/, '');
  const currentUrl = canonical || `${baseUrl}${cleanPath || '/'}`;
  const defaultTitle = 'Andrew Lam | Authority Engine';
  const defaultDescription = "Andrew Lam's public evidence system for operations leadership, analytics, applied AI and inspectable experiments.";
  const defaultImage = `${baseUrl}/og-preview.png`;
  const metaTitle = title ? `${title} | Andrew Lam` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;

  useEffect(() => {
    if (!favicon) return undefined;
    const previous = document.querySelector('link[rel="icon"]');
    const attributes = previous ? [...previous.attributes].map(({ name, value }) => [name, value]) : null;
    const icon = previous || document.createElement('link');
    icon.setAttribute('rel', 'icon');
    icon.setAttribute('href', favicon);
    icon.setAttribute('type', 'image/png');
    if (!previous) document.head.appendChild(icon);
    return () => {
      if (icon.getAttribute('href') !== favicon) return;
      if (!previous) { icon.remove(); return; }
      for (const attribute of [...icon.attributes]) icon.removeAttribute(attribute.name);
      for (const [name, value] of attributes) icon.setAttribute(name, value);
    };
  }, [favicon]);

  useEffect(() => {
    const imageSnapshots = image ? ['meta[property="og:image"]', 'meta[name="twitter:image"]'].map(selector => {
      const element = document.querySelector(selector);
      return { selector, existed: Boolean(element), content: element?.getAttribute('content') ?? null };
    }) : [];
    document.title = metaTitle;
    const setMeta = (selector, attr, key, content) => {
      let element = document.querySelector(selector);
      if (!element) { element = document.createElement('meta'); element.setAttribute(attr, key); document.head.appendChild(element); }
      element.setAttribute('content', content);
    };
    const setLink = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) { element = document.createElement('link'); element.rel = rel; document.head.appendChild(element); }
      element.href = href;
    };
    setMeta('meta[name="title"]', 'name', 'title', metaTitle);
    setMeta('meta[name="description"]', 'name', 'description', metaDescription);
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');
    setLink('canonical', currentUrl);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Andrew Lam — Authority Engine');
    setMeta('meta[property="og:title"]', 'property', 'og:title', metaTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', metaDescription);
    setMeta('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', metaImage);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', metaTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', metaDescription);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', metaImage);
    return () => {
      for (const snapshot of imageSnapshots) {
        const element = document.querySelector(snapshot.selector);
        if (element?.getAttribute('content') !== metaImage) continue;
        if (!snapshot.existed) element.remove();
        else if (snapshot.content === null) element.removeAttribute('content');
        else element.setAttribute('content', snapshot.content);
      }
    };
  }, [metaTitle, metaDescription, metaImage, currentUrl, noindex, type, image]);
  return null;
}
