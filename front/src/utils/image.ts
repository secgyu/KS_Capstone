function getFormDataImages(key: string = 'images', images: any[]) {
  const formData = new FormData();

  images.forEach(image => {
    const uri = image.uri;
    if (!uri) return;
    const fileName = uri.split('/').pop() || `image-${Date.now()}.jpg`;
    const match = /\.(\w+)$/.exec(fileName);
    const type = match ? `image/${match[1]}` : 'image';

    const file = {
      uri,
      type,
      name: fileName,
    };

    formData.append(key, file as any);
  });

  return formData;
}

export { getFormDataImages };
