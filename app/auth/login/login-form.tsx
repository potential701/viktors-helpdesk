'use client';

import Legend from "@/components/ui/legend";
import {Fieldset, Label} from "@headlessui/react";
import Field from "@/components/ui/field";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import {toast} from "sonner";
import {getErrorMessage} from "@/lib/utilities";
import {useRouter} from "next/navigation";
import axios from 'axios';
import {useState} from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const login = axios.post('/api/login', {
      username: username,
      password: password
    })
      .then(() => {
        router.push('/');
      })

    toast.promise(login, {
      loading: 'Logging you in...',
      success: 'Logged in successfully!',
      error: (error) => {
        return getErrorMessage(error);
      }
    });
  }

  return (
    <form className='max-w-xl mx-auto my-24 ring-1 rounded-lg ring-neutral-600 p-12' onSubmit={onSubmit}>
      <Fieldset className='flex flex-col gap-y-4'>
        <Legend className='mb-8'>Log in</Legend>
        <Field>
          <Label>Username</Label>
          <Input name='username' placeholder='Username' autoComplete='username' required minLength={1}
                 maxLength={25} value={username} onChange={x => setUsername(x.target.value)}/>
        </Field>
        <Field>
          <Label>Password</Label>
          <Input name='password' type='password' placeholder='********' autoComplete='new-password' required
                 minLength={8} maxLength={36} value={password} onChange={x => setPassword(x.target.value)}/>
        </Field>
      </Fieldset>
      <Button type='submit' className='mt-6'>Log in</Button>
    </form>
  );
}