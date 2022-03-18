const fs = require('fs');
const pathToFile = process.env.pathToFile;


function readFile(fileName) {
  const data = fs.readFileSync(pathToFile + fileName);
  return JSON.parse(data.toString());
}

function writeFile(fileName,data) {
  fs.writeFileSync(pathToFile + fileName, JSON.stringify(data), (err) => {
    if (err) {
      return alert(err);
    }
  });
}

module.exports.readFile = readFile;
module.exports.writeFile = writeFile;