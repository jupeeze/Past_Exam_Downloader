const express = require("express");
const axios = require("axios");
const AdmZip = require("adm-zip");
const path = require("path");
const app = express();
const port = 3000;

// 静的ファイルを提供
app.use(express.static(path.join(__dirname, "public")));

app.get("/download", async (req, res) => {
  const repos = [
    {
      owner: "jupeeze",
      repo: "CoinStep_Release",
      path: "Sprite",
      branch: "main",
    },
    {
      owner: "jupeeze",
      repo: "KelpSurvival_Windows",
      path: "KelpSurvival_Data",
      branch: "main",
    },
    // 他のリポジトリをここに追加
  ];

  const zip = new AdmZip();

  for (const repo of repos) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repo.owner}/${repo.repo}/contents/${repo.path}?ref=${repo.branch}`
      );
      const files = response.data;

      for (const file of files) {
        if (file.type === "file") {
          const fileResponse = await axios.get(file.download_url, {
            responseType: "arraybuffer",
          });
          zip.addFile(
            `${repo.repo}/${repo.path}/${file.name}`,
            fileResponse.data
          );
        }
      }
    } catch (error) {
      console.error(`Error fetching folder contents from ${repo.repo}:`, error);
    }
  }

  const zipBuffer = zip.toBuffer();
  res.set("Content-Disposition", "attachment; filename=folders.zip");
  res.set("Content-Type", "application/zip");
  res.send(zipBuffer);
});

// ルートエンドポイントを追加
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
