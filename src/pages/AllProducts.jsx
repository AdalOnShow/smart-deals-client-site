import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../components/Product'

const AllProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('https://smart-deals-server-sigma-beige.vercel.app/products').then(data => setProducts(data.data))

  }, [products])


  return (
    <div className='py-8 max-w-11/12 mx-auto flex-center flex-col'>
      <h2 className='font-bold text-center text-5xl mb-4'>Recent <span className='text-primary'>Products</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map(product => <Product key={product._id} product={product} />)}
      </div>
    </div>
  )
}

export default AllProducts