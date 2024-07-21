import { configureStore } from "@reduxjs/toolkit";
import StudentSlice from "../features/Student/StudentSlice";
import MessageSlice from "../features/Massage/MessageSlice";
import TeachersSlice from "../features/Teachers/TeachersSlice";
import UsersSlice from "../features/User/UsersSlice"
export const store = configureStore({
    reducer: {
        Student: StudentSlice,
        Message: MessageSlice,
        Teachers: TeachersSlice,
        Users:UsersSlice
    }   
});
export default store;
