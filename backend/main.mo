import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor ContactManager {
  // Define the Contact type
  public type Contact = {
    id: Nat;
    name: Text;
    phone: Text;
    email: Text;
  };

  // Stable variable to store contacts
  private stable var nextId: Nat = 0;
  private stable var contactEntries: [(Nat, Contact)] = [];

  // Create a HashMap to store contacts
  private var contacts = HashMap.HashMap<Nat, Contact>(0, Nat.equal, Nat.hash);

  // Initialize the contacts HashMap from stable storage
  system func preupgrade() {
    contactEntries := Iter.toArray(contacts.entries());
  };

  system func postupgrade() {
    contacts := HashMap.fromIter<Nat, Contact>(contactEntries.vals(), 0, Nat.equal, Nat.hash);
  };

  // Add a new contact
  public func addContact(name: Text, phone: Text, email: Text) : async Nat {
    let id = nextId;
    let newContact: Contact = {
      id = id;
      name = name;
      phone = phone;
      email = email;
    };
    contacts.put(id, newContact);
    nextId += 1;
    id
  };

  // Get all contacts
  public query func getAllContacts() : async [Contact] {
    Iter.toArray(contacts.vals())
  };

  // Get a specific contact by ID
  public query func getContact(id: Nat) : async ?Contact {
    contacts.get(id)
  };

  // Update a contact
  public func updateContact(id: Nat, name: Text, phone: Text, email: Text) : async Bool {
    switch (contacts.get(id)) {
      case (null) { false };
      case (?existingContact) {
        let updatedContact: Contact = {
          id = id;
          name = name;
          phone = phone;
          email = email;
        };
        contacts.put(id, updatedContact);
        true
      };
    }
  };

  // Delete a contact
  public func deleteContact(id: Nat) : async Bool {
    switch (contacts.remove(id)) {
      case (null) { false };
      case (?_) { true };
    }
  };
}
