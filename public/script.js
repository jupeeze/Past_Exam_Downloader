document.getElementById("downloadButton").addEventListener("click", () => {
  fetch("https://jupeeze.github.io/Past_Exam_Downloader/download")
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
