// @ts-check

import EnvConfig from '../../../config/env.config.js';

const ROOT_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

/**
 * Construct the Google OAuth URL to redirect the user to.
 * @returns {string} The Google OAuth URL.
 */
const getGoogleAuthUrl = () => {
  const params = {
    redirect_uri: `${EnvConfig.SERVER_URL}/api/auth/callback/google`,
    client_id: EnvConfig.GOOGLE_CLIENT_ID,

    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
  };

  const qs = new URLSearchParams(params);

  return `${ROOT_URL}?${qs.toString()}`;
};

/**
 * Redirect the user to the Google OAuth URL.
 * @param {import('express').Request} req The Express request object.
 * @param {import('express').Response} res The Express response object.
 */
const googleHandler = async (req, res) => {
  res.redirect(getGoogleAuthUrl());
};

export default googleHandler;
