import { useEffect, useState, useRef } from 'react';
import {
    Box, Grid, Typography, Paper, FormControl,
    InputLabel, MenuItem, Select, CircularProgress,
    FormHelperText, Button, Snackbar, Alert, Skeleton
} from '@mui/material';

import {
    fetchCities,
    fetchAreas,
    fetchHostels
} from '../../services/HostelsListService';
import HostelCard from '../HosteCard/HostelCard';
import HostelCardSkeleton from '../HostelCardSkeleton/HostelCardSkeleton';

import './HostelsList.css';

const HostelsList = () => {
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [hostels, setHostels] = useState([]);

    const [loadingCities, setLoadingCities] = useState(true);
    const [loadingAreas, setLoadingAreas] = useState(false);
    const [loadingHostels, setLoadingHostels] = useState(false);
    const [errors, setErrors] = useState({ city: false, area: false });
    const [hostelError, setHostelError] = useState('');
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);

    const secondBoxRef = useRef(null);

    console.log("hostels", hostels)

    useEffect(() => {
        const loadCities = async () => {
            try {
                const data = await fetchCities();
                setCities(data);
            } catch {
                setHostelError('Failed to load cities.');
                setOpenErrorToast(true);
            } finally {
                setLoadingCities(false);
            }
        };
        loadCities();
    }, []);

    const handleCityChange = async (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        setSelectedArea('');
        setAreas([]);
        setErrors({ city: false, area: false });

        if (!city) return;

        setLoadingAreas(true);
        try {
            const data = await fetchAreas(city);
            setAreas(data);
        } catch {
            setHostelError('Failed to load areas');
            setOpenErrorToast(true);
        } finally {
            setLoadingAreas(false);
        }
    };

    const handleSubmit = async () => {
        const hasCity = !!selectedCity;
        const hasArea = !!selectedArea;
        setErrors({ city: !hasCity, area: !hasArea });

        if (!hasCity || !hasArea) return;

        setSubmitClicked(true);
        setLoadingHostels(true);

        setTimeout(() => {
            secondBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        try {
            const data = await fetchHostels(selectedCity, selectedArea);
            setHostels(data);

            if (data.length === 0) {
                setHostelError('No hostels found for this area.');
                setOpenErrorToast(true);
            }
        } catch {
            setHostelError('Failed to fetch hostels.');
            setOpenErrorToast(true);
            setHostels([]);
        } finally {
            setLoadingHostels(false);
        }
    };

    return (
        <div className="list-main-container">
            <Box className="first-box">
                <div className="select-city-container">
                    <Paper
                        elevation={10}
                        className="paper-card"
                        sx={{
                            height: { xs: 'auto', sm: 350 },
                            padding: { xs: 3, sm: 5 },
                            marginTop: { xs: 4, sm: 8 },
                            borderRadius: 2,
                            background: 'linear-gradient(to right, #20202efa 0%, #050522d9 0%, #5a5dbb 100%)',
                            color: 'black',
                        }}
                    >
                        <Typography variant="h6" className="hero-heading">
                            Find Hostels That Fit Your Life — Fast & Easy
                        </Typography>

                        <form className="form-container">
                            {/* City Dropdown */}
                            <FormControl
                                fullWidth
                                error={errors.city}
                                sx={{
                                    width: { xs: '100%', sm: 250 },
                                    '& .MuiInputLabel-root': { color: '#fff' },
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: '#fff' },
                                        '&:hover fieldset': { borderColor: '#fff' },
                                        '&.Mui-focused fieldset': { borderColor: '#fff' },
                                        '& svg': { color: '#fff' },
                                    },
                                }}
                            >
                                <InputLabel>Select City</InputLabel>
                                <Select
                                    value={selectedCity}
                                    label="Select City"
                                    onChange={handleCityChange}
                                    endAdornment={
                                        loadingCities && (
                                            <Box className="loader-box-container">
                                                <CircularProgress size={22} thickness={5} className="loader-color" />
                                            </Box>
                                        )
                                    }
                                >
                                    {cities.map((city) => (
                                        <MenuItem key={city} value={city}>
                                            {city}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.city && <FormHelperText>City is required</FormHelperText>}
                            </FormControl>

                            {/* Area Dropdown */}
                            <FormControl
                                fullWidth
                                error={errors.area}
                                sx={{
                                    width: { xs: '100%', sm: 250 },
                                    '& .MuiInputLabel-root': {
                                        color: errors.area ? '#f44336' : '#fff',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': {
                                            borderColor: errors.area ? '#f44336' : '#fff',
                                        },
                                        '&:hover fieldset': { borderColor: '#fff' },
                                        '&.Mui-focused fieldset': { borderColor: '#fff' },
                                    },
                                    '& .MuiSelect-icon': { color: '#fff' },
                                    '& .MuiSelect-select': { color: '#fff' },
                                }}
                            >
                                <InputLabel>Select Area</InputLabel>
                                <Select
                                    value={selectedArea}
                                    label="Select Area"
                                    onChange={(e) => setSelectedArea(e.target.value)}
                                    onMouseDown={(e) => {
                                        if (!selectedCity) {
                                            e.preventDefault();
                                            setErrors((prev) => ({ ...prev, city: true }));
                                        }
                                    }}
                                    endAdornment={
                                        loadingAreas && (
                                            <Box className="loader-box-container">
                                                <CircularProgress size={22} thickness={5} className="loader-color" />
                                            </Box>
                                        )
                                    }
                                >
                                    {areas.map((area) => (
                                        <MenuItem key={area} value={area}>
                                            {area}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.area && <FormHelperText>Area is required</FormHelperText>}
                            </FormControl>

                            <div className="btn-container">
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    sx={{
                                        outline: 'none',
                                        boxShadow: 'none',
                                        '&:focus': {
                                            outline: 'none',
                                            boxShadow: 'none',
                                        },
                                    }}
                                >
                                    Find Hostels
                                </Button>
                            </div>
                        </form>
                    </Paper>
                </div>

                <div className="select-hostel-container">
                    {/* Optional: Add illustrations or promotional content */}
                </div>
            </Box>
            {submitClicked && (
                <Box ref={secondBoxRef} className="second-box" sx={{ px: 2, py: 4 }}>
                    <Typography variant="h5" className='hero-heading-2'>
                        Hostels in Your Area
                    </Typography>

                    {loadingHostels ? (
                        <HostelCardSkeleton />
                    ) : hostels.length === 0 ? (
                        <Typography sx={{ mb: 2, textAlign: 'center' }}>No hostels found</Typography>
                    ) : (

                        <ul className='hostels-list-conatiner'>
                            {
                                hostels.map((hostel) => <HostelCard hostel={hostel} key={hostel.id} />)
                            }
                        </ul>

                    )}
                </Box>
            )}


            <Snackbar
                open={openErrorToast}
                autoHideDuration={5000}
                onClose={() => setOpenErrorToast(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenErrorToast(false)} severity="error" sx={{ width: '100%' }}>
                    {hostelError}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default HostelsList;
