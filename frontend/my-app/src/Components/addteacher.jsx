import Button from '@mui/material/Button';
import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTeachers,updateTeachers } from '../features/Teachers/TeachersSlice';
import { getAllItems,updateItem } from '../Api-Requests/genericRequest';
import Box from '@mui/material/Box';
import  "./addStudents.css"


    const UpdateStatusTeachers=()=>{
    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.Teachers.data);
    console.log(teachers);
        const fetchteachers = async () => {
          try{
            const response = await getAllItems('teacher/getAllPendingSTeachers');
            dispatch(getAllTeachers(response.data));
            console.log(response);
          }catch{
            console.error('Error fetching students:');
          }
        }

        useEffect(() => {
          fetchteachers();
        }, []);

        const Submit=async(teacher)=>{  
          console.log(teacher); 
          try{
            const response = await updateItem(`teacher/acceptTeacher/${teacher._id}`);
            dispatch(updateTeachers(response.data));
            console.log(response);
          }catch{
            console.error('Error fetching students:');
          }
        }
    return   (     
      <>      
  <div className="a">
     {teachers.map((teacher) => (        
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
  <h2> teacher {teacher.user.name}</h2>
  
 <div>subject:{teacher.subjects}</div>

  <p>email:{teacher.user.email}</p>
 
  <div>Age:{teacher.age}</div>
 
<div> <Button variant="contained" onClick={() => Submit(teacher)}>Submit</Button></div>
</ul>
</Box>    

))}
</div>
</>
  )}

  
export default UpdateStatusTeachers;



  
  

