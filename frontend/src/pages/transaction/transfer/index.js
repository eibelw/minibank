import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function Transfer() {
  const [debit, setDebit] = useState([]);
  const [credit, setCredit] = useState([]);
  const [selectedDebit, setselectedDebit] = useState('');
  const [selectedCredit, setselectedCredit] = useState('');
  const [amount, setAmount] = useState('');

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/account/list/no');
      setDebit(response.data);
      setCredit(response.data);
    } catch (err) {
      console.error('Error fetching accounts:', err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const createTransaction = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/transaction/create',
        {
          debit_account: parseInt(selectedDebit),
          credit_account: parseInt(selectedCredit),
          amount: amount,
        }
      );

      if (response.status === 400) {
        Swal.fire({
          title: 'Oops...',
          text: 'Debit balance is not enough',
          icon: 'error',
        });
        return;
      }

      // console.log('Transaction created:', response.data);
      setAmount('');
      Swal.fire({
        title: 'Great!',
        text: 'Transaction created!',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/transaction';
        }
      });
    } catch (err) {
      console.error('Error creating transaction:', err);
    }
  };

  return (
    <div className='container-lg h-lvh overflow-y-auto bg-gradient-to-b from-[#7AA2E3] from-30% via-[#6AD4DD] via-40% to-[#97E7E1] to-50%'>
      <div className='flex justify-center items-center p-10 h-lvh content-center '>
        <div className='grid grid-cols-6 p-6 bg-[#F8F6E3] border-2 border-dark-black rounded-2xl shadow-2xl'>
          <div className='col-span-6 p-6 my-10 text-center text-4xl border-4 border-slate-500 rounded-xl '>
            Transfer
          </div>
          <div className='col-start-2 col-span-4 p-4 mx-2 my-2 '>
            <div className='text-2xl p-2 my-2'> Debit Account </div>
            <select
              className='select select-ed w-full max-w-xs my-1 text-lg border-2 border-black rounded-2xl'
              onChange={(e) => setselectedDebit(e.target.value)}
              placeholder={
                selectedDebit ? selectedDebit : 'Choose debit account numnber'
              }
            >
              {debit.map((data) => (
                <option
                  key={data.account_no}
                  value={data.account_no}
                  className='rounded-xl'
                >
                  {data.account_no}
                </option>
              ))}
            </select>
          </div>
          <div className='col-start-2 col-span-4 p-4 mx-2 my-2 '>
            <div className='text-2xl p-2 my-2'> Credit Account </div>
            <select
              className='select select-ed w-full max-w-xs my-1 text-lg border-2 border-black rounded-2xl'
              onChange={(e) => setselectedCredit(e.target.value)}
              placeholder={
                selectedCredit ? selectedCredit : 'Choose credit account number'
              }
            >
              {credit.map((data) => (
                <option key={data.account_no} value={data.account_no}>
                  {data.account_no}
                </option>
              ))}
            </select>
          </div>
          <div className='col-start-2 col-span-4 p-4 mx-2 my-2 '>
            <div className='text-2xl p-2 my-2'> Amount </div>
            <input
              type='number'
              placeholder='Input amount here'
              className='input input-ed w-full max-w-xs text-lg border-2 border-black rounded-2xl'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className=' flex col-start-2 col-span-4 p-4 my-2 justify-center items-center'>
            <button
              className='btn btn-outline p-4 content-center text-lg hover:bg-gray-800'
              onClick={createTransaction}
            >
              Transfer
            </button>
          </div>
        </div>
        <div className='fixed -top-0'>
          <Link href={'/'} className='flex mt-10 content-center justify-center'>
            <button className='btn btn-outline p-8 text-lg content-center'>
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
