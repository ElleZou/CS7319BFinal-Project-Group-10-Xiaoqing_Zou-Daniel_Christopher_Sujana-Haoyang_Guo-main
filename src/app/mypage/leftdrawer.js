"use client"
import { useRouter } from 'next/navigation'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MyCard from './mycard';
import ListItemButton from '@mui/material/ListItemButton';
import { useState, useEffect } from 'react';
import List1 from './List1';
import List3 from './List3';
import List2 from './List2';


export function LeftDrawer({ sendDatatoParent }) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [data, setData] = React.useState(null);


  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    sendDatatoParent(index);
  };
  var jsonfilepath = ''
  const username = sessionStorage.getItem('email');
  if (username == 'jdoe@smu.edu') {
    jsonfilepath = 'stuCourse1.json';
  } else if (username == "rsharp@smu.edu") {
    jsonfilepath = 'teaCourse.json';
  } else {
    jsonfilepath = 'stuCourse2.json';
  }

  console.log('/'+jsonfilepath)

  // dynamic load the list item from jsonfile
  useEffect(() => {
    // Fetch data from your JSON file
    fetch('/' + jsonfilepath)
      .then(response => response.json())
      .then(data => {
        // conver data to json
        var jsondata = data;
        setData(jsondata);
        console.log(jsondata);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to ensure this effect runs only once

  // If data is null, return a loading message




  return (
    // a div in centern of the page

    <div className="h-screen">

      <MyCard className='min-w-72 min-h-40'></MyCard>
      {username === 'jdoe@smu.edu' && <List1 />}
      {username === 'rsharp@smu.edu' && <List3 />}
      {username === 'rsam@smu.edu' && <List2 />}
    </div>
  );
}