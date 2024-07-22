document.getElementById("downloadButton").addEventListener("click", () => {
  fetch("http://localhost:3000/download")
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "folders.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch((error) => console.error("Error downloading ZIP file:", error));
});
