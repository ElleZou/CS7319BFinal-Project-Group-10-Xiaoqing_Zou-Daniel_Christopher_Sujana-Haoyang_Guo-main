
// this is a anoucement list component
// it should show the anoucement of the course
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {  useState } from 'react';
import { useEffect } from 'react';
import faye from 'faye';


const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};
var data2= [
    {
        "index": 1,
        "title": "Anouncement",
        "content": "Due to a large number of requests, I extended the deadline of Lab 4 until tomorrow (Wednesday).",
        "date": "2024-03-15"
    },
    {
        "index": 2,
        "title": "Assignment ",
        "content": "Please complete the questions in the following quiz. There is no time limit. However, you can attempt the quiz only three times. ",
        "date": "2024-03-15"
    }
]





export default function AnoucementList() {
    var [data, setData] = useState([]);
   
    useEffect(() => {
        setData(data2);
    }, []);

    const username = sessionStorage.getItem('email');

    const [open, setOpen] = React.useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
        // get the value of the input field
        var title = document.querySelector('input[placeholder="Add Anoucement"]').value;
        var content = document.querySelector('input[placeholder="Content"]').value;
        const newItem = { 'index': 4, 'title': title, 'content': content, 'date': "Apr-1-2024" };
        setData([...data, newItem]);
        console.log(data);
        //get the value of the input field

        var client = new faye.Client('http://localhost:8081/faye');
        client.publish('/7314', {text: content});
    }


    if (username == 'jdoe@smu.edu'){
        var Faye=require('faye');
        var client = new Faye.Client('http://localhost:8081/faye');
        client.subscribe('/7314', function(message) {
            console.log('Got a message: ' + message.text);
            const newItem = { 'index': 3, 'title': "Assignment", 'content': message.text, 'date': "Apr-1-2024" };
            setData([...data, newItem]);
        });
    }
    


    const handleClick = () => {
        setOpen(!open);
    };


    const fabs = [
        {
            color: 'primary',
            sx: fabStyle,
            icon: <AddIcon />,
            label: 'Add',
        },
    ];





    return (
        <List
            className='text-black min-w-96'
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader className='text-1xl min-h-10' component="div" id="nested-list-subheader">
                    CS7314 - Advanced Topics in Computer Science
                </ListSubheader>
            }
        >

            {data.map((item, index) => (
                <React.Fragment key={index}>
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary={item.title} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary={item.content} />
                                <ListItemText secondary={item.date} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </React.Fragment>
            ))}


            {username === 'rsharp@smu.edu' &&
                <div className='flex flex-col m-5 space-y-5 ' >
                    <input type='text' className='h-10 border-2 border-gray' placeholder='Add Anoucement' />
                    <input type='text' className='h-40 border-2 border-gray' placeholder='Content' />

                    <Fab className='' onClick={togglePopup} color="primary" aria-label="add">
                        <AddIcon />

                    </Fab></div>}
        </List>


    )
}