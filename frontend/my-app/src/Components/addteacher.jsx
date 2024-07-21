import Button from '@mui/material/Button';
import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTeachers,updateTeachers } from '../features/Teachers/TeachersSlice';
import { getAllItems,updateItem } from '../Api-Requests/genericRequest';
import Box from '@mui/material/Box';


    const UpdateStatusTeachers=()=>{
    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.Teachers.data);
    console.log(teachers);
        const fetchteachers = async () => {
          try{
            const response = await getAllItems('teacher/getAllPendingSTeachers');
            dispatch(getAllTeachers(response.data));
          }catch{
            console.error('Error fetching students:');
          }
        }

        useEffect(() => {
          fetchteachers();
        }, []);

        // const Submit=async({teacher})=>{   
        //   try{
        //     const response = await updateItem(`/teacher/acceptTeacher/:${teacher._id}`);
        //     dispatch(updateTeachers(response.data));
        //   }catch{
        //     console.error('Error fetching students:');
        //   }
        // }
    return(     
          <ul>
      <Box
      height={170}
      width={210}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
      boxShadow={10}
    >
       {teachers.map((teacher) => (
       <div key={teacher._id}> 
    <h2> teacher of {teacher.subjects}</h2>
    <p>subject:{teacher.user.name}</p>
    <p>email:{teacher.user.email}</p>
    <p>Age:{teacher.age}</p>
  {/* <Button variant="contained" onClick={() => Submit(teacher)}>Submit</Button> */}


</div>

))}
    </Box>    
    </ul>
    )
}
export default UpdateStatusTeachers;



  
  

