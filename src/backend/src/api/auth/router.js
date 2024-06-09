import express from 'express';

import CallbackRouter from './callback/router.js';
import SigninRouter from './signin/router.js';

const router = express.Router();

router.use('/signin', SigninRouter);
router.use('/callback', CallbackRouter);

export default router;
