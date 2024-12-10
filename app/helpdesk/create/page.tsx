import {getUser} from "@/lib/user";

export default async function Page(){
  const user = await getUser();

  return (
    <main className='max-w-7xl mx-auto px-8 my-12'>
      <h1 className='text-4xl font-bold tracking-tighter'>New issue</h1>
    </main>
  );
}