type HeaderProps = {
  toggleModal: (param: boolean) => void;
  nbOfContacts: number;
  isContactDetailsPage:boolean
};

const Header = ({ toggleModal, nbOfContacts ,isContactDetailsPage}: HeaderProps) => {
  return (
    <header className="header">
      <div className="container">
        <h3>Contact List ({nbOfContacts})</h3>
        {!isContactDetailsPage && (
        <button onClick={() => toggleModal(true)} className="btn btn-primary">
          Add New Contact
        </button>
      )}
      </div>
    </header>
  );
};

export default Header;
