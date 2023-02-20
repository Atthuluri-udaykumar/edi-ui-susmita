import { Router } from 'express';

export interface CustomRouter {
  path: string;
  router: Router;
}