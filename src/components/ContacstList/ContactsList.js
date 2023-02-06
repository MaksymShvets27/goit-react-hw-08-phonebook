import ContactsListItem from 'components/ContactsListItem/ContactsListItem';
import { useSelector } from 'react-redux';
import { selectFilteredContact } from 'redux/selectors';
import List from '@mui/material/List';
const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContact);

  return (
    filteredContacts && (
      <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
        {filteredContacts.map(contact => {
          return <ContactsListItem key={contact.id} contact={contact} />;
        })}
      </List>
    )
  );
};

export default ContactList;
