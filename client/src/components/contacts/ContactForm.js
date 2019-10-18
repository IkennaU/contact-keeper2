import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  useEffect(() => {
    if (contactContext.current !== null) {
      setContact(contactContext.current);
    } else {
      setContact({
        name: "",
        phone: "",
        email: "",
        type: "personal"
      });
    }
  }, [contactContext]);
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    type: "personal"
  });
  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (contactContext.current === null) {
      contactContext.addContact(contact);
    } else {
      contactContext.updateContact(contact);
    }

    setContact({
      name: "",
      phone: "",
      email: "",
      type: "personal"
    });
  };
  const clearAll = () => {
    contactContext.clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {contactContext.current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={contact.name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={contact.email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={contact.phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={contact.type === "personal"}
        onChange={onChange}
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={contact.type === "professional"}
        onChange={onChange}
      />
      Professional
      <div>
        <input
          type="submit"
          value={contactContext.current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {contactContext.current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
