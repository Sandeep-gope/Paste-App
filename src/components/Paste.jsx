import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const Paste = () => {

  const pastes = useSelector((state)=>
    state.paste.pastes
  );
  
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste)=>
  paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }

  const fromattedDate = dayjs().format('DD-MM-YYYY');

  return (
    <div>
      <input
      className='p-2 rounded-2xl mt-5 w-[600px] bg-amber-200'
      type="search" 
      placeholder='Search here'
      value={searchTerm} 
      onChange={(e)=>setSearchTerm(e.target.value)}/>

      <div className='flex flex-col gap-5 mt-4'>
        {filteredData.map((paste)=>{
          return(
            <div className='border-2 border-red-500 rounded-2xl' key={paste?._id}>
                
                <div>
                {paste.title}
                </div>

                <div>
                {paste.content}
                </div>

                <div
                className='flex flex-row place-content-end place-items-start '>
                  
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>
                    <img
                    className='h-7 w-7'
                    src="https://www.svgrepo.com/show/73131/edit-button.svg" alt="Edit" />
                    </a>
                  </button>

                  <button>
                    <a href={`/pastes/${paste?._id}`}>
                    <img
                    className='h-7 w-7'
                    src="https://w7.pngwing.com/pngs/220/888/png-transparent-computer-icons-button-encapsulated-postscript-viewing-text-logo-black.png" alt="View" />
                    </a>
                  </button>

                  <button onClick={() => handleDelete(paste?._id)}>
                    <img 
                    className='h-7 w-7'
                    src="https://www.svgrepo.com/show/21045/delete-button.svg" alt="Delete" />
                  </button>

                  <button onClick={() => {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to clipboard")
                  }}>
                    <img 
                    className='h-7 w-7'
                    src="https://cdn.pixabay.com/photo/2022/11/05/03/36/copy-7571066_640.png" alt="Copy" />
                  </button>

                  <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                      .then(() => alert('Link copied to clipboard!'))
                      .catch((err) => console.error('Copy failed:', err));
                  }}>
                    <img 
                    className='h-7 w-7'
                    src="https://cdn5.vectorstock.com/i/1000x1000/42/09/round-share-button-silhouette-icon-or-social-media-vector-46444209.jpg" alt="Share" />
                  </button>

                </div>

                <div>
                    <p>
                      {fromattedDate}
                    </p>
                </div>
            </div>
          )
        })}
      </div>

    </div>


  )
}

export default Paste
