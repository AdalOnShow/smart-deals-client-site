import React from 'react'
import LatestProducts from '../components/Home/LatestProducts'
import Hero from '../components/Home/Hero'

const latestProductsPromise = fetch('http://localhost:5000/latest-products').then(res => res.json())

const Home = () => {
  return (
    <div className=' max-w-11/12 mx-auto'>
      <Hero />
      <LatestProducts promise={latestProductsPromise} />
    </div>
  )
}

export default Home