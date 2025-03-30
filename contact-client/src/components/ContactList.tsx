import { ContactProps } from "./Contact";
import Contact from "./Contact";

type ContactListProps = {
    data: Data
    currentPage: number;
    getAllContacts: (index: number) => Array<ContactProps>
}

type Data = {
    content : Array<ContactProps>
    totalPages: number
}


const ContactList = ({data, currentPage,getAllContacts} : ContactListProps) => {
  return (
    <main className="main">
      {data?.content?.length === 0 && (
        <div>
          No Contacts found.<br/>
        Want to add a new contact ?
        </div>
      )}
      <ul className="contact-list">
        {data?.content?.length > 0 &&
          data.content.map((contact: ContactProps) => (
            <Contact
              key={contact.id}
              id={contact.id}
              name={contact.name}
              title={contact.title}
              email={contact.email}
              address={contact.address}
              status={contact.status}
              phone={contact.phone}
              photoUrl={contact.photoUrl}
            />
          ))}
      </ul>
      {data?.content?.length > 0 && data?.totalPages > 1 && (
        <div className="pagination">
          <a
            onClick={() => getAllContacts(currentPage - 1)}
            className={currentPage === 0 ? "disbaled" : ""}
          >
            &laquo;
          </a>
          {data &&
            [...Array(data.totalPages).keys()].map((page, index) => (
              <a
                onClick={() => getAllContacts(page)}
                className={currentPage === page ? "active" : ""}
                key={page}
              >
                {page + 1}
              </a>
            ))}
          <a
            onClick={() => getAllContacts(currentPage + 1)}
            className={data.totalPages === currentPage + 1 ? "disabled" : ""}
          >
            &raquo;
          </a>
        </div>
      )}
    </main>
  );
};

export default ContactList;
