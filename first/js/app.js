import React from 'react';
import ReactDOM from 'react-dom';
import {ContactItem, ContactForm, ContactView} from './contact-view';
import {contactUpdated, submitNewContact, foo} from './form-actions';

////////// State foo //////////////

export function updateTheWorld(state) {
  var rootElement = React.createElement(ContactView, Object.assign({}, state, {
    onContactChange: contactUpdated(state),
    onFormSubmit: submitNewContact(state)
  }))

  ReactDOM.render(rootElement, document.getElementById('React.app'))
}

// Set initial state //
updateTheWorld(
  {
    contacts: [
    {key: 1, name: "Bob Sponge", email: "bob@example.com", description: "Ninja"},
    {key: 3, name: "Marco Polo", email: "mc@example.com", description: "Animal"},
    {key: 2, name: "Patrik Star", description: "Sea Star!"}
    ],
    newContact: {name: "", email: "", description: "", errors: {}}
  }
)
