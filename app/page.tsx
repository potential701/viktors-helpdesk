import Link from "next/link";

export default function Home() {
  return (
    <main className='max-w-7xl mx-auto px-8 my-12 space-y-6'>
      <h1 className='text-6xl font-semibold tracking-tighter'>Choose where to go</h1>
      <section className='grid grid-cols-3'>
        <Link href='/helpdesk'>
          <article className='outline outline-1 outline-neutral-600 rounded-lg p-4'>
            <h2 className='text-3xl font-medium tracking-tighter'>Helpdesk</h2>
            <p className='text-neutral-400'>Explore, assign, create, and modify issues in the helpdesk area</p>
          </article>
        </Link>
      </section>
    </main>
  );
}
