'use client';

import Legend from "@/components/ui/legend";
import {Fieldset, Label} from "@headlessui/react";
import Field from "@/components/ui/field";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import {loginUser} from "@/app/auth/login/actions";
import {toast} from "sonner";
import {getErrorMessage} from "@/lib/utilities";
import {useRouter} from "next/navigation";

export default function LoginForm() {
  const router = useRouter()

  async function onSubmit(formData: FormData){
    try{
      const result = await loginUser(formData);

      toast.success(result);
      router.push('/')
    }
    catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <form className='max-w-xl mx-auto my-24 ring-1 rounded-lg ring-neutral-600 p-12' action={onSubmit}>
      <Fieldset className='flex flex-col gap-y-4'>
        <Legend className='mb-8'>Log in</Legend>
        <Field>
          <Label>Username</Label>
          <Input name='username' placeholder='Username' autoComplete='username' required minLength={1}
                 maxLength={25}/>
        </Field>
        <Field>
          <Label>Password</Label>
          <Input name='password' type='password' placeholder='********' autoComplete='new-password' required
                 minLength={8} maxLength={36}/>
        </Field>
      </Fieldset>
      <Button type='submit' className='mt-6'>Log in</Button>
    </form>
  );
}