const determiners = ['a', 'an', 'the', '', 'auto'] as const;
export type DeterminerValues = (typeof determiners)[number];

export const isDeterminer = (x: any): x is DeterminerValues => determiners.includes(x);

export type ImageProperties = {
  url: string | null;
  secure_url: string | null;
  type: string | null;
  width: number | null;
  height: number | null;
  alt: string | null;
};

export type AudioProperties = {
  url: string | null;
  secure_url: string | null;
  type: string | null;
};

export interface OpenGraph {
  title: string | null;
  type: string | null;
  description: string | null;
  url: string | null;
  site_name: string | null;
  determiner: DeterminerValues;
  image: ImageProperties[];
  video: ImageProperties[];
  audio: AudioProperties[];
  locale: {
    default: string | null;
    alternate: string[];
  };
}

export default OpenGraph;
