import { PayloadAction } from "@reduxjs/toolkit";



export const deleteItem = (state, action) => {
    return {
      ...state,
      data: state.data.filter((item) => item.id !== action.payload),
    };
  };

  export const addItem = (state, action) => {  
    return {
      ...state,
      data: [...state.data, action.payload],
    };
  };
  
  export const setData =(state, action) => {
    return {
      ...state,
      data: action.payload,
    };
  };
  
  export const updateItem =(state, action) => {
    const updatedState = { ...state };
    const updatedIndex = updatedState.data.findIndex((item) => item.id === action.payload.id);
    if (updatedIndex !== -1) {
      const updatedData = [...updatedState.data];
      updatedData[updatedIndex] = action.payload;
      updatedState.data = updatedData;
    }
    return updatedState;
  };
  