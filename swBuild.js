const fs = require("fs");
const BASE_URL = "./public/_next/static";
const DEST_FILE = "./public/sw-dynamic-assets.js";
const events = require("events");
const fileEvent = new events.EventEmitter();
let assetsArray = [];

fs.readdir(BASE_URL, (err, folders) => {
  folders.forEach(subFolder => {
    fs.readdir(`${BASE_URL}/${subFolder}`, (err, files) => {
      files.forEach(file => {
        if (file === "pages") {
          fs.readdir(`${BASE_URL}/${subFolder}/${file}`, (err, files) => {
            files.forEach((subFile, i) => {
              assetsArray.push(`"${BASE_URL}/${subFolder}/${file}/${subFile}"`.replace("./public", ""));
              if (i === files.length - 1) {
                fileEvent.emit("file-finished");
              }
            });
          });
        } else {
          assetsArray.push(`"${BASE_URL}/${subFolder}/${file}"`.replace("./public", ""));
        }
      });
    });
  });
});

fileEvent.on("file-finished", () => {
  console.log(assetsArray);
  fs.writeFile(DEST_FILE, "", () => {
    fs.appendFile(DEST_FILE, `const dynamicAssets = [${assetsArray}]`, err => {
      if (err) {
        console.log(err);
      }
    });
  });
});
