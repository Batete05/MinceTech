import {
  handleAddUser,
  handleDeleteUser,
  handleGetUser,
  handleGetUserByEmail,
  handleUpdateUser,
  handleUserLogin,
  handleVerifyUser,
} from '@/controllers/user-controllers';
import { authenticate } from '@/middlewares/auth';
import { createRouter } from '@/utils/create';
import { Router } from 'express';

export default createRouter((router: Router) => {
  router.get('/', authenticate(), handleGetUser);
  router.get('/email/:email', handleGetUserByEmail);
  router.get('/verify', (req, res, next) => handleVerifyUser(req, res, next));
  router.post('/create', handleAddUser);
  router.post('/login', handleUserLogin);
  router.post('/remove', authenticate(), handleDeleteUser);
  router.put('/update', authenticate(), handleUpdateUser);
});
