import { Router, Request, Response, NextFunction } from 'express';
import { 
  getProperties, 
  getProperty, 
  createProperty, 
  updateProperty, 
  deleteProperty 
} from '../controllers/propertyController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Wrap async handlers to ensure proper error handling
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getProperties(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getProperty(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createProperty(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateProperty(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteProperty(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;