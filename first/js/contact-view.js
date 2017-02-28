var ContactItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string
  },

  render: function() {
    return (
      React.createElement('li', {className: 'ContactItem'},
        React.createElement('h2', {className: 'ContactItem-name'}, this.props.name),
        React.createElement('a', {href: 'mailto:'+this.props.email, className: 'ContactItem-email'}, this.props.email),
        React.createElement('h3', {className: 'ContactItem-description'}, this.props.description)
      )
    )
  }
})

var ContactForm = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },

  componentDidUpdate: function(prevProps) {
    var errors = this.props.contact.errors;

    if(this.isMounted && errors && errors != prevProps.contact.errors) {
      if(errors.name) {
        this.nameInput.focus();
      } else if(this.props.contact.errors.email) {
        this.emailInput.focus();
      }
    }
  },

  onNameInputChange: function(event) {
    this.props.onChange(Object.assign({}, this.props.contact, {name: event.target.value}))
  },
  onEmailInputChange: function(event) {
    this.props.onChange(Object.assign({}, this.props.contact, {email: event.target.value}))
  },
  onDescriptionInputChange: function(event) {
    this.props.onChange(Object.assign({}, this.props.contact, {description: event.target.value}))
  },

  render: function() {
    var errors = this.props.contact.errors;

    return (
      React.createElement('form', {className: "ContactForm", onSubmit: this.props.onSubmit},
        React.createElement('input', {
          placeholder: 'Name (Required)',
          type: 'text',
          value: this.props.contact.name,
          className: errors.name && 'ContactForm-error',
          autoFocus: true,
          ref: (name) => this.nameInput = name,
          onChange: this.onNameInputChange
        }),
        React.createElement('input', {
          placeholder: 'Email',
          type: 'email',
          ref: (input) => {this.emailInput = input},
          value: this.props.contact.email,
          className: errors.email && 'ContactForm-error',
          onChange: this.onEmailInputChange
        }),
        React.createElement('textarea', {
          placeholder: 'Description',
          value: this.props.contact.description,
          onChange: this.onDescriptionInputChange
        }),
        React.createElement('button', {type: "submit"}, 'Add contact')
      )
    )
  }
})

var ContactView = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired,
    onContactChange: React.PropTypes.func.isRequired,
    onFormSubmit: React.PropTypes.func.isRequired 
  },

  render: function() {
    var contactList = this.props.contacts.filter(contact => contact.email)
      .map(contact => React.createElement(ContactItem, contact))

    return (
      React.createElement('div', {className: "ContactView"},
        React.createElement('h1', {className: "ContactView-title"}, "Contacts"),
        React.createElement('ul', {className: "ContactView-list"}, contactList),
        React.createElement(ContactForm, {
          contact: this.props.newContact,
          onChange: this.props.onContactChange,
          onSubmit: this.props.onFormSubmit
        })
      )
    )
  }
})
