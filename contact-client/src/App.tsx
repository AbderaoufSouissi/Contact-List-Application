import { useEffect, useState } from "react";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getContacts } from "./api/ContactService";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState({});
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

  const toggleModal = (show) => {
    console.log("i was clicked");
  };

  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <>
      <Header toggleModal={toggleModal} nbOfContacts={data.totalElements} />
    </>
  );
}

export default App;
