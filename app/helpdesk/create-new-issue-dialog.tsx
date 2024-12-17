'use client';

import {PencilSquareIcon} from "@heroicons/react/24/outline";
import Button from "@/components/ui/button";
import {FormEvent, useEffect, useState} from "react";
import {Dialog, DialogBackdrop, DialogPanel, Fieldset, Label} from "@headlessui/react";
import {Category, User} from "@/lib/types";
import Legend from "@/components/ui/legend";
import Field from "@/components/ui/field";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/text-area";
import axios from "axios";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function CreateNewIssueDialog({user, categories}: { user: User; categories: Category[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<number | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    setTitle('');
    setDescription('');
    setCategory(0);
  }, [isOpen])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const create = axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/api/issue/create', {
      title: title,
      description: description,
      category_id: category,
      created_by_id: user.id,
    })
      .then(() => {
        setIsOpen(false);
        router.refresh();
      })

    toast.promise(create, {
      loading: 'Creating new issue...',
      success: 'New issue created.',
      error: 'Error creating new issue.'
    })
  }

  return (
    <>
      <Button variant='ghost' className='px-2' onClick={() => setIsOpen(true)}>
        <PencilSquareIcon className='size-5'/>
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
        <DialogBackdrop className='fixed inset-0 bg-black/30'/>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className='w-full max-w-2xl rounded-lg bg-neutral-100/5 backdrop-blur p-8'>
            <form className='space-y-8' onSubmit={onSubmit}>
              <Fieldset className='flex flex-col gap-y-4'>
                <Legend>Create new issue</Legend>
                <Field>
                  <Label>Title</Label>
                  <Input required type='text' autoComplete='off' placeholder='New issue...' value={title}
                         onChange={x => setTitle(x.target.value)}/>
                </Field>
                <Field>
                  <Label>Description</Label>
                  <Textarea required autoComplete='off' placeholder='Issue description...' value={description}
                            onChange={x => setDescription(x.target.value)}></Textarea>
                </Field>
                <Field>
                  <Label>Category</Label>
                  <Select required value={category} onChange={x => setCategory(parseInt(x.target.value))}>
                    <option value=''>Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </Select>
                </Field>
              </Fieldset>
              <Button type='submit'>Submit</Button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}