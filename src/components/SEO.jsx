import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, image, canonical, noindex = false, type = 'website' }) {
  const location = useLocation();
  const baseUrl = 'https://authority-engine-app.vercel.app';
  const cleanPath = location.pathname === '/' ? '' : location.pathname.replace(/\/$/, '');
  const currentUrl = canonical || `${baseUrl}${cleanPath}`;
  const defaultTitle = 'Andrew Lam | Operations Excellence, Supply Chain & Analytics';
  const defaultDescription = 'Andrew Lam combines 20+ years in supply chain, warehousing and logistics with process improvement, Power BI, SQL and business analytics.';
  const defaultImage = `${baseUrl}/og-preview.png`;
  const metaTitle = title ? `${title} | Andrew Lam` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;

  useEffect(() => {
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
    setMeta('meta[name="description"]', 'name', 'description', metaDescription);
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');
    setLink('canonical', currentUrl);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Andrew Lam — Operations Intelligence');
    setMeta('meta[property="og:title"]', 'property', 'og:title', metaTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', metaDescription);
    setMeta('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', metaImage);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', metaTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', metaDescription);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', metaImage);
  }, [metaTitle, metaDescription, metaImage, currentUrl, noindex, type]);
  return null;
}
