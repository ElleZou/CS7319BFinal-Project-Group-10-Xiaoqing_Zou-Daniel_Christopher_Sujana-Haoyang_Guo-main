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
        <Divider variant="inset" component="li" />
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="CS7315 - Operating Systems"
            onClick={(event) => handleListItemClick(event, 1)}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Travis Howard
                </Typography>
                {" — Dear students, Lab 1 grades are posted, please contact your teammate who submitted the assignment f"}
              </React.Fragment>
            }
            primaryTypographyProps={{ color: 'primary' }}
          />
        </ListItemButton>
        <Divider variant="inset" component="li" />
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="CS7344 - Mahine Learning"
            onClick={(event) => handleListItemClick(event, 2)}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Cindy Baker
                </Typography>
                {' — Dear students, Quiz 1 is available and the deadline is 13 Feb. Please look at Home --> Module 2 -->  Qu'}
              </React.Fragment>
            }
            primaryTypographyProps={{ color: 'primary' }}
          />
        </ListItemButton>
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Michales Brust" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="CS7316 - Software Engineering"
            onClick={(event) => handleListItemClick(event, 3)}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Michales Brust
                </Typography>
                {' — Dear all, I have additional office hours today from 11 am to 1 pm through Zoom.Please feel free to get h'}
              </React.Fragment>
            }
            primaryTypographyProps={{ color: 'primary' }}
          />
        </ListItemButton>
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Held Moon" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="CS7316 - Computer Networks"
            onClick={(event) => handleListItemClick(event, 4)}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Held Moon
                </Typography>
                {' — I have posted solution for all three homework assignments on PSLMS.Homework 1_solution.docxHome'}
              </React.Fragment>
            }
            primaryTypographyProps={{ color: 'primary' }}
          />
        </ListItemButton>
        <ListItemButton alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Javis Woon" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="CS7332 - Data Science"
            onClick={(event) => handleListItemClick(event, 5)}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Javis Woon
                </Typography>
                {' — There is some information missing in the Programming 1 assignment.For the round-robin priority algorith..'}
              </React.Fragment>
            }
            primaryTypographyProps={{ color: 'primary' }}
          />
        </ListItemButton>
      </List>
    )
}