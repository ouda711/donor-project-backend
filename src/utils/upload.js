import multer from 'multer';
// import sharp from 'sharp';
import fs from 'fs';

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
    if (extension === 'png' || extension === 'jpeg' || extension === 'jpg') fileName += `.${extension}`;

    callback(null, fileName);
  },
});

const upload = multer({ storage });

// eslint-disable-next-line import/prefer-default-export
export { upload };
