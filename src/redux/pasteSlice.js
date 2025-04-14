import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: (() => {
    try {
      const storedPastes = localStorage.getItem("pastes");
      return storedPastes ? JSON.parse(storedPastes) : [];
    } catch (error) {
      console.error("Error parsing pastes from localStorage:", error);
      return [];
    }
  })(),
}

export const pasteSlice = createSlice({
  // Slice name is 'paste' wheras initialState name is 'pastes'
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste = action.payload;

    // Check if the paste already exists in localStorage
    const existingPastes = JSON.parse(localStorage.getItem("pastes")) || [];

      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast("Paste created successfully");
      
    },

    // Update the paste in localStorage
    updateToPastes: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=>
        item._id === paste._id
      );

      if(index >= 0){
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("Paste updated successfully");
      }
    },

    // Reset all pastes in localStorage
    resetAllPastes: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes");
    },

    // Remove a paste from localStorage
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item)=>item._id === pasteId);

      // If data to be deleted is present , then >= 0
      if(index >= 0){
        state.pastes.splice(index,1);

        localStorage.setItem("pastes",JSON.stringify(state.pastes));

        toast.success("Paste deleted successfully");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer

// const initialState = {
//   pastes:(localStorage.getItem("pastes")
//   ? JSON.parse(localStorage.getItem("pastes"))
//   :[])
// }