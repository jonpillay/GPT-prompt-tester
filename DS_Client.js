// const fs = require('fs');
import imgBBUploader from './imgBBUploader.js'

const engineId = 'stable-diffusion-xl-beta-v2-2-2';
const apiHost = 'https://api.stability.ai';
const apiKey = process.env.DS_KEY;

if (!apiKey) throw new Error('Missing Stability API key.');

async function DSGenerateImage(prompts) {
  const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
      
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: prompts,
        },
      ],
      cfg_scale: 7,
      clip_guidance_preset: 'FAST_BLUE',
      height: 512,
      width: 512,
      samples: 1,
      steps: 50,
      style_preset: 'enhance',
    }),
  });

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  const responseJSON = await response.json();
  const imagePromises = responseJSON.artifacts.map(async (image, index) => {
    const remoteImage = await imgBBUploader(process.env.IMGBB_KEY, image.base64);

    return remoteImage.data.display_url;
  });
  
  const imageUrls = await Promise.all(imagePromises);

  return imageUrls;
  
}

export default DSGenerateImage