import multer, { FileFilterCallback } from 'multer';
import fs from 'fs';

const imageFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    !file.originalname.match(
      /\.(jfif|jpg|png|jpeg|gif|pdf|JPG|JPEG|PNG|GIF|JFIF|webp)$/
    )
  ) {
    return cb(new Error('File must be an image or PDF'));
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path: string;
    if (file.fieldname === 'image') {
      path = './uploads/images/';
    } else if (file.fieldname === 'planImage') {
      path = './uploads/plans/';
    } else {
      path = './uploads/others/';
    }
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 100000000 },
  fileFilter: imageFileFilter,
});