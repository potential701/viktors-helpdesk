'use client'

import {Fieldset, Label} from "@headlessui/react";
import Legend from "@/components/ui/legend";
import Field from "@/components/ui/field";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import {User, Issue, Category} from "@/lib/types";
import {FormEvent, useState} from "react";
import Button from "@/components/ui/button";
import axios from "axios";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function IssueInformation({users, issue, categories, user}: {users: User[]; issue: Issue; categories: Category[]; user: User}){
  const [assigned, setAssigned] = useState<number | undefined>(issue.assigned_to_id ?? undefined)
  const [category, setCategory] = useState<number | undefined>(issue.category_id ?? undefined);
  const [status, setStatus] = useState<string | undefined>(issue.status ?? undefined);
  const [priority, setPriority] = useState<string | undefined>(issue.priority ?? undefined);

  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    issue.assigned_to_id = assigned ?? issue.assigned_to_id;
    issue.category_id = category ?? issue.category_id;
    issue.status = status ?? issue.status;
    issue.priority = priority ?? issue.priority;

    const response = axios.patch(process.env.NEXT_PUBLIC_BASE_URL + '/api/issue/update',
      issue
    )

    console.log(issue);

    toast.promise(response, {
      loading: 'Updating issue...',
      success: 'Issue updated.',
      error: 'Error updating issue.'
    })
  }

  function onDelete() {
    const response = axios.delete(process.env.NEXT_PUBLIC_BASE_URL + '/api/issue/delete/' + issue.id)
      .then(() => {
        router.push('/helpdesk')
      })

    toast.promise(response, {
      loading: 'Deleting issue...',
      success: 'Issue deleted.',
      error: 'Error deleting issue.'
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <Fieldset className='space-y-4'>
        <Legend className='text-xl'>
          Issue information
        </Legend>
        <Field>
          <Label>Created by</Label>
          <Input value={users.find(x => x.id === issue.created_by_id)?.username} disabled></Input>
        </Field>
        <Field>
          <Label>Assigned to</Label>
          <Select value={assigned} onChange={x => setAssigned(parseInt(x.target.value))}>
            <option value=''>Choose a person</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label>Category</Label>
          <Select value={category} onChange={x => setCategory(parseInt(x.target.value))}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label>Status</Label>
          <Select value={status} onChange={x => setStatus(x.target.value)}>
            <option value='Open'>Open</option>
            <option value='Closed'>Closed</option>
          </Select>
        </Field>
        <Field>
          <Label>Priority</Label>
          <Select value={priority} onChange={x => setPriority(x.target.value)}>
            <option value='High'>High</option>
            <option value='Medium'>Medium</option>
            <option value='Low'>Low</option>
          </Select>
        </Field>
      </Fieldset>
      <Button type='submit' className='mt-2'>Submit</Button>
      {user.access_level === 'Admin' ? (
          <Button variant='danger' type='button' className='ms-2' onClick={() => onDelete()}>Delete Issue</Button>
        ) : null}
    </form>
  );
}