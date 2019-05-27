const fs = require("fs");
const BASE_URL = "./public/_next/static";
const DEST_FILE = "./public/sw-dynamic-assets.js";
const { resolve } = require("path");
const { readdir, stat, writeFile, appendFile } = require("fs").promises;
const exec = require("child_process").exec;
const crypto = require("crypto");

const getHash = content => {
  const hash = crypto.createHash("md5");
  //passing the data to be hashed
  data = hash.update(content, "utf-8");
  //Creating the hash in the required format
  gen_hash = data.digest("hex");
  return gen_hash;
};

async function generateServiceWorkerVersion() {
  console.log("hashing file...");

  return new Promise((resolve, reject) => {
    //Creating a readstream to read the file
    const myReadStream = fs.createReadStream(DEST_FILE);

    let rContents = ""; // to hold the read contents;

    myReadStream.on("data", function(chunk) {
      rContents += chunk;
    });

    myReadStream.on("error", function(err) {
      console.log(err);
      reject(err);
    });

    myReadStream.on("end", function() {
      //Calling the getHash() function to get the hash
      const content = getHash(rContents);
      console.log("Hash : " + content);
      resolve();
    });
  });

  // exec("sed -i '71s/.*/<?php wp_head() ?>/' index.php &&");
}

//Get and array of all the files contined in the _next/ folder
async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async subdir => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

//Write the all the files path into sw-dynamic-asset.js
getFiles(BASE_URL)
  .then(async fileaPaths => {
    const assetsPathArray = fileaPaths
      .map(filePath =>
        filePath.replace("/home/madeo/Projects/hirviblog/public", "")
      )
      .map(filePath => `"${filePath}"`);

    console.log(assetsPathArray);

    await writeFile(DEST_FILE, "");
    await appendFile(DEST_FILE, `const dynamicAssets = [${assetsPathArray}]`);
    await generateServiceWorkerVersion();
  })
  .catch(err => {
    console.log(err);
  });
