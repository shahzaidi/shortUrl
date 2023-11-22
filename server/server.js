const express = require("express");
const shortid = require("shortid");
const Path = require("./model/urlSchema");
const app = express();
const cors = require("cors");
const dbConnect = require("./db");

const PORT = 4000;

const urlDatabase = {};

app.use(express.json());
app.use(cors());
dbConnect();

app.get("/getallurl", async (req, res) => {
  const urls = await Path.find();
  res
    .status(200)
    .json({ success: true, shortenurl: urls.map((url) => url.shortenURL) });
});

app.post("/api/short", async (req, res) => {
  const { url } = req.body;

  try {
    if (!url) {
      return res
        .status(400)
        .json({ success: false, message: "url missing from body" });
    } else if (url.length <= 15) {
      return res.status(400).json({
        success: false,
        message: "url length must be more than 30 charcter",
      });
    }

    const shortURL = shortid.generate();
    urlDatabase[shortURL] = url;

    // console.log(urlDatabase, "database url");

    // const shortenUrl = `http://localhost:${PORT}/${shortURL}`;

    const path = await Path.create({
      originalURL: url,
      shortenURL: shortURL,
    });

    res
      .status(200)
      .json({ success: true, path, message: "Url addede Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/:shortUrl", async (req, res) => {
  //   const shortenlURL = shortUrl.toString();
  try {
    var { shortUrl } = req.params;
    // console.log(shortUrl, "hhuhsuhujujsds");
    const originalUrl = await Path.findOne({ shortenURL: shortUrl });
    // console.log(originalUrl, "jjjhjhjhjh");
    if (!originalUrl) {
      return res.status(400).json({ success: false, message: "url not found" });
    }
    res
      .status(200)
      .json({ success: true, originalUrl: originalUrl.originalURL });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
