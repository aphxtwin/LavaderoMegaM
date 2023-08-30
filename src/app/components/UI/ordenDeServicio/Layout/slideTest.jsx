import React, { useState } from 'react';
import { Button, Slide, Box, Paper, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
function SlideTest() {
  const [show, setShow] = useState(false);

  return (
    <Box sx={{display:'flex'}}>
        <Paper sx={{maxWidth:'50vw', height:'300px'}} elevation={10}>
          <Card variant="outlined" sx={{ padding: 2, maxWidth: '250px', height:'300px' }}>
            <CardActionArea onClick={() => setShow(!show)}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '1px',
                  }}
                >
                  <PersonAdd sx={{ fontSize: 100 }} />
                  <Typography variant="h5" component="h2">
                    Añadir Nuevo Cliente
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Paper>      
        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
        <Box sx={{
            p:5,
            zIndex:2000,
            top:0,
            backgroundColor: 'white',
            border:'2px solid gray',
            position: 'absolute',
            zIndex:1000,
            }}>
            <Box sx={{ 
                width: '50vw',
                height: '300px',
                }}
            >
            content
            </Box>
        </Box>
      </Slide>
    </Box>
  );
}

export default SlideTest;
