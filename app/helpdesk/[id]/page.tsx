import {getUser} from "@/lib/user";
import axios from "axios";
import {Category, Issue, User, Comment} from "@/lib/types";
import Comments from "@/app/helpdesk/[id]/comments";
import IssueInformation from "@/app/helpdesk/[id]/issue-information";

export default async function Page({params}: { params: Promise<{ id: string }> }) {
  const issueId = (await params).id;
  const user = await getUser();

  const issueResponse = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/issue/read/' + issueId);
  const commentResponse = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/issue/comment/read/' + issueId);
  const userResponse = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/read/all');
  const categoryResponse = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/category/read');
  const issue = issueResponse.data as Issue;
  const comments = commentResponse.data as Comment[];
  const users = userResponse.data as User[];
  const categories = categoryResponse.data as Category[];


  return (
    <section className='space-y-4 flex divide-x divide-neutral-600'>
      <div className='flex-1 min-h-full pe-4 space-y-8'>
        <article className='space-y-4'>
          <h1 className='text-3xl font-semibold tracking-tighter'>{issue.title}</h1>
          <p className='text-lg text-neutral-400'>
            {issue.description}
          </p>
        </article>
        <Comments comments={comments} issueId={issue.id} users={users} user={user} />
      </div>
      <aside className='w-full max-w-sm ps-4'>
        <IssueInformation users={users} issue={issue} categories={categories} user={user} />
      </aside>
    </section>
  );
}