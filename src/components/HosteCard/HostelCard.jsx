import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useState } from 'react';
import StarsIcon from '@mui/icons-material/Stars';
import { getRatingClr } from '../../utils/utils';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import "./HostelCard.css"


const HostelCard = ({ hostel }) => {

    const { name, area, city, id,rating,roomTypes,type,hasDayStay } = hostel



    return (
        <Link to={`hostel/${id}`} className='nav-link-hostel'>
            <Paper elevation={3} className="hostel-card-main-container" >
                <div className='image-fav-container'>
                    <img src='https://res.cloudinary.com/dxww8lp4l/image/upload/v1754204061/hostel5_cnamuw.jpg' alt={`${name}-img`} className="hostel-main-img" />
                    <div className='fav-icon-container'>
                        <div className={`day-stay-container ${!hasDayStay && 'day-stay-invisible'}`}><p className='day-stay-text'>Day Stay Available</p></div>
                        
                        <FavoriteBorderRoundedIcon className='fav-icon' />
                        {/* <FavoriteRoundedIcon className='fav-icon'  color='error'/> */}
                    </div>
                </div>
                <div className='card-text-container'>
                    <div className="name-rating-container">
                        <p className="hostel-name">{name}</p>
                        <div className="rating-icon-container">
                            <div className='rating-container'>
                                <p className='rating-text'>{rating}</p>
                                <StarsIcon color={`${getRatingClr(rating)}`} className='rating-icon' />
                            </div>
                        </div>
                    </div>
                    <p className='area-text'>{area}</p>
                    <p className='city-text'>{city}</p>

                    <div className='types-container'>
                        {
                            roomTypes.map((type,i)=><span key={i} className='room-type-text'>{type}</span>)
                        }
                        <span className='room-type-text'>{type}</span>
                    </div>
                </div>
            </Paper>
        </Link>

    )
}

export default HostelCard