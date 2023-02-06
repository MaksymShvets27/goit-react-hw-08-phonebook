import PropsTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContactAsyncThunk } from 'redux/contacts.thunk';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactsListItem = ({ contact }) => {
  const dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(deleteContactAsyncThunk(id));
  };

  return (
    <ListItem
      sx={{ padding: '0' }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          sx={{ color: '#1976d2' }}
          onClick={() => {
            onDeleteContact(contact.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        sx={{ color: '#1976d2', width: '90%' }}
        primary={`${contact.name} : ${contact.number}`}
      />
    </ListItem>
  );
};

ContactsListItem.propsTypes = {
  contact: PropsTypes.shape({
    id: PropsTypes.number.isRequired,
    name: PropsTypes.string.isRequired,
    number: PropsTypes.string.isRequired,
  }).isRequired,
};
export default ContactsListItem;
