import Button from '@mui/material/Box';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllStudent, addStudent, deleteStudent, updateStudent } from '../features/Student/StudentSlice';
import { getAllItems } from '../src/Api-Requests/genericRequest';


const addStudent=()=>{
    const dispatch = useDispatch();
    const students = useSelector((state) => state.Student.data);
    useEffect(() => {
        const fetchStudents = async () => {
          const response = await getAllItems('students/getAllStudents');
          dispatch(getAllStudent(response.data));
        };
    
        fetchStudents();
      }, [dispatch]);

    return(

      //לעדות פילטר רק מי מממתין
        <div>
        {students.map((student) => (
          
          <div key={student.id}>{student.name}
                  <Button variant="contained">Contained</Button>
          </div>

        ))}
      </div>

    )
}
export default addStudent;



  
  

