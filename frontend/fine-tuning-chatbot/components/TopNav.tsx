import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';



const titleTheme = extendTheme({
    typography: {
        h1: {
        //   background:
        //     'linear-gradient(-30deg, var(--joy-palette-primary-700), var(--joy-palette-primary-400))',
        //   WebkitBackgroundClip: 'text',
          WebkitTextFillColor: '#ffffff',
        },
      },
})

const TopNav: React.FC = () => {

    const Title:String = "Ddong's Stusy";

    return(
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
                <Toolbar>
                    <a href='/'>
                        <CssVarsProvider theme={titleTheme}>
                            <Box sx={(theme) => theme.typography.h1}> 
                            {Title}
                            </Box>
                        </CssVarsProvider>
                    </a>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
            </AppBar>
        </Box>
    );
    
}

export default TopNav