'use server';

import axios from 'axios';
import {getErrorMessage} from '@/lib/utilities';

export async function loginUser(formData: FormData){
  try{
    const response = await axios.post(process.env.BASE_URL + '/api/login', {
      username: formData.get('username'),
      password: formData.get('password')
    })

    return response.data.message;
  }
  catch (error) {
    throw new Error(getErrorMessage(error));
  }
}