import express from 'express';

import googleHandler from './google.js';

const router = express.Router();

router.get('/google', googleHandler);

export default router;
