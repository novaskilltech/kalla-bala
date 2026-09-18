import { MetadataRoute } from 'next';
import { kallaBalaData } from '@/kalla-bala.data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kalla-bala.vercel.app';

  const staticRoutes = [
    '',
    '/kalla',
    '/bala',
    '/positions',
    '/quiz',
    '/memorize',
    '/cards',
    '/progress',
    '/glossary',
    '/disagreements',
    '/manzuma',
    '/sources',
    '/author',
    '/sheikh-ali-tawfiq-al-nahhas',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const positionRoutes = kallaBalaData.items.map((item) => ({
    url: `${baseUrl}/positions/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...positionRoutes];
}
