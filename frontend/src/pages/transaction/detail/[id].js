import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';

export default function DetailTransaction() {
  const router = useRouter();
  const { id } = router.query;

  const [transactions, setTransactions] = useState({});

  const fetchTransaction = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transaction/detail/${id}`
      );
      console.log(response.data);
      setTransactions(response.data);
    } catch (err) {
      console.error('Error fetching detail transaction :', err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTransaction(id);
    }
  }, []);

  function formatNumberWithCommas(number) {
    if (number === undefined || number === null) {
      return '';
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <>
      <div className='container-lg h-lvh overflow-y-auto bg-gradient-to-b from-[#7AA2E3] from-30% via-[#6AD4DD] via-40% to-[#97E7E1] to-50%a'>
        <div>
          <Link
            href={'/transaction'}
            className='flex mt-10 content-center justify-center'
          >
            <button className='btn btn-outline p-8 text-lg content-center'>
              Back
            </button>
          </Link>
        </div>
        <div className='flex grid grid-cols-6 p-10 my-10 justify-center content-center'>
          <div className='col-span-2 col-start-3 p-10 mb-10 justify-center bg-[#F8F6E3] border-2 border-dark-black rounded-2xl shadow-lg'>
            <div className='text-4xl text-center p-2 mx-2 mt-2 '>
              Detail Transaction
            </div>
          </div>
          {transactions ? (
            <div className='col-span-4 col-start-2 p-2'>
              <div className='grid grid-cols-8 p-2 m-2 my-2'>
                <div className='col-start-3 col-span-2 mx-2 p-2 text-2xl justify-self-end'>
                  Transaction ID :
                </div>
                <input
                  className='col-start-5 p-2 col-span-2 input input-ghost bg-white text-lg '
                  value={transactions.transaction_id}
                  readOnly
                />
              </div>
              <div className='grid grid-cols-8 p-2 m-2'>
                <div className='col-start-3 col-span-2 mx-2 p-2 text-2xl justify-self-end'>
                  Amount :
                </div>
                <input
                  className='col-start-5 p-2 input input-ghost bg-white text-lg'
                  value={formatNumberWithCommas(transactions.amount)}
                  readOnly
                />
              </div>
              <div className='grid grid-cols-8 p-2 m-2'>
                <div className='col-start-3 col-span-2 mx-2 p-2 text-2xl justify-self-end'>
                  Credit Account :
                </div>
                <input
                  className='col-start-5 p-2 input input-ghost bg-white text-lg '
                  value={transactions.credit_account}
                  readOnly
                />
                <Link
                  href={`/account/detail/${transactions.credit_account}`}
                  className='mx-4'
                >
                  <button className='btn btn-outline text-md'>
                    Account Details
                  </button>
                </Link>
              </div>
              <div className='grid grid-cols-8 p-2 m-2'>
                <div className='col-start-3 col-span-2 mx-2 p-2 text-2xl justify-self-end'>
                  Debit Account :
                </div>
                <input
                  className='col-start-5 p-2 input input-ghost bg-white text-lg '
                  value={transactions.debit_account}
                  readOnly
                />
                <Link
                  href={`/account/detail/${transactions.debit_account}`}
                  className='mx-4'
                >
                  <button className='btn btn-outline text-md'>
                    Account Details
                  </button>
                </Link>
              </div>
              <div className='grid grid-cols-8 p-2 m-2'>
                <div className='col-start-3 col-span-2 mx-2 p-2 text-2xl justify-self-end'>
                  Created At :
                </div>
                <input
                  className='col-start-5 col-span-2 p-2 input input-ghost bg-white text-lg'
                  value={transactions.created_at}
                  readOnly
                />
              </div>
            </div>
          ) : (
            <div> Loading ... </div>
          )}
        </div>
      </div>
    </>
  );
}
