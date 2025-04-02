import { useEffect, useRef, useState } from "react";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getContacts, saveContact, updatePhoto } from "./api/ContactService";
import Header from "./components/Header";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
import { ContactInfo } from "./types/ContactInfo";

function App() {
  const location = useLocation();

  const modalRef = useRef<HTMLDialogElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const isContactDetailsPage = location.pathname.startsWith("/contacts/");

  const [data, setData] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [values, setValues] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    status: "",
  });
  const [file, setFile] = useState<File>();

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const response = await getContacts(page, size);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = (show: boolean) => {
    if (!modalRef.current) return; // Ensures modalRef exists before calling methods
    show ? modalRef.current.showModal() : modalRef.current.close();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleNewContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await saveContact(values);
      const formData = new FormData();
      formData.append("file", file ?? new Blob(), file?.name ?? "unknown");
      formData.append("id", data.id);
      const { data: photoUrl } = await updatePhoto(formData);
      toggleModal(false);
      console.log(photoUrl);
      setFile(undefined);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      setValues({
        name: "",
        email: "",
        phone: "",
        address: "",
        title: "",
        status: "",
      });
      getAllContacts();
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async () => {};
  const updateImage = async () => {};

  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
      <Header
        toggleModal={toggleModal}
        nbOfContacts={data.totalElements}
        isContactDetailsPage={isContactDetailsPage}
      />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/contacts" />} />
            <Route
              path="/contacts"
              element={
                <ContactList
                  data={data}
                  currentPage={currentPage}
                  getAllContacts={getAllContacts}
                />
              }
            />
            <Route
              path="/contacts/:id"
              element={
                <ContactDetails
                  updateContact={updateContact}
                  updateImage={updateImage}
                />
              }
            />
          </Routes>
        </div>
      </main>

      {/* /* Modal */}

      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal-header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal-body">
          <form
            onSubmit={handleNewContact}
            onReset={() => {
              setValues({
                name: "",
                email: "",
                title: "",
                phone: "",
                address: "",
                status: "",
              });
            }}
          >
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  type="text"
                  value={values.name}
                  onChange={onChange}
                  name="name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  value={values.email}
                  onChange={onChange}
                  name="email"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input
                  type="text"
                  value={values.title}
                  onChange={onChange}
                  name="title"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  value={values.phone}
                  onChange={onChange}
                  name="phone"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input
                  type="text"
                  value={values.address}
                  onChange={onChange}
                  name="address"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input
                  type="text"
                  value={values.status}
                  onChange={onChange}
                  name="status"
                  required
                />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input
                  type="file"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const selectedFile = event.target.files?.[0]; // Safely accessing the first file
                    setFile(selectedFile);
                  }}
                  ref={fileRef}
                  name="photo"
                  required
                />
              </div>
            </div>
            <div className="form-footer">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
              <button type="reset" className="reset-btn">
                Reset
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default App;
