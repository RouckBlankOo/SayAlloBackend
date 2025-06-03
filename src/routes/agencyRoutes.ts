import { Router, Request, Response, NextFunction } from 'express';
import { getAgencyInfo, updateAgencyInfo } from '../controllers/agencyController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAgencyInfo(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateAgencyInfo(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;