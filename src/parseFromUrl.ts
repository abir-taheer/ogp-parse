import axios from 'axios';
import OpenGraph from './types/OpenGraph';
import parseHtml from './parseHtml';

export default async function parseFromUrl(url: string): Promise<OpenGraph> {
  const { data } = await axios.get(url, {
    headers: { 'user-agent': 'googlebot' },
  });

  return parseHtml(data);
}