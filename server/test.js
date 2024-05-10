const fs = require("fs");
const path = require("path");

let fileInfo = [];
// 从文件内容中提取标签
function extractTags(content) {
  const tagsMatch = content.match(/^tags:\s+(.*)$/im);
  return tagsMatch ? tagsMatch[1] : null;
}

// 从文件内容中提取摘要
function extractSummary(content) {
  const summaryMatch = content.match(/^summary:\s+(.*)$/im);
  return summaryMatch ? summaryMatch[1] : null;
}

// 从文件内容中提取分类
function extractCategory(content) {
  const categoryMatch = content.match(/^category:\s+(.*)$/im);
  return categoryMatch ? categoryMatch[1] : null;
}

// 从文件内容中提取图片
function extractImage(content) {
  const imageMatch = content.match(/^image:\s+(.*)$/im);
  return imageMatch ? imageMatch[1] : null;
}

function extractContent(content) {
  return content.replace(/---[\s\S]*?---/, "");
}

function readDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const fileInfoPromises = [];

      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        fileInfoPromises.push(
          new Promise((resolve, reject) => {
            fs.stat(filePath, (err, stats) => {
              if (err) {
                reject(err);
                return;
              }

              if (stats.isFile() && path.extname(filePath) === ".md") {
                const fileName = path.basename(
                  filePath,
                  path.extname(filePath)
                );
                processFile(filePath, fileName, stats)
                  .then(resolve)
                  .catch(reject);
              } else if (stats.isDirectory()) {
                readDirectory(filePath).then(resolve).catch(reject);
              } else {
                resolve();
              }
            });
          })
        );
      });
      Promise.all(fileInfoPromises).then(resolve).catch(reject);
    });
  });
}

function processFile(filePath, fileName, stats) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        reject(err);
        return;
      }

      const title = fileName;
      const date = formatTime(stats.birthtime);
      const updateDate = formatTime(stats.mtime);
      let tags = extractTags(content);
      tags = tags
        ? tags
            .substring(1, tags.length - 1)
            .split(",")
            .map((item) => item.trim())
        : [];
      const summary = extractSummary(content).trim().replace(/^'|'$/g, '') || ''
      let category = extractCategory(content);
      category = category
        ? category
            .substring(1, category.length - 1)
            .split(",")
            .map((item) => item.trim())
        : [];
      const image =
        extractImage(content) ||
        "https://xiehongchen.github.io/img/preview.jpg";
      const fileContents = extractContent(content);

      fileInfo.push({
        title,
        date,
        updateDate,
        tags,
        summary,
        category,
        image,
      });

      const name = fileName + ".js";
      writeToFile(fileContents, "public/data", name)
      .then(() => {
        resolve(); // 在写文件完成后 resolve Promise
      })
      .catch(reject);
    });
  });
}

function writeToFile(file, pathName, fileName) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(pathName, fileName);
    let content = file
    if (path.extname(fileName) !== '.js') {
      content = JSON.stringify(file, null, 2);
    }
    fs.mkdir(pathName, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
            reject(err);
            return;
        }
        
        fs.writeFile(outputPath, content, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                reject(err);
                return;
            }
            
            console.log('File written successfully.');
            resolve();
        });
    });
});
}


// 读取目录下的所有 Markdown 文件并保存为 JSON 文件
readDirectory("public/markdown")
  .then((res) => {
    const list = fileInfo.sort((a, b) => {
      const timestampA = new Date(a.updateDate).getTime();
      const timestampB = new Date(b.updateDate).getTime();
      return timestampB - timestampA
    })
    writeToFile(list, 'src/views', 'data.json').then(data => {
      console.log('data', data)
    }).catch(err => {
      console.log('err', err)
    })
  })
  .catch((error) => {
    // 处理错误
    console.error("error", error);
  });

function formatTime(time) {
  const date = new Date(time);
  const y = date.getFullYear().toString(); // 年
  let m = (date.getMonth() + 1).toString(); // 月
  if (m < 10) m = '0' + m
  let d = date.getDate().toString(); // 日
  if (d < 10) d = '0' + d
  let h = date.getHours().toString(); // 时
  if (h < 10) h = '0' + h
  let mi = date.getMinutes().toString(); // 分
  if (mi < 10) mi = '0' + mi
  let s = date.getSeconds().toString(); // 秒
  if (s < 10) s = '0' + s
  return y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
}
