const fs = require('fs');
const path = require('path');

// 读取目录下的所有文件
function readDirectory(directoryPath, callback) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      callback(err);
      return;
    }

    const fileContents = []; // 用于存储文件内容的数组

    // 遍历目录下的所有文件和子目录
    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          callback(err);
          return;
        }

        // 如果是文件，则读取文件内容
        if (stats.isFile() && path.extname(filePath) === '.md') {
          fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
              callback(err);
              return;
            }
            // 从文件内容中提取标题和时间
            const title = extractTitle(content);
            const date = extractDate(content);
            const updateDate = extractUpdateDate(content);
            let tags = extractTags(content)
            tags = tags.substring(1, tags.length - 1).split(',').map(item => item.trim())
            const summary = extractSummary(content);
            let category = extractCategory(content);
            category = category.substring(1, category.length - 1).split(',').map(item => item.trim())
            const image = extractImage(content);

            console.log('tags', tags)

            // 将提取的数据添加到数组中
            fileContents.push({
              title,
              date,
              updateDate,
              tags,
              summary,
              category,
              image,
            });
            // 检查是否所有文件都已读取完成
            if (fileContents.length === files.length) {
              // 所有文件已读取完成，将文件内容写入到 JSON 文件中
              writeToFile(fileContents, callback);
            }
          });
        }
        // 如果是目录，则递归读取子目录
        else if (stats.isDirectory()) {
          readDirectory(filePath, callback);
        }
      });
    });
  });
}

// 从文件内容中提取标题
function extractTitle(content) {
  const titleMatch = content.match(/^title:\s+(.*)$/im);
  return titleMatch ? titleMatch[1] : null;
}

// 从文件内容中提取创建时间
function extractDate(content) {
  const dateMatch = content.match(/^date:\s+(.*)$/im);
  return dateMatch ? dateMatch[1] : null;
}

// 从文件内容中提取更新时间
function extractUpdateDate(content) {
  const updateDateMatch = content.match(/^update:\s+(.*)$/im);
  return updateDateMatch ? updateDateMatch[1] : null;
}

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

// 将文件内容写入到 JSON 文件中
function writeToFile(fileContents, callback) {
  const jsonContent = JSON.stringify(fileContents, null, 2); // 将数组内容转换为 JSON 格式
  const outputDir = 'src/views/home'; // 输出目录路径
  const outputPath = path.join(outputDir, 'data.json'); // 输出文件路径
  // 确保输出目录存在
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFile(outputPath, jsonContent, 'utf8', err => {
    if (err) {
      callback(err);
      return;
    }
    // 成功写入 JSON 文件
    console.log(`File written to ${outputPath}`);
    callback(null);
  });
}

// 读取目录下的所有 Markdown 文件并保存为 JSON 文件
readDirectory('public/markdown', (err) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('All files written to output.json');
});
