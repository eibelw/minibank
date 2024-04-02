import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

export default function Transaction() {
  const [transactions, SetTransactions] = useState([]);

  const fetchAccount = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/transaction/list'
      );
      SetTransactions(response.data);
    } catch (err) {
      console.error('Error fetching: ', err);
    }
  };
  useEffect(() => {
    fetchAccount();
  }, []);

  function formatNumberWithCommas(number) {
    if (number === undefined || number === null) {
      return '';
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <>
      <div className='container-lg overflow-y-auto h-lvh bg-gradient-to-b from-[#7AA2E3] from-30% via-[#6AD4DD] via-40% to-[#97E7E1] to-50%'>
        <div className='flex justify-center items-center my-10 p-10 bg-gradient-to-b'>
          <div className='grid grid-cols-12 grid-rows-12 overflow-y-auto h-lvh gap-4 p-2 w-1/3 mt-12 text-center border-4 border-slate-500 rounded-2xl bg-[#F8F6E3]'>
            <div className='col-span-12 text-center p-2 text-4xl'>
              List Transaction
            </div>
            <div className='col-span-6 p-2 pt-4 mt-3 mx-2 text-xl border-2 border-slate-500 rounded-md'>
              Amount
            </div>
            <div className='col-span-6 p-2 pt-4 mt-3 mx-2 text-xl border-2 border-slate-500 rounded-md'>
              Created At
            </div>

            {transactions.map((data, index) => (
              <>
                <Link
                  className='col-span-6 p-2 my-2'
                  href={`/transaction/detail/${data.created_at}`}
                >
                  <div
                    className='text-lg hover:text-xl hover:font-bold'
                    key={index}
                  >
                    {formatNumberWithCommas(data.amount)}
                  </div>
                </Link>
                <Link
                  className='col-span-6 p-2 my-2'
                  href={`/transaction/detail/${data.created_at}`}
                >
                  <div
                    className='text-lg hover:text-xl hover:font-bold'
                    key={index}
                  >
                    {data.created_at}
                  </div>
                </Link>
              </>
            ))}
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
