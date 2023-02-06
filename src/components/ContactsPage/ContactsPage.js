import { Container } from '@mui/system';
import ContactList from 'components/ContacstList/ContactsList';
import Filter from 'components/FilterContacts/FilterContacts';
import ContactForm from 'components/InputName/InputName';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { contactsAsyncThunk } from 'redux/contacts.thunk';
import { useEffect } from 'react';

export const ContactsPage = () => {
  const isLoading = useSelector(state => state.contacts.contacts.isLoading);
  const error = useSelector(state => state.contacts.contacts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsAsyncThunk());
  }, [dispatch]);
  return (
    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
      <ContactForm />
      <Container
        maxWidth="xxl"
        sx={{
          backgroundColor: '#1976d2',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '50%',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" color="white">
          Contacts
        </Typography>
        <Filter />
        <ContactList />
        {isLoading && !error && (
          <Typography color="white">Request in progress...</Typography>
        )}
      </Container>
    </Box>
  );
};
