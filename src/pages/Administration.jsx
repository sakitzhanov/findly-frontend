import { Grid, List, ListItem, ListItemButton, ListItemText, Typography, Button } from "@mui/material";
import React from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Administration = () => {    
    const { t } = useTranslation();

    return (
        <Layout>
            <Typography variant="h2" gutterBottom>
                {t('administration.title')}
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <List>
                        <ListItem>
                            <ListItemButton component={NavLink} to="/regions">
                                <ListItemText primary={t('administration.regions')} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton component={NavLink} to="/cities">
                                <ListItemText primary={t('administration.cities')} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton component={NavLink} to="/categories">
                                <ListItemText primary={t('administration.categories')} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton component={NavLink} to="/subcategories">
                                <ListItemText primary={t('administration.subcategories')} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Administration;