import { Container, Typography} from '@mui/material';
import React from 'react';
import '../../Styles/HomePage.css';
import Carousel from '../Carousel';


const Banner = () => {
    return (
        <div className='BannerCont'>
            <Container className='BannerContent' >
                <Typography
                    variant='h2'
                    style={{
                        fontWeight: '800',
                        fontFamily: 'sans-serif',
                        fontSize: 55,
                        justifyContent: 'space-around',
                        textAlign: 'center',
                        paddingTop: 30,
                    }}
                >
                    Crypto Tracker
                </Typography>
                <Typography
                    variant='subtitle2'
                    style={{
                        fontWeight: 'normal',
                        fontFamily: 'Montserrat',
                        fontSize: 15,
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    Get All The Info Regarding Your Favorite Crypto Currency
                </Typography>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner;