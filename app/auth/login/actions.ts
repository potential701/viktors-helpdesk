'use server';

import axios from 'axios';
import {getErrorMessage} from '@/lib/utilities';
import {cookies} from "next/headers";

export async function loginUser(formData: FormData): Promise<string> {
  const cookieStore = await cookies()

  try {
    const response = await axios.post(process.env.BASE_URL + '/api/login', {
      username: formData.get('username'),
      password: formData.get('password')
    })

    cookieStore.set('auth_token', response.data.token, {expires: new Date(response.data.expires_at)})

    return response.data.message;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}