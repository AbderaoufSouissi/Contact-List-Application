import { useEffect, useRef, useState } from "react";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getContacts } from "./api/ContactService";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList";
import { ContactInfo } from "./types/ContactInfo";

function App() {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

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
      console.log(response);
      console.log(response.data);
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
    console.log(values);
  };

  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
      <Header toggleModal={toggleModal} nbOfContacts={data.totalElements} />
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
          <form>
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
                    console.log(file);
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
