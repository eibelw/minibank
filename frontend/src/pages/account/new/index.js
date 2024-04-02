import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function NewAccount() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  const createAccount = async () => {

     if (parseInt(balance) > 99999999) {
       Swal.fire({
         title: 'Oops...',
         text: 'Balance cannot be more than 99 million',
         icon: 'error',
       });
       return;
     }

    try {
      const response = await axios.post(
        'http://localhost:5000/account/create',
        {
          name: name,
          balance: balance,
        }
      );
      // console.log("New account created: ", response.data);
      setBalance('');
      setName('');
      Swal.fire({
        title: 'Great!',
        text: 'Account created!',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/account';
        }
      });
    } catch (err) {
      console.error('Error creating a new account: ', err);
    }
  };

  return (
    <>
      <div className='h-lvh overflow-y-auto container-lg bg-gradient-to-b from-[#7AA2E3] from-30% via-[#6AD4DD] via-40% to-[#97E7E1] to-50%'>
        <div className='flex justify-center items-center p-10 h-lvh content-center'>
          <div className='grid grid-cols-6 p-6 bg-[#F8F6E3] border-2 border-dark-black rounded-2xl shadow-lg'>
            <div className='heading text-4xl text-center col-span-6 p-4 mb-4 border-4 border-slate-500 rounded-xl'>
              Create a new account
            </div>
            <div className='col-start-2 col-span-4 p-4 my-2'>
              <div className='text-2xl p-2 '>Name</div>
              <div className='p-2 mt-2 border-2 border-dark-blue rounded-lg'>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Enter Name'
                  className='input input-ghost bg-transparent'
                />
              </div>
            </div>
            <div className='col-start-2 col-span-4 p-4 my-2'>
              <div className='text-2xl p-2'>Balance</div>
              <div className='p-2 mt-2 border-2 border-dark-blue rounded-lg'>
                <input
                  type='number'
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder='Enter Balance'
                  className='input input-ghost bg-transparent'
                />
              </div>
            </div>
            <div className=' flex col-start-2 col-span-4 p-4 my-2 justify-center items-center'>
              <button
                className='btn btn-outline p-4 content-center text-lg hover:bg-gray-800'
                onClick={createAccount}
              >
                {' '}
                Create{' '}
              </button>
            </div>
          </div>
          <div className='p-2 mx-10 justify-right'>
            <Image
              className='border-4 rounded-3xl shadow-xl '
              src={'../account.svg'}
              width={600}
              height={100}
              alt='new account picture'
            />
          </div>
          <div className='fixed -top-0'>
            <Link
              href={'/'}
              className='flex my-10 content-center justify-center'
            >
              <button className='btn btn-outline p-8 text-lg content-center'>
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
