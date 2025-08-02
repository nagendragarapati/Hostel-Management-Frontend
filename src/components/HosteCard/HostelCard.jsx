import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useState } from 'react';
import StarsIcon from '@mui/icons-material/Stars';
import { getRatingClr } from '../../utils/utils';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import "./HostelCard.css"


const HostelCard = ({ hostel }) => {
    const { name, area, city } = hostel



    return (
        <Box>
            <Paper elevation={3} className="hostel-card-main-container" >
                <div className='image-fav-container'>
                    <img src='https://res.cloudinary.com/dxww8lp4l/image/upload/v1754118177/hostel1_klhj8j.webp' alt={`${name}-img`} className="hostel-main-img" />
                    <div className='fav-icon-container'>
                        <FavoriteBorderRoundedIcon className='fav-icon' />
                        {/* <FavoriteRoundedIcon className='fav-icon'  color='error'/> */}
                    </div>
                </div>
                <div className='card-text-container'>
                    <div className="name-rating-container">
                        <p className="hostel-name">{name}</p>
                        <div className="rating-icon-container">
                            <div className='rating-container'>
                                <p className='rating-text'>4</p>
                                <StarsIcon color={`${getRatingClr(4)}`} className='rating-icon' />
                            </div>
                        </div>
                    </div>
                    <p className='area-text'>{area}</p>
                    <p className='city-text'>{city}</p>
                </div>
            </Paper>
        </Box>

    )
}

export default HostelCard