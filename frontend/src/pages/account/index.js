import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const AccountPage = () => {
  const [accounts, Setaccounts] = useState([]);

  const fetchAccount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/account/list');
      Setaccounts(response.data);
    } catch (err) {
      console.error('Error fetching: ', err);
    }
  };
  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <>
      <div
        className='container-lg overflow-y-auto h-lvh bg-gradient-to-b from-[#7AA2E3] from-30% via-[#6AD4DD] via-40% to-[#97E7E1] to-50% bg-repeat'>
        <div className='flex justify-center items-center my-10 p-10'>
          <div className='grid grid-cols-12 grid-rows-12 gap-4 p-2 w-1/3 mt-10 overflow-y-auto h-lvh text-center border-4 border-slate-500 rounded-2xl bg-[#F8F6E3]'>
            <div className='col-span-12 p-2 text-4xl'>List Account</div>
            <div className='col-span-6 p-2 mt-3 mx-2 text-xl pt-4 border-2 border-slate-500 rounded-md'>
              Account No
            </div>
            <div className='col-span-6 p-2 mt-3 mx-2 text-xl pt-4 border-2 border-slate-500 rounded-md'>
              Name
            </div>

            {accounts.map((data, index) => (
              <>
                <Link
                  href={`/account/detail/${data.account_no}`}
                  className='col-span-6 p-2 my-2'
                  key={index}
                >
                  <div className='text-lg hover:text-xl hover:font-bold'>
                    {data.account_no}
                  </div>{' '}
                </Link>
                <Link
                  href={`/account/detail/${data.account_no}`}
                  className='col-span-6 p-2 my-2 '
                  key={index}
                >
                  <div className='text-lg hover:text-xl hover:font-bold'>
                    {data.name}
                  </div>
                </Link>
              </>
            ))}
          </div>
          <div className='fixed -top-0 '>
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
};

export default AccountPage;
