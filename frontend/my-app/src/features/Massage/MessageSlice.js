import { createSlice } from "@reduxjs/toolkit";
import { updateItem,setData,addItem,deleteItem } from "../../app/actions.js";

const initialState = {
    data: []
};

const MessageSlice = createSlice({
    name: "Message",
    initialState,
    reducers: {
        deleteMessage:deleteItem,
        addMessage: addItem,
        getAllMessage:setData,
        updateMessage:updateItem
    }
});

export const { deleteMessage, addMessage,getAllMessage,updateMessage } = MessageSlice.actions;
export default MessageSlice.reducer;
