import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <div className='loading'>
        <ReactLoading
        type='spin'
        color='dodgerblue'
        width='20%'
        height='20%'
        className='loading-spin'
        />
    </div>
  )
}
