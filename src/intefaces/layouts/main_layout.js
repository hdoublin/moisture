import { useContext, useEffect } from 'react';
import {
  createTheme,
  ThemeProvider
} from '@mui/material/styles';
import {
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MainHeader } from '../components';
import { AuthContext, CategoryContext, SearchContext, UserContext } from '../../context';

const theme = createTheme();

export default function MainLayout({ children }) {

  const navigate = useNavigate();
  const { logout, getToken, user, token } = useContext(AuthContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const { searchText } = useContext(SearchContext);
  const { getMyFollowings } = useContext(UserContext);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (token) {
      getMyFollowings();
    }
  }, [token]);

  const onSearch = (text) => {
    navigate('/search/' + text);
  }

  return (
    <ThemeProvider theme={theme}>
      { <MainHeader
        categories={categories}
        logout={logout}
        getToken={getToken}
        user={user}
        searchText={searchText}
        onSearch={onSearch}
      /> }
      <Box sx={{ marginTop: '70px' }}>
      {children}
      </Box>
    </ThemeProvider>
  );
}