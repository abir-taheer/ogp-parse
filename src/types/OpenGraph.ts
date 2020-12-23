import ImageProperties from './ImageProperties';
import DeterminerValues from './DeterminerValues';
import AudioProperties from './AudioProperties';


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
