async function uploadImage(apiKey, base64Image) {
  const url = 'https://api.imgbb.com/1/upload';

  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('image', base64Image);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data;
}

export default uploadImage