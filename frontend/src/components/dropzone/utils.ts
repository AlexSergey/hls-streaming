export const convertFileToBlob = async (files: File[]): Promise<{ filename: string; blob: Blob }[]> => {
  const blobs = [];
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
      blobs.push({ blob, filename: file.name });
    }
  }

  return blobs;
};
