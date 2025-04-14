import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const [title,setTitle] = useState('');
  const [value,setValue] = useState('');
  const [searchParams,setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state)=>state.paste.pastes);

  useEffect(() => {
    console.log("Inside use Effect");
    if(pasteId){
      const paste = allPastes.find((p)=> p._id === pasteId);
      console.log("page found");
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId])
  

  function createPaste(){
    const paste={
      title: title,
      content: value,
      _id: pasteId || 
            Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if(pasteId){
      // Update paste if it's already present
      // Functions are written in slice
      dispatch(updateToPastes(paste));
    }
    else{
      // Create paste if it's not available
      // Functions are written in slice
      dispatch(addToPastes(paste));
    }

    // After updation or creation of paste 
    setTitle('');
    setValue('');
    setSearchParams({});

  }

  return (
    <div>

    <div className='flex flex-row gap-4 place-content-between'>
      <input 
      className='p-2 rounded-2xl mt-2 w-[65%] bg-pink-50'
      type="text" 
      placeholder='Enter title here' 
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />

      <button 
      onClick={createPaste}
      className='p-2 rounded-1xl mt-2'
      >
        {pasteId ? "Update Paste" : "Create My Paste"}
      </button>
    </div>

    <div className='mt-4'>
      <textarea 
      className='rounded-2xl mt-4,
      min-w-[500px] p-4 bg-red-200'
      value={value}
      placeholder='Enter your content here'
      onChange={(e)=>setValue(e.target.value)}
      rows={20}
      >

      </textarea>
    </div>
    </div>
  )
}

export default Home
