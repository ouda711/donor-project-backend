// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const destPath = req.uploadPath;
    if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
    callback(null, destPath);
  },
  filename(req, file, callback) {
    const parts = file.originalname.split('.');
    const extension = parts[parts.length - 1];
    let fileName = `${file.fieldname}-${Date.now()}`;
    // eslint-disable-next-line max-len
    if (extension === 'png' || extension === 'jpeg' || extension === 'jpg' || extension === 'svg') fileName += `.${extension}`;

    callback(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = { upload };
