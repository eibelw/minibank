import Image from 'next/image';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

export default function Home() {
  return (
    <main
      className='h-lvh container-lg bg-gradient-to-b from-[#7AA2E3] from-30% via-[#6AD4DD] via-40% to-[#97E7E1] to-50%'>
      <div className='flex justify-center items-center p-10 h-lvh content-center'>
        <div className='grid grid-cols-2 p-6 '>
          <h1 className='col-span-2 text-4xl p-10 my-10 text-center border-2 border-dark-black rounded-2xl bg-[#F8F6E3] shadow-lg'>
            My Bank
          </h1>
          <div className='grid grid-cols-4 gap-4 '>
            <Link href={'/account'} className='col-span-4 justify-self-center '>
              <button className='btn btn-outline hover:bg-gray-800 text-center my-2 p-2 text-xl rounded-xl bg-[#D6DAC8] shadow-md'>
                List Accounts
              </button>
            </Link>

            <Link
              href={'/account/new'}
              className='col-span-4 justify-self-center '
            >
              <button className='btn btn-outline hover:bg-gray-800 text-center my-2 p-2 text-xl rounded-xl bg-[#D6DAC8] shadow-md'>
                Create Account
              </button>
            </Link>

            <Link
              href={'/transaction'}
              className='col-span-4 justify-self-center '
            >
              <button className='btn btn-outline hover:bg-gray-800 text-center my-2 p-2 text-xl rounded-xl  bg-[#D6DAC8] shadow-md'>
                List Transaction
              </button>
            </Link>

            <Link
              href={'/transaction/transfer'}
              className='col-span-4 justify-self-center '
            >
              <button className='btn btn-outline hover:bg-gray-800 text-center my-2 p-2 text-xl rounded-xl bg-[#D6DAC8] shadow-md'>
                Transfer
              </button>
            </Link>
          </div>
          <Image
            className='border-2 rounded-3xl shadow-xl '
            src={'../picture.svg'}
            alt='Icon my bank'
            width={'600'}
            height={'100'}
          />
        </div>
      </div>
    </main>
  );
}
