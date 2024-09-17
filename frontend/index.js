import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const contactForm = document.getElementById('contactForm');
  const contactList = document.getElementById('contactList');
  const submitBtn = document.getElementById('submitBtn');

  // Load all contacts on page load
  await loadContacts();

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('contactId').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (id) {
      // Update existing contact
      await backend.updateContact(BigInt(id), name, phone, email);
    } else {
      // Add new contact
      await backend.addContact(name, phone, email);
    }

    contactForm.reset();
    document.getElementById('contactId').value = '';
    submitBtn.textContent = 'Add Contact';
    await loadContacts();
  });

  async function loadContacts() {
    const contacts = await backend.getAllContacts();
    contactList.innerHTML = '';
    if (contacts.length === 0) {
      contactList.innerHTML = '<p>No contacts found.</p>';
    } else {
      contacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        contactItem.innerHTML = `
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Phone:</strong> ${contact.phone}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <button onclick="editContact(${contact.id})">Edit</button>
          <button onclick="deleteContact(${contact.id})">Delete</button>
        `;
        contactList.appendChild(contactItem);
      });
    }
  }

  window.editContact = async (id) => {
    const contact = await backend.getContact(BigInt(id));
    if (contact) {
      document.getElementById('contactId').value = id;
      document.getElementById('name').value = contact.name;
      document.getElementById('phone').value = contact.phone;
      document.getElementById('email').value = contact.email;
      submitBtn.textContent = 'Update Contact';
    }
  };

  window.deleteContact = async (id) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      await backend.deleteContact(BigInt(id));
      await loadContacts();
    }
  };
});
