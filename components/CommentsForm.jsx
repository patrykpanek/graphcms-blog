import React, { useEffect, useRef, useState } from 'react'
import { submitComment } from '../services';


function CommentsForm({slug}) {

  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccesMessage, setShowSuccesMessage] = useState(false);
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  useEffect(()=> {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
  }, [])

  const handleCommentSubmition = () => {
    setError(false);
    const {value: comment} = commentEl.current
    const {value: name} = nameEl.current
    const {value: email} = emailEl.current
    const {checked: storeData} = storeDataEl.current

    if(!comment || !name || !email){
      setError(true)
      return;
    }
    console.log(comment, name, email)
    const commentObj = {
      name, email, comment, slug
    }
    if(storeData){
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', name);
    }else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', name);

    }

    submitComment(commentObj).then((res)=> {
      setShowSuccesMessage(true);
      setTimeout(()=> {
        setShowSuccesMessage(false)
      }, 3000)
    })
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Leave a Reply
      </h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea ref={commentEl} className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700' placeholder='Comment' name='comment'/>
      </div>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4'>
        <input type="text" ref={nameEl} className='p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700' placeholder='Name' name='name'/>
      
      
        <input type="text" ref={emailEl} className='p-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700' placeholder='Email' name='email'/>
      </div>
      <div className='grid grid-cols-1 mb-4 gap-4 '>
        <div>
          <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true" className='ml-2' />
          <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>Save my email and name for the next time I comment.</label>
        </div>
      </div>
      {error && <p className='text-[16px] ml-2 text-red-500'>All field are required!</p>}
      <div className='mt-5'>
        <button type='button' onClick={handleCommentSubmition} className='transition duration-500 hover:translate-x-1 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'>Post comment</button>
        {showSuccesMessage && <p className='text-xl font-normal mt-3  text-green-500'>Comment submiteed for review.</p>}
      </div>
    </div>
  )
}

export default CommentsForm