import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';

export default function MyCard() {
 
const username=sessionStorage.getItem('email');

const [data, setData] = useState(null);
// user fetch to get the usersample.json data in the public folder and get the user's information based on the key username
// const [user, setUser] = useState(null);

useEffect(() => {
    fetch('/usersample.json')
    .then(response => response.json())
    .then(data => {
        // setUser(data);
        var jsondata=data;
        const user = jsondata.find(item => item['email'] === username); 
        setData(user);
    });
}, []);

// get one user's information based on the key username from the jsondata, jsondata is list of data from the usersample.json
// get on from the jsondata based on the key username




return (
    <Card  >
        <CardActionArea className='min-h-36'>
            <CardContent className="flex items-center">
                <ListItemAvatar >
                    <Avatar className="w-20 h-20 rounded-full mr-6" alt="John Doe"  />
                </ListItemAvatar>
                <div>
                <Typography gutterBottom variant="h5" component="div">
                   {data && data['name']}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                {data && data['type']} /2024 Spring 
                </Typography>
                <Typography variant="body3" color="text.secondary">
                {data && data['title']}
                </Typography>
                </div>
            </CardContent>
        </CardActionArea>
    </Card>
);
}