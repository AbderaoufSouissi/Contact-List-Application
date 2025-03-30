import { useEffect, useState } from "react";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getContacts } from "./api/ContactService";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList";

function App() {
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements:0});
  const [currentPage, setCurrentPage] = useState(0);

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
    console.log("i was clicked");
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
    </>
  );
}

export default App;
