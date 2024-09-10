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

const CategorySelect = (props) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setSelectedCategory(null);
        setOpen(false);
    }

    const onSelectCategory = (event, category) => {
        setSelectedCategory(category);
    }

    const onSelectSubcategory = (event, subcategory) => {
        setSelectedSubcategory(subcategory);
        handleClose();
    }

    const categories = [
        {
            id: 1,
            name: 'Электроника',
            subcategories: [
                {
                    id: 1,
                    name: 'Мобильные телефоны / смартфоны',
                    foundPropertiesQuantity: 50
                },
                {
                    id: 2,
                    name: 'Наушники',
                    foundPropertiesQuantity: 5
                },
                {
                    id: 3,
                    name: 'Ноутбуки',
                    foundPropertiesQuantity: 1
                }
            ]
        },
        {
            id: 2,
            name: 'Аксессуары',
            subcategories: [
                {
                    id: 4,
                    name: 'Очки',
                    foundPropertiesQuantity: 3
                },
                {
                    id: 5,
                    name: 'Часы',
                    foundPropertiesQuantity: 7
                },
                {
                    id: 6,
                    name: 'Бижутерия',
                    foundPropertiesQuantity: 38
                },
                {
                    id: 7,
                    name: 'Кошельки',
                    foundPropertiesQuantity: 20
                },
                {
                    id: 8,
                    name: 'Рюкзаки',
                    foundPropertiesQuantity: 6
                }
            ]
        },
        {
            id: 3,
            name: 'Документы и карты',
            subcategories: [
                {
                    id: 9,
                    name: 'Удостоверения личности',
                    foundPropertiesQuantity: 13
                },
                {
                    id: 10,
                    name: 'Банковская карта',
                    foundPropertiesQuantity: 44
                }
            ]
        }
    ]

    return (
        <>
            <TextField
                label="Категория"
                value={selectedSubcategory?.name}
                InputProps={{
                    endAdornment: <SearchButton onClick={handleOpen} />
                }}
                InputLabelProps={{
                    shrink: selectedSubcategory
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
                    <Typography variant="h6">Выберите категорию</Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <List>
                                {categories.map((category, index) => (
                                    <>
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                selected={category.id === selectedCategory?.id}
                                                onClick={(e) => onSelectCategory(e, category)}
                                            >
                                                <ListItemText primary={category.name} />
                                                <ListItemIcon>
                                                    <ArrowForwardIosIcon />
                                                </ListItemIcon>
                                            </ListItemButton>
                                        </ListItem>
                                        {index < categories.length - 1 && <Divider />}
                                    </>
                                ))}
                            </List>
                        </Grid>
                        {selectedCategory && (
                            <Grid item xs={6}>
                                <List
                                    sx={{
                                        maxHeight: 48 * categories.length + (0.8 * (categories.length - 1)),
                                        overflow: 'auto'
                                    }}
                                >
                                    {selectedCategory.subcategories.map((subcategory, index) => (
                                        <>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={(e) => onSelectSubcategory(e, subcategory)}>
                                                    <ListItemText primary={subcategory.name} />
                                                </ListItemButton>
                                            </ListItem>
                                            {index < selectedCategory.subcategories.length - 1 && <Divider />}
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

export default CategorySelect;