import { NextFunction, Request, Response } from 'express';

const ExampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('[ExampleMiddleware]');
  return next();
};
export default ExampleMiddleware;
