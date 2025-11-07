import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import useAuth from '../hooks/useAuth'
import useAxios from '../hooks/useAxios'

const MyBids = () => {
  const { user } = useAuth()
  const [bids, setBids] = useState([])
  const axiosInstance = useAxios()

  useEffect(() => {
    if (user?.email) {
      axiosInstance.get(`/bids?email=${user.email}`)
        .then(data => {
          setBids(data.data)
        })
    }
  }, [user, axiosInstance])

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this bid?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/bids/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your bid has been deleted.',
                'success'
              )
              const remainingBids = bids.filter(bid => bid._id !== _id)
              setBids(remainingBids)
            }
          })
      }
    })
  }
  return (
    <div className='max-w-11/12 mx-auto'>
      <h2 className='text-2xl font-bold my-4'>My Bids: <span className='text-primary'>{bids.length}</span></h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL No</th>
              <th>Buyer</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bids.map(({ _id, buyerName, buyerEmail, buyerPhoto, bid_price }, index) =>
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
                <td>
                  <span className="badge badge-warning badge-md">Pending</span>
                </td>
                <th>
                  <button onClick={() => handleDeleteBid(_id)} className="btn btn-outline btn-xs">Delate</button>
                </th>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyBids