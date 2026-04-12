export const uploadImage = async (file: File): Promise<string | null> => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const { url } = await response.json();
  return url;
};
