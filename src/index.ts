import axios from 'axios';
import OpenGraph from './opengraph';
import parse from './parse';

export const parseHtml = parse;

export default async function getOpenGraph(url: string): Promise<OpenGraph> {
  const { data } = await axios.get(url, {
    headers: { 'user-agent': 'googlebot' },
  });

  return parse(data);
}