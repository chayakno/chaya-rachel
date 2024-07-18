import { createSlice } from "@reduxjs/toolkit";
import { updateItem,setData,addItem,deleteItem } from "../../app/actions.js";

const initialState = {
    data: []
};

const StudentSlice = createSlice({
    name: "Student",
    initialState,
    reducers: {
        deleteStudent:deleteItem,
        addStudent: addItem,
        getAllStudent:setData,
        updateStudent:updateItem
    }
});

export const { deleteStudent, addStudent,getAllStudent,updateStudent } = StudentSlice.actions;
export default StudentSlice.reducer;
