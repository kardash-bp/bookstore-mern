import React from 'react'
import { UseCartContext } from '../../Context'

const AddressForm = () => {
  const [, setCart] = UseCartContext()
  const handleChange = (name) => (e) => {
    setCart((perv) => ({
      ...perv,
      address: { ...perv.address, [name]: e.target.value },
    }))
  }
  return (
    <div>
      <div className='card mb-4'>
        <div className='card-header py-3'>
          <h5 className='mb-0'>Delivery address</h5>
        </div>
        <div className='card-body'>
          <form>
            <div className='row mb-4'>
              <div className='col'>
                <div className='form-outline'>
                  <input
                    name='first'
                    type='text'
                    id='form7Example1'
                    className='form-control'
                    onChange={handleChange('first')}
                  />
                  <label className='form-label' htmlFor='form7Example1'>
                    First name
                  </label>
                </div>
              </div>
              <div className='col'>
                <div className='form-outline'>
                  <input
                    name='last'
                    type='text'
                    id='form7Example2'
                    className='form-control'
                    onChange={handleChange('last')}
                    required
                  />
                  <label className='form-label' htmlFor='form7Example2'>
                    Last name
                  </label>
                </div>
              </div>
            </div>

            <div className='form-outline mb-4'>
              <input
                name='address'
                type='text'
                id='form7Example4'
                className='form-control'
                onChange={handleChange('address')}
                required
              />
              <label className='form-label' htmlFor='form7Example4'>
                Address
              </label>
            </div>

            <div className='form-outline mb-4'>
              <input
                type='tel'
                id='form7Example6'
                className='form-control'
                // pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              />
              <label className='form-label' htmlFor='form7Example6'>
                Phone
              </label>
            </div>

            <div className='form-outline mb-4'>
              <textarea
                name='msg'
                className='form-control'
                id='form7Example7'
                rows='4'
                onChange={handleChange('msg')}
              ></textarea>
              <label className='form-label' htmlFor='form7Example7'>
                Additional information
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddressForm
