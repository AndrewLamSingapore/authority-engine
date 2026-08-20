import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, image, canonical }) {
  const location = useLocation();
  const baseUrl = 'https://authority-engine-app.vercel.app';
  const currentUrl = canonical || `${baseUrl}${location.pathname}`;
  const defaultTitle = 'Andrew Lam | Operations Excellence & Supply Chain Analytics';
  const defaultDescription = 'Operations-first portfolio combining 20+ years of logistics and warehouse experience with Power BI and business analytics.';
  const defaultImage = image || `https://og-image.vercel.app/${encodeURIComponent(
    title || 'Andrew Lam | Operations Excellence'
  )}.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg`;

  const metaTitle = title ? `${title} | Authority Engine` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;

  useEffect(() => {
    document.title = metaTitle;

    const setMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    setMetaTag('meta[name="description"]', 'name', 'description', metaDescription);
    setLinkTag('canonical', currentUrl);

    // Open Graph
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', metaTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metaDescription);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', metaImage);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');

    // Twitter
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', metaTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metaDescription);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', metaImage);
  }, [metaTitle, metaDescription, metaImage, currentUrl]);

  return null;
}
