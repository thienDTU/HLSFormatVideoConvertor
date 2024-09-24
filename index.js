const os = require('os');
const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');

// Lấy hệ điều hành hiện tại
const platform = os.platform(); // 'win32' cho Windows, 'linux' cho Linux, 'darwin' cho macOS

let hlsConvertLib;
let zipPath;
let extractedDir;
let extractedFile;
extractedDir = path.join(process.cwd(), 'libries');
// Xác định đường dẫn file .zip và file sau khi giải nén
if (platform === 'win32') {
  zipPath = path.join(process.cwd(), process.env.WIN_ZIP_PATH);
  extractedFile = path.join(extractedDir, 'Win', 'HLSFormatVideoConverter.exe');
} else {
  zipPath = path.join(process.cwd(), process.env.UBUNTU_ZIP_PATH);
  extractedFile = path.join(extractedDir, 'Ubuntu' ,'HLSFormatVideoConverter.out');
}

// Kiểm tra extractedDir
if (fs.existsSync(extractedDir)) {
  console.log(`Giải nén ${zipPath}...`);

  // Giải nén file .zip
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(extractedDir, true); // Giải nén vào thư mục

  console.log(`Giải nén hoàn tất. File đã giải nén: ${extractedFile}`);
}

// Thiết lập đường dẫn tới file thực thi sau khi giải nén
hlsConvertLib = extractedFile;

module.exports = {
  hlsConvertLib
};
