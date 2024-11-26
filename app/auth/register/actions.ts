'use server'

import axios from "axios";
import {getErrorMessage} from "@/lib/utilities";

export async function registerUser(formData: FormData): Promise<string> {
  try {
    const response = await axios.post('http://localhost:3000/api/register', {
      username: formData.get('username'),
      password: formData.get('password'),
      access_level: formData.get('access-level')
    });

    return response.data.message;
  } catch(error) {
    throw new Error(getErrorMessage(error));
  }
}