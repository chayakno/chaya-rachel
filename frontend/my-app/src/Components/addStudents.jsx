import Button from '@mui/material/Button';
import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllStudent } from '../features/Student/StudentSlice';
import {updateUsers } from "../features/User/UsersSlice"
import { getAllItems,updateItem } from '../Api-Requests/genericRequest';
import Box from '@mui/material/Box';


    const UpdateStatusStudent=()=>{
    const dispatch = useDispatch();
    const students = useSelector((state) => state.Student.data);
    console.log(students);

        const fetchStudents = async () => {
          try{
            const response = await getAllItems('students/getAllPendingStudents');
            dispatch(getAllStudent(response.data));
  
          }catch{
            console.error('Error fetching students:');

          }
        }

        useEffect(() => {
          fetchStudents();
        }, []);
      

        const Submit=async({student})=>{   
          alert("לסדר את הפונקציה בבבקנד של שינויי סטטוס")
          // try{
          //   setExistStatus(true);
          //   const response = await updateItem('users//users/:student._id/true');
          //   dispatch(updateUsers(response.data));
          // }catch{
          //   console.error('Error fetching students:');
          // }
        }
    return(     
          <ul>
<Box
      height={150}
      width={100}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
       {students.map((student) => (

         <div key={student._id}> 
 
  <p>Age: {student.user.name}</p>
  <p>subject:{student.subjects}</p>
  <Button variant="contained" onClick={() => Submit(student)}>Submit</Button>


</div>

))}
    </Box>    
    </ul>
    )
}
export default UpdateStatusStudent;



  
  

