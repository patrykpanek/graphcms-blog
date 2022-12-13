import React, { useEffect, useState} from 'react'
import Link from 'next/link';
import { getCategories } from '../services';


function Header() {
    const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then((newCategories)=> setCategories(newCategories))
 
  }, [])
  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='border-b w-full inline-block border-blue-400 py-8'>
            <div className='md:float-left block'>
                <Link href='/'>
                    <span className='cursor-pointer font-bold text-4xl text-white'>
                        Blog
                    </span>
                </Link>
            </div>
            <div className='hidden md:float-right md:contents align-middle'>
            {categories.map((category)=> (
             <Link key={category.slug} href={`/category/${category.slug}`}>
                <span className='md:float-right  text-white font-semibold leading-[41px] ml-2 text-xs'>{category.name}</span>
             </Link>
                ))}
            </div>
        </div>
        
    </div>
  )
}

export default Header