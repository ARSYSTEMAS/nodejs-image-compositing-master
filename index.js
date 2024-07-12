const express = require("express");
const app = express();
const sharp = require("sharp");
const path = require("path");

app.use(express.json());
app.use("/public", express.static("./public"));

app.get("/watermark/:filename", async (req, res, next) => {
  try {

    addTextOnImage()

    const { filename } = req.params;

    console.log('filename es ', filename)
    
    const image = await sharp(path.join(__dirname, "public", filename))
      .composite([
        {
          input: path.join(__dirname, "logo", "svg-image-comanda.png"),
          top: 0,
          left: 0,
        },
      ])
      .toBuffer();
          // Guarda la imagen en el disco (por ejemplo, en la carpeta 'uploads')
    const outputPath = path.join(__dirname, "logo", "sammy-text-overlay.jpg");
    await fs.writeFile(outputPath, image);
    res.setHeader("content-type", "image/jpeg");
    res.send(image);
  } catch (error) {
    next();
  }
});



async function addTextOnImage() {
  try {
    const width = 1080;
    const height = 1080;
    const text = "Sammy the Shark";

    const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
      .title { fill: #001; font-size: 50px; font-weight: bold;}
      </style>
      <text x="25%" y="98%" text-anchor="middle" class="title">${text}</text>
    </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    const image = await sharp(svgBuffer).toFile("svg-image.png");
  } catch (error) {
    console.log(error);
  }
}


app.listen(5000, () => {
  console.log("Listening on port 5000.");
});
