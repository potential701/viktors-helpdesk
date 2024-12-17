import axios from "axios";
import {Category, Issue, User} from "@/lib/types";
import IssueTable from "@/app/helpdesk/issue-table";
import {getUser} from "@/lib/user";

export const dynamic = 'force-dynamic'

export default async function Page() {
  const user = await getUser();
  const issueResponse = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/issue/read/created?userid=' + user.id);
  const userResponse = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/user/read/all');
  const categoryResponse = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/category/read');
  const issues = issueResponse.data as Issue[];
  const users = userResponse.data as User[];
  const categories = categoryResponse.data as Category[];


  return (
    <section className='space-y-4'>
      <h1 className='text-3xl font-medium tracking-tighter'>Issues created by you</h1>
      <IssueTable issues={issues} users={users} categories={categories} />
    </section>
  );
}