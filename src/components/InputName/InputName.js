import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAsyncThunk } from 'redux/contacts.thunk';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const ContactForm = () => {
  const contacts = useSelector(state => state.contacts.contacts.items);
  const dispatch = useDispatch();

  const [currentContactName, setCurrentContactName] = useState('');
  const [currentContactNumber, setCurrentContactNumber] = useState('');

  const onAddContactSubmit = event => {
    event.preventDefault();
    let check = true;
    const newContact = {
      name: currentContactName,
      number: currentContactNumber,
    };

    if (currentContactName && currentContactNumber) {
      contacts.forEach(contact => {
        if (contact.name === currentContactName) {
          alert(`${contact.name} is already in contacts!`);
          check = false;
        }
      });
      if (check === true) {
        console.log(newContact);
        dispatch(addContactAsyncThunk(newContact));
        setCurrentContactName('');
        setCurrentContactNumber('');
      }
    } else {
      alert(`Full all input area!`);
    }
  };

  return (
    <Container
      maxWidth="xxl"
      sx={{
        width: '20%',
        backgroundColor: '#1976d2',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" color="white">
        New Contact
      </Typography>
      <label>
        <Typography color="white">Name</Typography>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={currentContactName}
          onChange={event => setCurrentContactName(event.target.value)}
        />
      </label>
      <label>
        <Typography color="white">Number</Typography>
        <input
          className="inputAddNumber"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={currentContactNumber}
          onChange={event => setCurrentContactNumber(event.target.value)}
        />
      </label>
      <Button
        sx={{
          border: '1px solid white',
          color: 'white',
          width: '80%',
          padding: '0',
        }}
        onClick={onAddContactSubmit}
      >
        Add Contact
      </Button>
    </Container>
  );
};

export default ContactForm;
