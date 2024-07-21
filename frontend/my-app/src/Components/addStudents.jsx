import Button from '@mui/material/Button';
import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllStudent,updateStudent } from '../features/Student/StudentSlice';
import { getAllItems,updateItem } from '../Api-Requests/genericRequest';
import Box from '@mui/material/Box';
import  "./addStudents.css"


    const UpdateStatusStudent=()=>{
    const dispatch = useDispatch();
    const students = useSelector((state) => state.Student.data);
// console.log(students);
        const fetchStudents = async () => {
          try{
            const response = await getAllItems('students/getAllPendingStudents');
            dispatch(getAllStudent(response.data));
            console.log(response);
  
          }catch{
            console.error('Error fetching students:');
          }
        }

        useEffect(() => {
          fetchStudents();
        }, []);
      

        const Submit=async(id)=>{  
          console.log(id); 
          try{
            const response = await updateItem(`students/acceptStudent/${id}`);
            dispatch(updateStudent(response.data));
            // alert(student.exists)
          }catch{
            // console.error('Error fetching students:');
            alert("error")
          }
        }
    return(     
        <>      
    
       {students.map((student) => (        
         <Box
         height={150}
         width={250}
         my={4}
         display="flex"
         alignItems="center"
         gap={4}
         p={2}
         sx={{ border: '2px solid white' }}
         boxShadow={10}
       >
    <ul>   
    <h2> student {student.user.name}</h2>
    
   <div>subject:{student.subjects}</div>
  
    <p>email:{student.user.email}</p>
   
    <div>Age:{student.age}</div>
   
 <div> <Button variant="contained" onClick={() => Submit(student._id)}>Submit</Button></div>
 </ul>
  </Box>    

))}
  </>
    )
}
export default UpdateStatusStudent;



  
  

