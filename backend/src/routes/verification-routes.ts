import { getVerificationsController, handleVerifyVerifcation } from '@/controllers/verification-controllers';
import { createRouter } from '@/utils/create';
import { Router } from 'express';

// TODO: add verification
export default createRouter((router: Router) => {
  router.post('/:id', handleVerifyVerifcation);
  router.get('/', getVerificationsController);
});
