import { parse as parseHtml } from 'node-html-parser';

export type MetaTag = {
  name: string;
  content: string;
};

export default function getMetaTags(html: string): MetaTag[] {
  const tags: MetaTag[] = [];

  const root = parseHtml(html);

  const metaTagElements = root.querySelectorAll('meta');

  metaTagElements.forEach((element) => {
    const name = element.getAttribute('name');
    const property = element.getAttribute('property');

    let ogName: string | null = null;

    if (name && name.startsWith('og:')) {
      ogName = name;
    } else if (property && property.startsWith('og:')) {
      ogName = property;
    }

    let content = element.getAttribute('content');

    if (content && ogName) {
      tags.push({
        name: ogName,
        content,
      });
    }
  });

  return tags;
}
