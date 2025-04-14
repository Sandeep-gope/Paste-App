import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux'

const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) =>
   p._id === id)[0];
  console.log("Final Paste: ",paste);

  return (
    <div>

    <div className='flex flex-row gap-4 place-content-between'>
      <input 
      className='p-2 rounded-2xl mt-2 w-[65%] h-'
      type="text" 
      placeholder='Enter title here' 
      disabled
      value={paste.title}
      onChange={(e)=>setTitle(e.target.value)}
      />

      {/* <button 
      onClick={createPaste}
      className='p-2 rounded-1xl mt-2'
      >
        {pasteId ? "Update Paste" : "Create My Paste"}
      </button> */}
    </div>

    <div className='mt-4'>
      <textarea 
      className='rounded-2xl mt-4,
      min-w-[500px] p-4'
      value={paste.value}
      disabled
      placeholder='Enter your content here'
      onChange={(e)=>setValue(e.target.value)}
      rows={20}
      >

      </textarea>
    </div>
    </div>
  )
}

export default ViewPaste
