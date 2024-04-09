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

export default function List1() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);

      };
    return (
        <List className='max-w-lg min-h-lg' sx={{ bgcolor: 'background.paper' }}>
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="CS7314 - Advanced Topics in Computer Science"
            onClick={(event) => handleListItemClick(event, 0)}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Remy Sharp
                </Typography>
                {" — Dear students, Due to a large number of requests, I extended the deadline of Lab 4 until tomorrow (Wed…"}
              </React.Fragment>
            }
            primaryTypographyProps={{ color: 'primary' }}
          />
        </ListItemButton>
      </List>
    )
}