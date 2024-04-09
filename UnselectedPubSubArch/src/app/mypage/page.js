// my page show the student's enrolled courses and the announcements of the courses, the courses shoule be clickable list at the webstie's left , and the announcements should be shown at the right side of the page
// the page should have a logout button at the top right corner
// this is a nextjs page
"use client"

import * as React from 'react';
import { LeftDrawer } from './leftdrawer';
import AnoucementList from './anoucementlist';
import  { useContext } from 'react';  
import { AuthContext } from '../userContext';


export default function MyPage() {
  //define the callback function to handle the click event from the left drawer
  

  const username = sessionStorage.getItem('email');

 
  const getItemSelected = (index) => {
    console.log(index);
    if (index === 0) {
      // show the announcement list
    }


  };



  return (
    <div className='absolute left-0 top-0 min-h-full bg-white flex'>
     {/* render the left drawer and pass the callback function to it */}

      <LeftDrawer className='min-w-96' sendDatatoParent={getItemSelected}></LeftDrawer>
      {/* render the announcement list */}
      <AnoucementList className="min-w-96"></AnoucementList>

    </div>

   
  );
}

