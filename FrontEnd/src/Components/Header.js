import { AppBar, Container, createTheme, FormControl, InputLabel, MenuItem, Select, ThemeProvider, Toolbar, Typography, } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSlidebar';




const Header = () => {

  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();
  // console.log(currency);
  
  return (

    <div className='header'>
        <AppBar position='static' color='transparent'>
          <Container>
            <Toolbar>
              <Typography
                onClick={() => navigate('/')}
                className="title"
                style={{
                  fontWeight: '800',
                  fontFamily: 'Montserrat',
                  fontSize: 24,
                }}
              >
                Crypto Tracker
              </Typography>
              {/* <FormControl size='small' style={{ flex: 1, flexDirection: 'row'}}>
                <InputLabel id='select-currency' style={{ marginLeft: 15,}}></InputLabel>
                <Select
                  variant='outlined'
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{
                    width: 100,
                    height: 40,
                    color: '#000',
                    marginLeft: 350,
                    marginTop: 5,
                  }}
                >
                  <MenuItem value={'USD'}>USD</MenuItem>
                  <MenuItem value={'INR'}>INR </MenuItem>
                </Select>
              </FormControl> */}
                {user ? <UserSidebar /> : <AuthModal />}
            </Toolbar>
          </Container>
        </AppBar>
    </div>
  )
}

export default Header;