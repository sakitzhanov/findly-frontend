import React, { useState } from "react";
import { Box, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
};

const SearchButton = (props) => {
    return <IconButton {...props}>
        <SearchIcon />
    </IconButton>
}

const CitySelect = (props) => {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setSelectedRegion(null);
        setOpen(false);
    }

    const onSelectRegion = (event, region) => {
        setSelectedRegion(region);
    }

    const onSelectCity = (event, city) => {
        setSelectedCity(city);
        handleClose();
    }

    const regions = [
        {
            id: 1,
            name: 'Актюбинская область',
            cities: [
                {
                    id: 1,
                    name: 'Актобе',
                    foundPropertiesQuantity: 50
                },
                {
                    id: 2,
                    name: 'Кандыгаш',
                    foundPropertiesQuantity: 5
                },
                {
                    id: 3,
                    name: 'Алга',
                    foundPropertiesQuantity: 2
                }
            ]
        },
        {
            id: 2,
            name: 'Атырауская область',
            cities: [
                {
                    id: 4,
                    name: 'Атырау',
                    foundPropertiesQuantity: 37
                },
                {
                    id: 5,
                    name: 'Кульсары',
                    foundPropertiesQuantity: 8
                }
            ]
        },
        {
            id: 3,
            name: 'Акмолинская область',
            cities: [
                {
                    id: 6,
                    name: 'Кокшетау',
                    foundPropertiesQuantity: 25
                },
                {
                    id: 7,
                    name: 'Щучинск',
                    foundPropertiesQuantity: 0
                },
                {
                    id: 8,
                    name: 'Бестобе'
                },
                {
                    id: 9,
                    name: 'Ерейментау',
                    foundPropertiesQuantity: 2
                },
                {
                    id: 10,
                    name: 'Кенесары',
                    foundPropertiesQuantity: 23
                }

            ]
        }
    ]

    return (
        <>
            <TextField
                label="Город"
                value={selectedCity?.name}
                InputProps={{
                    endAdornment: <SearchButton onClick={handleOpen} />
                }}
                InputLabelProps={{
                    shrink: selectedCity
                }}
                disabled
                fullWidth
                {...props}
            />
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography variant="h6">Выберите город</Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <List>
                                {regions.map((region, index) => (
                                    <>
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                selected={region.id === selectedRegion?.id}
                                                onClick={(e) => onSelectRegion(e, region)}
                                            >
                                                <ListItemText primary={region.name} />
                                                <ListItemIcon>
                                                    <ArrowForwardIosIcon />
                                                </ListItemIcon>
                                            </ListItemButton>
                                        </ListItem>
                                        {index < regions.length - 1 && <Divider />}
                                    </>
                                ))}
                            </List>
                        </Grid>
                        {selectedRegion && (
                            <Grid item xs={6}>
                                <List
                                    sx={{
                                        maxHeight: 48 * regions.length + (0.8 * (regions.length - 1)),
                                        overflow: 'auto'
                                    }}
                                >
                                    {selectedRegion.cities.map((city, index) => (
                                        <>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={(e) => onSelectCity(e, city)}>
                                                    <ListItemText primary={city.name} />
                                                </ListItemButton>
                                            </ListItem>
                                            {index < selectedRegion.cities.length - 1 && <Divider />}
                                        </>
                                    ))}
                                </List>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Modal>
        </>
    )
}

export default CitySelect;