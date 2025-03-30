type HeaderProps = {
  toggleModal: (param: boolean) => void;
  nbOfContacts: number;
};

const Header = ({ toggleModal, nbOfContacts }: HeaderProps) => {
  return (
    <header className="header">
      <div className="container">
        <h3>Contact List ({nbOfContacts})</h3>
        <button className="btn" onClick={() => toggleModal(true)}>
          Add New Contact <i className="bi bi-plus-square"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
