import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import StudentsComponent from '../TestComponent'
import  AddWorkerComponent  from "./AddWorkerComponent";
import addUser from "./addStudent";



const MyComponent = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Router>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label=" הוספת סטודנט" value="1" component={Link} to="/students" />
            <Tab label="הוספת עובד" value="2" component={Link} to="/add-worker" />
            <Tab label="Item Three" value="3" component={Link} to="/item-three" />
          </TabList>
        </Box>
        <Routes>
          <Route path="/students" element={<TabPanel value="1"><addUser /></TabPanel>} />
          <Route path="/add-worker" element={<TabPanel value="2"><AddWorkerComponent /></TabPanel>} />
          <Route path="/item-three" element={<TabPanel value="3"></TabPanel>} />
        </Routes>
      </TabContext>
    </Router>
  );
};

export default MyComponent;
