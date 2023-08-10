import { getPlaiceholder } from 'plaiceholder';

// for one Image
export const getBase64 = async (imageUrl: string) => {
  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw Error(
        `Failed to fetch imageUrl: ${res.status} - ${res.statusText}`
      );
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (error) {
    console.log(error);
  }
};

// for many images avoiding waterfall using Promise.allSettled()
export async function getBlurredImages(images: { imageUrl: string }[]) {
  const get64Promises = images.map(({ imageUrl }) => getBase64(imageUrl));

  const base64Results = await Promise.allSettled(get64Promises);

  const imagesWithBlur = images.map((image: any, idx: number) => {
    image.photoBlurredData = base64Results[idx];
    return image;
  });

  return imagesWithBlur;
}
