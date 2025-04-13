import express, { Router } from 'express';
import {
  register,
  login,
  refreshToken,
  logout,
  deleteAccount,
  getUserDetails,
  
} from '../../controllers/Auth';
import { getAllUser } from '../../controllers/Auth/gel-all-users-controller';
import { protect } from '../../middleware/auth.middleware';
import { UserRole } from '../../types/user.interface';
import { updateUserRecord } from '../../controllers/Auth/edit-user-controller';

const router: Router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/refresh', refreshToken);

router.post('/logout', protect(UserRole.ADMIN, UserRole.SUPERADMIN), logout);

router.get('/user', protect(UserRole.ADMIN, UserRole.SUPERADMIN), getUserDetails);

router.get('/all/user', getAllUser);

router.delete('/delete-account/:id', protect(UserRole.ADMIN, UserRole.SUPERADMIN), deleteAccount);

router.put('/user/:id', protect(UserRole.ADMIN, UserRole.SUPERADMIN), updateUserRecord); // Edit user route

export default router;
