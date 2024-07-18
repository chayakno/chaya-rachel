import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllStudent, addStudent, deleteStudent, updateStudent } from '../src/features/Student/StudentSlice';
import { getAllItems } from '../src/Api-Requests/genericRequest';

const StudentsComponent = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.Student.data);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await getAllItems('students/getAllStudents');
      dispatch(getAllStudent(response.data));
    };

    fetchStudents();
  }, [dispatch]);

  return (
    <div>
        <button >getallstudent</button>
      {students.map((student) => (
        <div key={student.id}>{student.name}</div>
      ))}
    </div>
  );
};

export default StudentsComponent;
