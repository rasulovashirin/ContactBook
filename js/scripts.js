var $_ = function (selector, node = document) {
  return node.querySelector(selector);
};

// var elIdish = $_('.idish');
// var elButton = $_('button', elIdish);

var $$_ = function (selector, node = document) {
  return node.querySelectorAll(selector);
};

var createElement = function (element, elementClass, text) {
  var newElement = document.createElement(element);

  if (elementClass) {
    newElement.setAttribute('class', elementClass);
  }

  if (text) {
    newElement.textContent = text;
  }

  return newElement;
};






var contacts =[];
var options =[];

var elContactForm = document.querySelector('.js-contact-form');
var elContactList = document.querySelector('.js-contacts');

if(elContactForm){
  var elNameInput = elContactForm.querySelector('.js-contact-form__name-input');
  var elRelationshipInput = elContactForm.querySelector('.js-contact-form__relationship-input');
  var elRelationshipList = elContactForm.querySelector('#relationships-list');
  var elPhoneInput = elContactForm.querySelector('.js-contact-form__phone-input');
}



elContactForm.addEventListener('submit', function(evt){
  evt.preventDefault();

  elPhoneInput.classList.remove('is-invalid');

  var name = elNameInput.value;
  var who = elRelationshipInput.value;
  var phone = elPhoneInput.value;


  // Contacts

  var isIncludes = false;
  for (var contact = 0; contact< contacts.length; contact++){
    if(contacts[contact].phone === elPhoneInput.value){
      elPhoneInput.classList.add('is-invalid');
      isIncludes = true;
      return;
    }
  }

  contacts.push({
    name: name,
    relations: who,
    phone: phone
  });

  elContactList.innerHTML = '';
  var fragment = document.createDocumentFragment();
  contacts.forEach(function(contact, index) {
    var newContact = document.createElement('li');
    newContact.setAttribute('class', 'list-group-item position-relative mb-2');
    fragment.appendChild(newContact);

    var newName = document.createElement('h3');
    newName.textContent = contact.name;
    newName.setAttribute('class', 'h5 text-truncate text-capitalize');
    newContact.appendChild(newName);

    var newRelations = document.createElement('p');
    newRelations.textContent = contact.relations;
    newRelations.setAttribute('class', 'small mb-1 text-capitalize');
    newContact.appendChild(newRelations);

    var newPhone = document.createElement('a');
    newPhone.textContent = contact.phone;
    newPhone.setAttribute('href', `tel:${contact.phone}`)
    newContact.appendChild(newPhone);

    var newButton = document.createElement('button');
    newButton.setAttribute('class', 'delete-button btn');
    newButton.dataset.id = index;
    newContact.appendChild(newButton);

  });
  elContactList.appendChild(fragment);
  // Options
  options.push(who);

  options.forEach(function(option){
    var newOption = document.createElement('option');
    newOption.textContent = option;
    elRelationshipList.appendChild(newOption);
  });


  elNameInput.value = '';
  elRelationshipInput.value = '';
  elPhoneInput.value = '';
  elNameInput.focus();

});

elContactList.addEventListener('click', function (evt){
  if(evt.target.matches('button')){
    elContactList.innerHTML = "";
    contacts.splice(evt.target.dataset.id, 1);

    var fragment = document.createDocumentFragment();
    contacts.forEach(function(contact, index) {
      var newContact = document.createElement('li');
      newContact.setAttribute('class', 'list-group-item position-relative mb-2');
      elContactList.appendChild(newContact);

      var newName = document.createElement('h3');
      newName.textContent = contact.name;
      newName.setAttribute('class', 'h5 text-truncate text-capitalize');
      newContact.appendChild(newName);

      var newRelations = document.createElement('p');
      newRelations.textContent = contact.relations;
      newRelations.setAttribute('class', 'small mb-1 text-capitalize');
      newContact.appendChild(newRelations);

      var newPhone = document.createElement('a');
      newPhone.textContent = contact.phone;
      newPhone.setAttribute('href', `tel:${contact.phone}`)
      newContact.appendChild(newPhone);

      var newButton = document.createElement('button');
      newButton.setAttribute('class', 'delete-button btn');
      newButton.dataset.id = index;
      newContact.appendChild(newButton);

    });
    elContactList.appendChild(fragment);
  };
});

// lini fragmentga solish