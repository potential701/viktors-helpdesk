import Link from "next/link";
import {format} from "date-fns";
import {Category, Issue, User} from "@/lib/types";

export default function IssueTable({issues, users, categories}:{issues: Issue[]; users: User[]; categories: Category[]}){
  return (
    <table className='table-auto w-full'>
      <thead>
      <tr className='*:text-start *:text-xs *:font-medium border-b border-neutral-600'>
        <th>Id</th>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
        <th>Priority</th>
        <th>Created At</th>
        <th>Created By</th>
        <th>Assigned To</th>
        <th>Category</th>
      </tr>
      </thead>
      <tbody>
      {issues.map((issue) => (
        <tr key={issue.id} className='hover:bg-neutral-100/5'>
          <td>{issue.id}</td>
          <td className='max-w-48'>
            <Link href={`/helpdesk/${issue.id}`} className='text-blue-400 hover:underline'>{issue.title}</Link>
          </td>
          <td className='line-clamp-1 max-w-48'>{issue.description}</td>
          <td>{issue.status}</td>
          <td>{issue.priority}</td>
          <td>{format(issue.created_at, 'dd/MM/yyyy HH:mm')}</td>
          <td>{users.find(x => x.id === issue.created_by_id)?.username}</td>
          <td>{users.find(x => x.id === issue.assigned_to_id)?.username}</td>
          <td>{categories.find(x => x.id === issue.category_id)?.name}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}