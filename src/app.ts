import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import propertyRoutes from './routes/propertyRoutes';
import agencyRoutes from './routes/agencyRoutes';
import jwt from 'jsonwebtoken';

const app = express();
// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/agency', agencyRoutes);

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

// 404 handler for undefined routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);
  
  if (res.headersSent) {
    return next(error);
  }
  
  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

export default app;