import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import LanguageIcon from '@mui/icons-material/Language';
import { languagesApi } from "../dal/api";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = (props) => {
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

    function handleHeaderMenuClick(event) {
        if (headerAnchorEl !== event.currentTarget) {
            setHeaderAnchorEl(event.currentTarget);
        }
    }

    function handleHeaderMenuClose() {
        setHeaderAnchorEl(null);
    }

    function changeLanguage(language) {
        i18next.changeLanguage(language);
    }

    return (
        <Box>
            <AppBar position="absolute">
                <Toolbar>
                    <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                        TT
                    </Typography>
                    <Box>
                        <IconButton
                            aria-owns={headerAnchorEl ? "simple-menu" : undefined}
                            aria-haspopup="true"
                            onClick={handleHeaderMenuClick}
                            onMouseOver={handleHeaderMenuClick}
                            color="inherit"
                        >
                            <PersonIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={headerAnchorEl}
                            open={Boolean(headerAnchorEl)}
                            onClose={handleHeaderMenuClose}
                            MenuListProps={{ onMouseLeave: handleHeaderMenuClose }}
                        >
                            <MenuItem>{t('header_menu.profile')}</MenuItem>
                            <MenuItem onClick={() => navigate("/administration")}>{t('header_menu.administration')}</MenuItem>
                            <MenuItem>{t('header_menu.exit')}</MenuItem>
                        </Menu>
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
    )
}

export default Header;