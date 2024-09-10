import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';

const LostPropertySearchOld = () => {
    const [region, setRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [category, setCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [cityChoice, setCityChoice] = useState(false);
    const [subcategoryChoice, setSubcategoryChoice] = useState(false);
    const openCityChoice = () => setCityChoice(true);
    const closeCityChoice = () => setCityChoice(false);
    const openSubcategoryChoice = () => setSubcategoryChoice(true);
    const closeSubcategoryChoice = () => setSubcategoryChoice(false);
  
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
  
    const [mainCities, setMainCities] = useState(
      regions.flatMap(region => region.cities)
        .sort((item1, item2) => item2.foundPropertiesQuantity - item1.foundPropertiesQuantity)
        .slice(0, 3)
    );
  
    const [mainSubcategories, setMainSubcategories] = useState(
      categories.flatMap(category => category.subcategories)
        .sort((item1, item2) => item2.foundPropertiesQuantity - item1.foundPropertiesQuantity)
        .slice(0, 3));

    return (
        <Box>
            <AppBar position="absolute">
                <Toolbar>
                    <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                        LoFo
                    </Typography>
                    <IconButton color="inherit">
                        <PersonIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box>
                <Toolbar />
                <Container>
                    <Typography variant="h1" gutterBottom>Поиск</Typography>
                    <Box>
                        <Typography>Где искать</Typography>
                        {selectedCity && !mainCities.some(city => city.id === selectedCity.id) && <Button variant="contained">{selectedCity.name}</Button>}
                        {mainCities.map(city =>
                            <Button variant={selectedCity?.id === city.id ? "contained" : "text"} onClick={() => {
                                setSelectedCity(city);
                                closeCityChoice();
                            }}>{city.name}</Button>
                        )}
                        {!cityChoice && <Button onClick={openCityChoice} style={{ textTransform: 'lowercase' }} endIcon={<KeyboardArrowDownIcon />}>еще</Button>}
                        {cityChoice && <Button onClick={closeCityChoice} style={{ textTransform: 'lowercase' }} endIcon={<KeyboardArrowUpIcon />}>еще</Button>}
                        {cityChoice &&
                            <Box>
                                {!region
                                    ? (
                                        <Grid container>
                                            <Grid item xs={12}>
                                                {regions.map(region =>
                                                    <Grid item><Button onClick={() => setRegion(region)}>{region.name}</Button></Grid>
                                                )}
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Box>
                                            <Grid container>
                                                <Grid item xs={4} md="auto">
                                                    <Button
                                                        onClick={() => setRegion(null)}
                                                    >
                                                        Все регионы
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} md="auto">
                                                    <KeyboardArrowRightIcon />
                                                </Grid>
                                                <Grid item xs={4} md="auto">
                                                    <Button>{region.name}</Button>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    {region.cities.map(city =>
                                                        <Grid item>
                                                            <Button
                                                                variant={selectedCity?.id === city.id ? "contained" : "text"}
                                                                onClick={() => {
                                                                    setSelectedCity(city);
                                                                    closeCityChoice();
                                                                }}
                                                            >
                                                                {city.name}
                                                            </Button>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )}
                            </Box>
                        }
                    </Box>
                    <Box>
                        <Typography>Категория</Typography>
                        {selectedSubcategory && !mainSubcategories.some(subcategory => subcategory.id === selectedSubcategory.id) && <Button variant="contained">{selectedSubcategory.name}</Button>}
                        {mainSubcategories.map(subcategory =>
                            <Button variant={selectedSubcategory?.id === subcategory.id ? "contained" : "text"} onClick={() => {
                                setSelectedSubcategory(subcategory);
                                closeSubcategoryChoice();
                            }}>{subcategory.name}</Button>
                        )}
                        {!subcategoryChoice && <Button onClick={openSubcategoryChoice} style={{ textTransform: 'lowercase' }} endIcon={<KeyboardArrowDownIcon />}>еще</Button>}
                        {subcategoryChoice && <Button onClick={closeSubcategoryChoice} style={{ textTransform: 'lowercase' }} endIcon={<KeyboardArrowUpIcon />}>еще</Button>}
                        {subcategoryChoice &&
                            <Box>
                                {!category
                                    ? (
                                        <Grid container>
                                            <Grid item xs={12}>
                                                {categories.map(category =>
                                                    <Grid item><Button onClick={() => setCategory(category)}>{category.name}</Button></Grid>
                                                )}
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Box>
                                            <Grid container>
                                                <Grid item xs={4} md="auto">
                                                    <Button
                                                        onClick={() => setCategory(null)}
                                                    >
                                                        Все категории
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} md="auto">
                                                    <KeyboardArrowRightIcon />
                                                </Grid>
                                                <Grid item xs={4} md="auto">
                                                    <Button>{category.name}</Button>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    {category.subcategories.map(subcategory =>
                                                        <Grid item>
                                                            <Button
                                                                variant={selectedSubcategory?.id === subcategory.id ? "contained" : "text"}
                                                                onClick={() => {
                                                                    setSelectedSubcategory(subcategory);
                                                                    closeSubcategoryChoice();
                                                                }}
                                                            >
                                                                {subcategory.name}
                                                            </Button>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    )}
                            </Box>
                        }
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default LostPropertySearchOld;