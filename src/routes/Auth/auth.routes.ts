import express, { Router } from 'express';
import {
  register,
  login,
  refreshToken,
  logout,
  deleteAccount,
  getUserDetails,
} from '../../controllers/Auth';
import { protect } from '../../middleware/auth.middleware';
import { UserRole } from '../../types/user.interface';

const router: Router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/refresh', refreshToken);

router.post('/logout', protect(UserRole.USER), logout);

router.get('/user', protect(UserRole.USER), getUserDetails);

router.delete('/delete-account', protect(UserRole.USER), deleteAccount);


export default router;
