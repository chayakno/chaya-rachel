import Button from '@mui/material/Button';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTeachers } from '../features/Teachers/TeachersSlice';
import { getAllItems } from '../Api-Requests/genericRequest';

    const UpdateStatusTeachers=()=>{
    const dispatch = useDispatch();
    const students = useSelector((state) => state.Student.data);
    console.log(students);

        const fetchStudents = async () => {
          try{
            const response = await getAllItems('students/getAllPendingTeachers');
            dispatch(getAllTeachers(response.data));
  
          }catch{
            console.error('Error fetching students:');

          }
        }

        useEffect(() => {
          fetchStudents();
        }, []);
      

    return(
        <div>        
          
          
          <ul>
      {students.map((student) => (

        <div key={student._id}> 
         
          <p>Age: {student.age}</p>
          <p>subject:{student.subjects}</p>
          <Button variant="contained">Contained</Button>

        </div>
       
      ))}
    </ul>
    

      </div>
    )
}
export default UpdateStatusTeachers;



  
  

