'use client'
import { set } from 'mongoose';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

function AddTopic() {

  const router = useRouter();

  const[values, setValues] = useState({
    title: '',
    description: ''
  });

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!values.title || !values.description) {
//       alert('Please fill in all fields');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3000/api/topics', { 
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({title: values.title, description: values.description})
//       })
//       if (response.ok) {
//         router.push('/');
//       }else {
//         throw new Error('Failed to add topic');
//       }

//     } catch (error) {
//       console.log('Error adding topic: ', error);
//     }
// }

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.title || !values.description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/topics', values , {
        headers: {
          'Content-Type': 'application/json'
        }});
      if (response.status === 201) {
        // router.replace('/');
        location.replace('/');
      }else {
        throw new Error('Failed to add topic');
      }

    } catch (error) {
      console.log('Error adding topic: ', error);
    }
}

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input onChange={(e) => setValues({...values , title: e.target.value})} value={values.title} type="text" className='border border-slate-500 px-8 py-2' placeholder='Topic Title' />

        <input onChange={(e) => setValues({...values , description: e.target.value})} value={values.description} type="text" className='border border-slate-500 px-8 py-2' placeholder='Topic Description' />

        <button className='bg-green-600 font-bold text-white py-3 px-6 w-fit' type="submit">
            Add Topic
        </button>
      </form>
    </>
  )
}

export default AddTopic
