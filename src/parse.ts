import OpenGraph, {
  AudioProperties,
  DeterminerValues,
  ImageProperties,
  isDeterminer,
} from './opengraph';
import getMetaTags from './getMetaTags';

export default async function parse(html: string): Promise<OpenGraph> {
  let title: string | null = null;
  let type: string | null = null;
  let url: string | null = null;
  let site_name: string | null = null;
  let description: string | null = null;
  let determiner: DeterminerValues = 'auto';
  let image: ImageProperties[] = [];
  let alternateLocales: string[] = [];
  let locale: string | null = null;
  let video: ImageProperties[] = [];
  let audio: AudioProperties[] = [];

  const tags = getMetaTags(html);

  for (let i = 0; i < tags.length; i++) {
    const { name, content } = tags[i];

    if (!title && name === 'og:title') {
      title = content;
      continue;
    }

    if (!type && name === 'og:type') {
      type = content;
      continue;
    }

    if (!url && name === 'og:url') {
      url = content;
      continue;
    }

    if (!site_name && name === 'og:site_name') {
      site_name = content;
      continue;
    }

    if (!description && name == 'og:description') {
      description = content;
      continue;
    }

    if (name === 'og:determiner' && isDeterminer(content)) {
      determiner = content;
      continue;
    }

    if (name.startsWith('og:image')) {
      let imageIndex = image.length - 1;

      // If no images have been added yet, add the first image object
      if (imageIndex === -1) {
        image.push({
          url: null,
          alt: null,
          height: null,
          secure_url: null,
          type: null,
          width: null,
        });
        imageIndex++;
      }

      const currentImage = image[imageIndex];

      // This might be adding to the current image object or starting a new one
      if (name === 'og:image' || name === 'og:image:url') {
        // If the current image object doesn't have a url don't start a new one
        if (currentImage.url === null) {
          image[imageIndex].url = content;
        } else {
          image.push({
            url: content,
            alt: null,
            height: null,
            secure_url: null,
            type: null,
            width: null,
          });
        }
        continue;
      }

      if (name === 'og:image:height') {
        currentImage.height = parseInt(content);
        continue;
      }

      if (name === 'og:image:width') {
        currentImage.width = parseInt(content);
        continue;
      }

      if (name === 'og:image:alt') {
        currentImage.alt = content;
        continue;
      }

      if (name === 'og:image:secure_url') {
        currentImage.secure_url = content;
        continue;
      }

      if (name === 'og:image:type') {
        currentImage.type = content;
        continue;
      }
    }

    if (name === 'og:locale') {
      locale = content;
      continue;
    }

    if (name === 'og:locale:alternate') {
      alternateLocales.push(content);
      continue;
    }

    if (name.startsWith('og:video')) {
      let videoIndex = video.length - 1;

      // If no images have been added yet, add the first image object
      if (videoIndex === -1) {
        video.push({
          url: null,
          alt: null,
          height: null,
          secure_url: null,
          type: null,
          width: null,
        });
        videoIndex++;
      }

      const currentVideo = video[videoIndex];

      // This might be adding to the current image object or starting a new one
      if (name === 'og:video' || name === 'og:video:url') {
        // If the current image object doesn't have a url don't start a new one
        if (currentVideo.url === null) {
          video[videoIndex].url = content;
        } else {
          video.push({
            url: content,
            alt: null,
            height: null,
            secure_url: null,
            type: null,
            width: null,
          });
        }
        continue;
      }

      if (name === 'og:video:height') {
        currentVideo.height = parseInt(content);
        continue;
      }

      if (name === 'og:video:width') {
        currentVideo.width = parseInt(content);
        continue;
      }

      if (name === 'og:video:alt') {
        currentVideo.alt = content;
        continue;
      }

      if (name === 'og:video:secure_url') {
        currentVideo.secure_url = content;
        continue;
      }

      if (name === 'og:video:type') {
        currentVideo.type = content;
        continue;
      }
    }

    if (name.startsWith('og:audio')) {
      let audioIndex = audio.length - 1;

      // If no images have been added yet, add the first image object
      if (audioIndex === -1) {
        audio.push({
          url: null,
          secure_url: null,
          type: null,
        });
        audioIndex++;
      }

      const currentAudio = audio[audioIndex];

      if (name === 'og:audio' || name === 'og:audio:url') {
        // If the current image object doesn't have a url don't start a new one
        if (currentAudio.url === null) {
          audio[audioIndex].url = content;
        } else {
          audio.push({
            url: content,
            secure_url: null,
            type: null,
          });
        }
        continue;
      }

      if(name === "og:audio:secure_url"){
        currentAudio.secure_url = content;
        continue;
      }

      if(name === "og:audio:type"){
        currentAudio.type = content;
      }
    }
  }

  return {
    url,
    site_name,
    type,
    title,
    description,
    determiner,
    audio,
    image,
    video,
    locale: {
      default: locale,
      alternate: alternateLocales,
    },
  };
}
