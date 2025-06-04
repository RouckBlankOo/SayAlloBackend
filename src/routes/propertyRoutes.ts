import { Router } from 'express';
import { upload } from '../config/multerConfig';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', getProperties);

router.get('/:id', getProperty);

router.post('/create',  upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'planImage', maxCount: 1 },
]), async (req, res, next) => {
  try {
    // Assign uploaded file paths to req.body for controller
    if (req.files) {
      const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] };
      if (files['image'] && files['image'][0]) {
        (req.body as any).image = files['image'][0].path;
      }
      if (files['planImage'] && files['planImage'][0]) {
        (req.body as any).planImage = files['planImage'][0].path;
      }
    }
    createProperty(req, res);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authMiddleware, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'planImage', maxCount: 1 },
]), async (req, res, next) => {
  try {
    // Assign uploaded file paths to req.body for controller
    if (req.files) {
      const files = req.files as unknown as { [fieldname: string]: Express.Multer.File[] };
      if (files['image'] && files['image'][0]) {
        (req.body as any).image = files['image'][0].path;
      }
      if (files['planImage'] && files['planImage'][0]) {
        (req.body as any).planImage = files['planImage'][0].path;
      }
    }
    updateProperty(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authMiddleware, deleteProperty);

export default router;