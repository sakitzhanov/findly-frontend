import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import LostPropertySearch from './pages/LostProperty/LostPropertySearch';
import LostPropertyCreate from './pages/LostProperty/LostPropertyCreate';
import Home from './pages/Home';
import RegionCreate from './pages/Region/RegionCreate';
import RegionList from './pages/Region/RegionList';
import Administration from './pages/Administration';
import RegionDetails from './pages/Region/RegionDetails';
import CityCreate from './pages/City/CityCreate';
import CityList from './pages/City/CityList';
import CityDetails from './pages/City/CityDetails';
import Login from './pages/Login';
import Registration from './pages/Registration';
import CategoryList from './pages/Category/CategoryList';
import CategoryCreate from './pages/Category/CategoryCreate';
import CategoryDetails from './pages/Category/CategoryDetails';
import SubcategoryList from './pages/Subcategory/SubcategoryList';
import SubcategoryCreate from './pages/Subcategory/SubcategoryCreate';
import SubcategoryDetails from './pages/Subcategory/SubcategoryDetails';

const theme = createTheme({});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='registration' element={<Registration />} />
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<LostPropertySearch />} />
          <Route path='/create' element={<LostPropertyCreate />} />
          <Route path="/regions">
            <Route index element={<RegionList />} />
            <Route path="create" element={<RegionCreate />} />
            <Route path=":id" element={<RegionDetails />} />
          </Route>
          <Route path="/cities">
            <Route index element={<CityList />} />
            <Route path="create" element={<CityCreate/>} />
            <Route path=":id" element={<CityDetails />} />
          </Route>
          <Route path="/categories">
            <Route index element={<CategoryList />} />
            <Route path="create" element={<CategoryCreate />} />
            <Route path=":id" element={<CategoryDetails />} />
          </Route>
          <Route path="/subcategories">
            <Route index element={<SubcategoryList />} />
            <Route path="create" element={<SubcategoryCreate />} />
            <Route path=":id" element={<SubcategoryDetails />} />
          </Route>
          <Route path='/administration' element={<Administration />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;