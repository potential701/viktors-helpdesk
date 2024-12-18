'use client'

import {format} from "date-fns";
import {Fieldset, Label} from "@headlessui/react";
import Field from "@/components/ui/field";
import Textarea from "@/components/ui/text-area";
import Button from "@/components/ui/button";
import {User, Comment} from "@/lib/types";
import {FormEvent, useState} from "react";
import axios from "axios";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function Comments({comments, users, issueId, user}: {comments: Comment[]; users: User[]; issueId: number; user: User}) {
  const [comment, setComment] = useState<string>('');

  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const response = axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/api/issue/comment/create', {
      content: comment,
      issue_id: issueId,
      user_id: user.id
    })

    toast.promise(response,{
      loading: 'Adding new comment...',
      success: 'New comment added.',
      error: 'Error adding new comment.'
    })

    router.refresh();
    setComment('');
  }

  function onDelete(commentId: number){
    const response = axios.delete(process.env.NEXT_PUBLIC_BASE_URL + '/api/issue/comment/delete/' + commentId)
      .then(() => {
        router.refresh()
      })

    toast.promise(response, {
      loading: 'Deleting comment...',
      success: 'Comment deleted.',
      error: 'Error deleting comment.'
    })
  }

  return (
    <article className='divide-y divide-neutral-600'>
      <h2 className='text-xl font-medium tracking-tighter'>Comments</h2>
      {comments.length === 0 ? 'Nothing to display...' : comments.map((comment) => (
        <div key={comment.id} className='py-4'>
              <span className='text-xs'>
                {users.find(x => x.id === comment.user_id)?.username} at {format(comment.created_at, 'dd/MM/yyyy HH:mm')}
              </span>
          <p className='text-neutral-200'>
            {comment.content}
          </p>
          <Button variant='danger' type='button' className='mt-2' onClick={() => onDelete(comment.id)}>Delete</Button>
        </div>
      ))}
      <form className='pt-2' onSubmit={onSubmit}>
        <Fieldset>
          <Field>
            <Label>Add comment</Label>
            <Textarea required placeholder='New comment...' value={comment} onChange={x => setComment(x.target.value)}></Textarea>
          </Field>
        </Fieldset>
        <Button type='submit' className='mt-2'>Submit</Button>
      </form>
    </article>
  );
}