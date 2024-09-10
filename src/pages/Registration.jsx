import { Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from "@mui/material";
import React from "react";
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { languagesApi } from "../dal/api";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactInputMask from "react-input-mask";
import { Controller, useForm } from "react-hook-form";

const Registration = () => {
    const { control, handleSubmit, formState: { errors, isValid }, getValues } = useForm();
    const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
    const [headerAnchorEl, setHeaderAnchorEl] = useState(null);
    const [languages, setLanguages] = useState([]);
    const navigate = useNavigate();
    const currentLanguage = localStorage.getItem("i18nextLng");
    const { t } = useTranslation();

    useEffect(() => {
        async function fetch() {
            const res = await languagesApi.search();
            setLanguages(res.data);
        }

        fetch();
    }, [])

    function handleLanguageMenuClick(event) {
        if (languageAnchorEl !== event.currentTarget) {
            setLanguageAnchorEl(event.currentTarget);
        }
    }

    function handleLanguageMenuClose() {
        setLanguageAnchorEl(null);
    }

    function changeLanguage(language) {
        i18next.changeLanguage(language);
    }

    const onSubmit = async (data) => {
        console.log(data);
    };

    return (
        <Box className="App">
            <CssBaseline />
            <Box>
                <AppBar position="absolute">
                    <Toolbar>
                        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                            TT
                        </Typography>
                        <Box>
                            <IconButton
                                aria-owns={languageAnchorEl ? "language-menu" : undefined}
                                aria-haspopup="true"
                                onClick={handleLanguageMenuClick}
                                onMouseOver={handleLanguageMenuClick}
                                color="inherit"
                            >
                                <LanguageIcon />
                            </IconButton>
                            <Menu
                                id="language-menu"
                                anchorEl={languageAnchorEl}
                                open={Boolean(languageAnchorEl)}
                                onClose={handleLanguageMenuClose}
                                MenuListProps={{ onMouseLeave: handleLanguageMenuClose }}
                            >
                                {languages.map(language => (
                                    <MenuItem
                                        key={language.id}
                                        disabled={currentLanguage === language.code}
                                        onClick={() => changeLanguage(language.code)}
                                    >
                                        {language.name}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <Toolbar />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Typography component="h1" variant="h5">{t('registration.title')}</Typography>
                        <Box sx={{ mt: 1 }}>
                            {/* <Controller
                                control={control}
                                name="username"
                                rules={{
                                    required: t('registration.required_message')
                                }}
                                render={({ field }) => (

                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        id="username"
                                        label={t('registration.username_field')}
                                        margin="normal"
                                        fullWidth
                                        required
                                        error={errors.username}
                                        helperText={errors.username?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="phoneNumber"
                                rules={{
                                    required: t('registration.required_message')
                                }}
                                render={({ field }) => (
                                    <ReactInputMask
                                        mask="+7(999)999-99-99"
                                        maskChar=" "
                                        {...field}
                                    >
                                        {(inputProps) => <TextField
                                            {...inputProps}
                                            variant="outlined"
                                            id="phoneNumber"
                                            label={t('registration.phone_number_field')}
                                            margin="normal"
                                            fullWidth
                                            required
                                            error={errors.phoneNumber}
                                            helperText={errors.phoneNumber?.message}
                                        />}
                                    </ReactInputMask>
                                )}
                            />
                            <ReactInputMask
                                mask="+7(999)999-99-99"
                                maskChar=" "
                            >
                                {() => <TextField
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label={t('registration.phone_number_field')}
                                    margin="normal"
                                    fullWidth
                                    required
                                />}
                            </ReactInputMask>
                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: t('registration.required_message')
                                }}
                                render={({ field }) => (

                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        id="password"
                                        type="password"
                                        label={t('registration.password_field')}
                                        margin="normal"
                                        fullWidth
                                        required
                                        error={errors.password}
                                        helperText={errors.password?.message}
                                    />
                                )}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit(onSubmit)}
                            >
                                {t('registration.button')}
                            </Button> */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    control={control}
                                    name="username"
                                    rules={{
                                        required: t('registration.required_message')
                                    }}
                                    render={({ field }) => (

                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            id="username"
                                            label={t('registration.username_field')}
                                            margin="normal"
                                            fullWidth
                                            error={errors.username}
                                            helperText={errors.username?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="phoneNumber"
                                    rules={{
                                        required: t('registration.required_message')
                                    }}
                                    render={({ field }) => (
                                        <ReactInputMask
                                            mask="+7(999)999-99-99"
                                            maskChar=" "
                                            {...field}
                                        >
                                            {(inputProps) => <TextField
                                                {...inputProps}
                                                variant="outlined"
                                                id="phoneNumber"
                                                label={t('registration.phone_number_field')}
                                                margin="normal"
                                                fullWidth
                                                error={errors.phoneNumber}
                                                helperText={errors.phoneNumber?.message}
                                            />}
                                        </ReactInputMask>
                                    )}
                                />
                                <ReactInputMask
                                    mask="+7(999)999-99-99"
                                    maskChar=" "
                                >
                                    {() => <TextField
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label={t('registration.phone_number_field')}
                                        margin="normal"
                                        fullWidth
                                    />}
                                </ReactInputMask>
                                <Controller
                                    control={control}
                                    name="password"
                                    rules={{
                                        required: t('registration.required_message')
                                    }}
                                    render={({ field }) => (

                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            id="password"
                                            type="password"
                                            label={t('registration.password_field')}
                                            margin="normal"
                                            fullWidth
                                            error={errors.password}
                                            helperText={errors.password?.message}
                                        />
                                    )}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {t('registration.button')}
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default Registration;