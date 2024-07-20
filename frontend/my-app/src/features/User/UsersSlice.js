import { createSlice } from "@reduxjs/toolkit";
import { updateItem,setData,addItem,deleteItem } from "../../app/actions.js";

const initialState = {
    data: []
};

const UsersSlice = createSlice({
    name: "Users",
    initialState,
    reducers: {
        deleteUsers:deleteItem,
        addUsers: addItem,
        getAllUsers:setData,
        updateUsers:updateItem
    }
});

export const { deleteUsers, addUsers,getAllUsers,updateUsers } = UsersSlice.actions;
export default UsersSlice.reducer;
