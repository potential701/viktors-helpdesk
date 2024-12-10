'use server';

import {cookies} from "next/headers";
import axios from "axios";

export async function getUser() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token')!;

  const response = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + '/api/user/read',
    {
      params: {'token': authToken.value}
    }
  );

  return response.data;
}