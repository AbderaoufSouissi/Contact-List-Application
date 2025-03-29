import { Link } from "react-router-dom";

type ContactProps = {
  id: string;
  photoUrl: string;
  name: string;
  title: string;
  email: string;
  address: string;
  phone: number;
  status: string;
};

const Contact = (props: ContactProps) => {
  return (
    <Link to={`/contacts/${props.id}`} className="contact__item">
      <div className="contact__header">
        <div className="contact__image">
          <img src={props.photoUrl} alt={props.name} />
        </div>
        <div className="contact__details">
          <p className="contact_name">{props.name} </p>
          <p className="contact_title">{props.title}</p>
        </div>
      </div>
      <div className="contact__body">
        <p>
          <i className="bi bi-envelope"></i> {props.email}
        </p>
        <p>
          <i className="bi bi-geo"></i> {props.address}
        </p>
        <p>
          <i className="bi bi-telephone"></i> {props.phone}
        </p>
        <p>
          {props.status === "Active" ? (
            <i className="bi bi-check-circle"></i>
          ) : (
            <i className="bi bi-x-circle"></i>
          )}{" "}
          {props.status}
        </p>
      </div>
    </Link>
  );
};

export default Contact;
