'use client';

import {Fieldset, Label} from "@headlessui/react";
import Legend from "@/components/ui/legend";
import Field from "@/components/ui/field";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";
import {toast} from "sonner";
import {getErrorMessage} from "@/lib/utilities";
import {useRouter} from "next/navigation";
import axios from 'axios';
import {useState} from 'react';

export default function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [accessLevel, setAccessLevel] = useState<string>('User');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const register = axios.post('/api/register', {
      username: username,
      password: password,
      access_level: accessLevel
    })
      .then(() => {
        router.push('/auth/login');
      });

    toast.promise(register,{
      loading: 'Creating your profile...',
      success: 'Registered successfully!',
      error: (error) => {
        return getErrorMessage(error);
      }
    });
  }

  return (
    <form className='max-w-xl mx-auto my-24 ring-1 rounded-lg ring-neutral-600 p-12' onSubmit={onSubmit}>
      <Fieldset className='flex flex-col gap-y-4'>
        <Legend className='mb-8'>Register</Legend>
        <Field>
          <Label>Username</Label>
          <Input name='username' placeholder='Username' autoComplete='username' required minLength={1}
                 maxLength={25} value={username} onChange={x => setUsername(x.target.value)} />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input name='password' type='password' placeholder='********' autoComplete='new-password' required
                 minLength={8} maxLength={36} value={password} onChange={x => setPassword(x.target.value)}/>
        </Field>
        <Field>
          <Label>Access Level</Label>
          <Select name='access-level' required value={accessLevel} onChange={x => setAccessLevel(x.target.value)}>
            <option value='User'>User</option>
            <option value='Admin'>Admin</option>
          </Select>
        </Field>
      </Fieldset>
      <Button type='submit' className='mt-6'>Register</Button>
    </form>
  );
}