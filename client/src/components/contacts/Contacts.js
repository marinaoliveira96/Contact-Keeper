import React, { useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <div>
      {filtered !== null
        ? filtered.map((contact) => (
            //se tiver algo no filtro mostra o que tiver
            <ContactItem key={contact.id} contact={contact} />
          ))
        : //se n tiver nada no filtro mostra tudo
          contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
    </div>
  );
};

export default Contacts;
