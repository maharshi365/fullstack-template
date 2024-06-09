import axios from 'axios';
import jwt from 'jsonwebtoken';

import EnvConfig from '../../../config/env.config.js';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';

const getTokenQueryParams = (code) => {
  const values = {
    code,
    client_id: EnvConfig.GOOGLE_CLIENT_ID,
    client_secret: EnvConfig.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${EnvConfig.SERVER_URL}/api/auth/callback/google`,
    grant_type: 'authorization_code',
  };

  return new URLSearchParams(values);
};

export const getTokens = async (code) => {
  const tokenParams = getTokenQueryParams(code);

  try {
    const { data } = await axios.post(TOKEN_URL, tokenParams.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Handles the callback from Google OAuth2.
 * @param {import('express').Request} req The Express request object.
 * @param {import('express').Response} res The Express response object.
 */
const googleHandler = async (req, res) => {
  const { code } = req.query;

  const { id_token, access_token, refresh_token } = await getTokens(code);
  console.log({ id_token, access_token, refresh_token });

  // upsert user

  // create session

  // create access and refresh tokens

  // set cookies

  // redirect back to client
};

export default googleHandler;
