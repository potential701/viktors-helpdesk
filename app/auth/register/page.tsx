import {Fieldset, Label} from "@headlessui/react";
import Input from "@/components/ui/input";
import Field from "@/components/ui/field";
import Legend from "@/components/ui/legend";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";

export default function Page() {
  return (
    <main className='max-w-7xl mx-auto'>
      <form className='max-w-xl mx-auto my-24 ring-1 rounded-lg ring-neutral-600 p-12'>
        <Fieldset className='flex flex-col gap-y-4'>
          <Legend className='mb-8'>Register</Legend>
          <Field>
            <Label>Username</Label>
            <Input placeholder='Username' autoComplete='username' required minLength={1} maxLength={25} />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input type='password' placeholder='********' autoComplete='new-password' required minLength={8} maxLength={36} />
          </Field>
          <Field>
            <Label>Access Level</Label>
            <Select required>
              <option value='User'>User</option>
              <option value='Admin'>Admin</option>
            </Select>
          </Field>
        </Fieldset>
        <Button className='mt-6'>Register</Button>
      </form>
    </main>
  );
}