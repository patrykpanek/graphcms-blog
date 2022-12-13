import React from 'react'


function Author({author}) {
  return (
    <div className='mt-20 text-center mb-8 p-12 relative rounded-lg bg-black bg-opacity-20'>
      <div className='absolute  left-1/2 translate-x-[-50%] -top-14'>
      <img
      alt={author.name}
      height='100px'
      width='100px'
      className='align-middle rounded-full'
      src={author.photo.url}
      />
      </div>
      <h3 className='text-white my-4 text-xl font-bolt'>{author.name}</h3>
      <p className='text-white text-lg'>{author.bio}</p>

      
    </div>
  )
}

export default Author