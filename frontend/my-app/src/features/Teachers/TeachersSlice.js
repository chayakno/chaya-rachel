import { createSlice } from "@reduxjs/toolkit";
import { updateItem,setData,addItem,deleteItem } from "../../app/actions.js";

const initialState = {
    data: []
};

const TeachersSlice = createSlice({
    name: "Teachers",
    initialState,
    reducers: {
        deleteTeachers:deleteItem,
        addTeachers: addItem,
        getAllTeachers:setData,
        updateTeachers:updateItem
    }
});

export const { deleteTeachers, addTeachers,getAllTeachers,updateTeachers } = TeachersSlice.actions;
export default TeachersSlice.reducer;
