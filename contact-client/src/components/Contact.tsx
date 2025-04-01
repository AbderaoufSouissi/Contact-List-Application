import { Link } from "react-router-dom";

export type ContactProps = {
  id?: string;
  name: string;
  title: string;
  email: string;
  address: string;
  status: string;
  phone: string;
  photoUrl?: string;
};

const Contact = (contact: ContactProps) => {
  return (
    <Link to={`/contacts/${contact.id}`} className="contact-item">
      <div className="contact-header">
        <div className="contact-image">
          <img src={contact.photoUrl} alt={contact.name} />
        </div>
        <div className="contact-details">
          <p className="contact-name">{contact.name} </p>
          <p className="contact-title">{contact.title}</p>
        </div>
      </div>
      <div className="contact-body">
        <p>
          <i className="bi bi-envelope"></i> {contact.email}
        </p>
        <p>
          <i className="bi bi-geo"></i> {contact.address}
        </p>
        <p>
          <i className="bi bi-telephone"></i> {contact.phone}
        </p>
        <p>
          {contact.status === "Active" ? (
            <i className="bi bi-check-circle"></i>
          ) : (
            <i className="bi bi-x-circle"></i>
          )}{" "}
          {contact.status}
        </p>
      </div>
    </Link>
  );
};

export default Contact;
