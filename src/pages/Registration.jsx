import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import React from "react";
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { instance, languagesApi } from "../dal/api";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import ReactInputMask from "react-input-mask";
import { Controller, useForm } from "react-hook-form";

const Registration = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
    const [languages, setLanguages] = useState([]);
    const currentLanguage = localStorage.getItem("i18nextLng");
    const { t } = useTranslation();
    const [loader, setLoader] = useState(false);

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
        setLoader(true);

        try {
            const res = await instance.post("/api/registration", data);

            console.log(res);

        } catch (e) {
            console.log(e);
            setLoader(false);
        }
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
                            <Controller
                                control={control}
                                name="username"
                                rules={{
                                    required: t('registration.required_message')
                                }}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        id="username"
                                        label={t('registration.username_field')}
                                        margin="normal"
                                        fullWidth
                                        required
                                        error={!!errors.username}
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
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <ReactInputMask
                                        mask="+7(999)999-99-99"
                                        maskChar=" "
                                        value={value}
                                        onChange={onChange}
                                    >
                                        {(inputProps) => (
                                            <TextField
                                                {...inputProps}
                                                variant="outlined"
                                                id="phoneNumber"
                                                label={t('registration.phone_number_field')}
                                                margin="normal"
                                                fullWidth
                                                required
                                                error={!!errors.phoneNumber}
                                                helperText={errors.phoneNumber?.message}
                                            />
                                        )}
                                    </ReactInputMask>
                                )}
                            />
                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: t('registration.required_message')
                                }}
                                defaultValue=""
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
                                        error={!!errors.password}
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
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default Registration;