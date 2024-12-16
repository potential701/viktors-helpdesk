'use client';

import {PencilSquareIcon} from "@heroicons/react/24/outline";
import Button from "@/components/ui/button";
import {useState} from "react";
import {Dialog, DialogBackdrop, DialogPanel, Fieldset, Label, Textarea} from "@headlessui/react";
import {Category, User} from "@/lib/types";
import Legend from "@/components/ui/legend";
import Field from "@/components/ui/field";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";

export default function CreateNewIssueDialog({user, categories}: { user: User; categories: Category[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<number>(0);

  return (
    <>
      <Button variant='ghost' className='px-2' onClick={() => setIsOpen(true)}>
        <PencilSquareIcon className='size-5'/>
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
        <DialogBackdrop className='fixed inset-0 bg-black/30'/>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className='w-full max-w-xl rounded-lg bg-neutral-100/5 p-8'>
            <form>
              <Fieldset className='flex flex-col gap-y-4'>
                <Legend>Create new issue</Legend>
                <Field>
                  <Label>Title</Label>
                  <Input/>
                </Field>
                <Field>
                  <Label>Description</Label>
                  <Textarea></Textarea>
                </Field>
                <Field>
                  <Label>Category</Label>
                  <Select>
                    <option value='0'>Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </Select>
                </Field>
              </Fieldset>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}