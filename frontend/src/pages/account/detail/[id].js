import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';

export default function DetailAccount() {
  const router = useRouter();
  const { id } = router.query;

  const [accounts, setAccounts] = useState({});

  const fetchAccount = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/account/detail/${id}`
      );
      // console.log(response.data);
      setAccounts(response.data.accounts);
    } catch (error) {
      console.error('Error fetching account:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAccount(id);
    }
  }, [id]);

  function formatNumberWithCommas(number) {
    if (number === undefined || number === null) {
      return '';
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <div className='container-lg h-lvh overflow-y-auto bg-gradient-to-b from-[#7AA2E3] from-30% via-[#6AD4DD] via-40% to-[#97E7E1] to-50%'>
      <div>
        <Link
          href={'/account'}
          className='flex mt-10 content-center justify-center'
        >
          <button className='btn btn-outline p-8 text-lg content-center'>
            Back
          </button>
        </Link>
      </div>
      <div className='flex grid grid-cols-6 p-10 my-10 justify-center content-center'>
        <div className='col-span-2 col-start-3 p-10 mb-10 justify-center bg-[#F8F6E3] border-2 border-dark-black rounded-2xl shadow-lg'>
          <div className='text-4xl text-center p-2 mx-2 mt-2'>
            Detail Account
          </div>
        </div>
        {accounts ? (
          <div className='col-start-2 col-span-4 p-4 '>
            <div className='grid grid-cols-6 p-2 my-2'>
              <div className='col-start-2 col-span-2 mx-2 p-2 text-2xl justify-self-end'>
                Name :
              </div>
              <input
                className='col-start-4 input input-ghost bg-white text-lg'
                value={accounts.name}
                readOnly
              />
            </div>
            <div className='grid grid-cols-6 p-2 my-2'>
              <div className='col-start-2 col-span-2 mx-2 p-2 text-2xl justify-self-end'>
                Balance :
              </div>
              <input
                className='col-start-4 input input-ghost bg-white text-lg '
                value={formatNumberWithCommas(accounts.balance)}
                readOnly
              />
            </div>
            <div className='grid grid-cols-6 p-2 my-2'>
              <div className='col-start-2 col-span-2 mx-2 p-2 text-2xl justify-self-end'>
                Account No :
              </div>
              <input
                className='col-start-4 input input-ghost bg-white text-lg'
                value={accounts.account_no}
                readOnly
              />
            </div>
            <div className='grid grid-cols-6 p-2 my-2'>
              <div className='col-start-2 col-span-2 mx-2 p-2 text-2xl justify-self-end'>
                Created At :
              </div>
              <input
                className='col-start-4 input input-ghost bg-white text-lg'
                value={accounts.created_at}
                readOnly
              />
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
