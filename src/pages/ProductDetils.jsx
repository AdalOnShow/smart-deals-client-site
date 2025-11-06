import React, { useRef, useState } from 'react'
import { useLoaderData } from 'react-router'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import axios from 'axios'
import useAuth from '../hooks/useAuth'

const ProductDetils = () => {
  const { user } = useAuth()
  const { title, description = " ", _id: productId } = useLoaderData()
  const modalRef = useRef()
  const [bids, setBids] = useState([])

  useEffect(() => {
    // fetch(`http://localhost:5000/product/bids/${productId}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setBids(data)
    //   })

    axios.get(`http://localhost:5000/product/bids/${productId}`)
      .then(data => {
        setBids(data.data)
      })
  }, [productId])


  const handleBidModal = () => {
    const modal = modalRef.current
    modal.showModal()
  }

  const handleBidSubmit = (e) => {
    e.preventDefault()
    const buyerName = e.target.name.value
    const buyerEmail = e.target.email.value
    const buyerPhoto = e.target.photo.value
    const bid_price = e.target.price.value
    const buyerContact = e.target.contact.value

    const newBid = { productId, buyerName, buyerEmail, buyerPhoto, bid_price, buyerContact }

    fetch('http://localhost:5000/bids', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newBid)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          e.target.reset()
          modalRef.current.close()
          Swal.fire({
            title: "Bid Placed Successfull!",
            icon: "success",
            draggable: true
          });
          newBid._id = data.insertedId
          const newBids = [...bids, newBid]
          const sortedBids = newBids.sort((a, b) => b.bid_price - a.bid_price)
          setBids(sortedBids)
        }
      })
  }

  return (
    <div className="">
      <div className="hero bg-base-200 py-8">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="py-6">
              {description}
            </p>
            <button onClick={handleBidModal} className="btn btn-primary">I want Buy This Product</button>
            <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <form onSubmit={(e) => handleBidSubmit(e)} className="card-body">
                  <h2 className='text-center text-2xl font-bold'>Give Seller Your Offered Price</h2>
                  <fieldset className="fieldset">
                    <div className="flex-center gap-2">
                      <div className="">
                        <label className="label">Buyer Name</label>
                        <input type="name" defaultValue={user?.displayName} readOnly name="name" className="input" placeholder="Your Name" />
                      </div>
                      <div className="">
                        <label className="label flex-1">Buyer Email</label>
                        <input type="email" name="email" defaultValue={user?.email} readOnly className="input" placeholder="Your Email" />
                      </div>
                    </div>
                    <label className="label flex-1">Buyer Image URL</label>
                    <input type="text" defaultValue={user?.photoURL} name="photo" className="input w-full" placeholder="https://...your_img_url" />
                    <label className="label flex-1">Place your Price</label>
                    <input type="text" name="price" className="input w-full" placeholder="e.g. Artisan Roasters" />
                    <label className="label flex-1">Contact Info</label>
                    <input type="tel" name="contact" className="input w-full" placeholder="e.g. +1-555-1234" />
                    <button type='submit' className="btn btn-neutral mt-4">Submit Bid</button>
                  </fieldset>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Cencel</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className='text-2xl font-bold my-4'>Bids For This Products: <span className='text-primary'>{bids.length}</span></h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>SL No</th>
                <th>Buyer</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bids.map(({ buyerName, buyerEmail, buyerPhoto, bid_price }, index) =>
                <tr key={index}>
                  <th>
                    {index + 1}
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={buyerPhoto}
                            alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{buyerName}</div>
                        <div className="text-sm opacity-50">{buyerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">${bid_price}</span>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductDetils