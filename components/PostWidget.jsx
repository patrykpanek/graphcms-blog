import React, {useState, useEffect} from 'react'
import moment from 'moment'
import Link from 'next/link'

import { getRecentPosts, getSimilarPosts } from '../services';


function PostWidget({categories, slug}) {
  const [relatedPost, setRelatedPost] = useState([]);

  useEffect(() => {
    if(slug) {
      getSimilarPosts(categories,slug).then((result)=> setRelatedPost(result))
    }else{
      getRecentPosts().then((result)=> setRelatedPost(result))
    }
  }, [slug])


  
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Related Posts' : 'Recent Post'}
      </h3>
      {relatedPost.map((post)=> (
        <div key={post.title} className='flex items-center  pb-3'>
          <div className=' flex-none'>
            <img 
            height='100px'
            width='100px'
            src={post.featuredImage.url} 
            alt={post.title} 
            className='align-middle rounded-full'
            />
          </div>
          <div className='flex-grow ml-4 align-middle'>
            <p className='text-gray-500 font-xs'>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} key={post.title} className='text-md'>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget