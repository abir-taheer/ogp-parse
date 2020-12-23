import MetaTag from './types/MetaTag';
import { HTMLElement } from 'node-html-parser';

export default function getMetaTags(root: HTMLElement): MetaTag[] {
  const tags: MetaTag[] = [];

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
