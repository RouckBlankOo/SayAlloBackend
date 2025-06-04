import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import propertyRoutes from './routes/propertyRoutes';
import jwt from 'jsonwebtoken';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/properties', propertyRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Add this to your app.ts temporarily for testing
app.get('/generate-token', (req: Request, res: Response) => {
  try {
    const token = jwt.sign(
      { userId: 'admin123', role: 'admin' },
      process.env.JWT_SECRET || 'badsecret', 
      { expiresIn: '7d' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error generating token', error });
  }
});

export default app;