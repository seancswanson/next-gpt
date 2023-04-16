import Image from 'next/image'
import { Inter } from 'next/font/google'
import { MainNav } from '@/components/main-nav';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const callAPI = async () => { 
    try {
      const res = await fetch('/api/gpt');
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } 
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <MainNav />
      <h1 className="text-6xl font-bold">NextGPT</h1>
      <button onClick={callAPI} className="border-white border rounded px-3 py-2 hover:bg-white hover:text-black">Call API</button>
    </main>
  )
}
