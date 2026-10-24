export async function downloadFromUrl(url: string, fileName: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export async function downloadAll(files: Array<{ url: string; fileName: string }>): Promise<void> {
  for (const file of files) {
    await downloadFromUrl(file.url, file.fileName);
    const { promise, resolve } = Promise.withResolvers<void>();
    window.setTimeout(resolve, 350);
    await promise;
  }
}
