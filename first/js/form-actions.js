import {updateTheWorld} from './app.js';

export const contactUpdated = (state) => (contact) => {
  var newState = Object.assign({}, state, {newContact: contact})
  updateTheWorld(newState)
}

export const submitNewContact = (state) => (event) => {
  event.preventDefault()

    var errors = {
      name: !state.newContact.name ? true : null,
      email: !state.newContact.email ? true : null
    }

  if(!Object.values(errors).find(v => v )) {
    var contact = Object.assign({}, state.newContact, { key: new Date().getTime()})
      var contacts = state.contacts.slice().concat(contact)
      var newState = Object.assign({}, state, {contacts: contacts, newContact: {name: "", email: "", description: "", errors: {}}})
      updateTheWorld(newState)
  } else {
    var contactWithError = Object.assign({}, state.newContact, {errors: errors})
      var newState = Object.assign({}, state, {newContact: contactWithError})
      updateTheWorld(newState)
  }
}


