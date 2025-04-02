import { data, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  getContact,
  updatePhoto as apiUpdatePhoto,
} from "../api/ContactService";
import { Link } from "react-router-dom";

const ContactDetails = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    status: "",
    photoUrl: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        if (id) {
          // Ensure id is defined before fetching
          const { data } = await getContact(id);
          setContact(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, [id]); // Added id to dependency array

  const selectImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const updateImage = async (formData: FormData) => {
    try {
      const { data: photoUrl } = await apiUpdatePhoto(formData);
      return photoUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async () => {
    // Implement contact update logic here
  };

  const handlePhotoUpdate = async (file: File) => {
    try {
      if (id && file) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        formData.append("id", id);
        await updateImage(formData);
        setContact((prev) => ({
          ...prev,
          photoUrl: prev.photoUrl + "?updated_at=" + new Date().getTime(),
        }));
      }
    } catch (error) {
      console.error("Error updating photo:", error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const onUpdateContact = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    updateContact(contact);
  };

  return (
    <>
      <Link to={"/contacts"} className="link">
        <i className="bi bi-arrow-left"></i> Back to list
      </Link>
      <div className="profile">
        <div className="profile-details">
          <div className="image-container">
            <img
              src={contact.photoUrl || "default-image.jpg"}
              alt={"Photo of " + contact.name}
            />
          </div>
          <div className="profile-metadata">
            <p className="profile-name">{contact.name}</p>
            <p className="profile-muted">JPG, GIF, or PNG. Max size of 10MB</p>
            <button className="btn" type="button" onClick={selectImage}>
              <i className="bi bi-cloud-upload"></i> Change Photo
            </button>
          </div>
        </div>
        <div className="profile-settings">
          <div>
            <form onSubmit={updateContact} className="form">
              <div className="user-details">
                <input
                  type="hidden"
                  defaultValue={contact.id}
                  name="id"
                  required
                />
                <div className="input-box">
                  <span className="details">Name</span>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={onChange}
                    name="name"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    type="text"
                    value={contact.email}
                    onChange={onChange}
                    name="email"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Phone</span>
                  <input
                    type="text"
                    value={contact.phone}
                    onChange={onChange}
                    name="phone"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Address</span>
                  <input
                    type="text"
                    value={contact.address}
                    onChange={onChange}
                    name="address"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Title</span>
                  <input
                    type="text"
                    value={contact.title}
                    onChange={onChange}
                    name="title"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Status</span>
                  <input
                    type="text"
                    value={contact.status}
                    onChange={onChange}
                    name="status"
                    required
                  />
                </div>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <form style={{ display: "none" }}>
        <input
          type="file"
          ref={inputRef}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              handlePhotoUpdate(file);
            }
          }}
          name="file"
          accept="image/*"
        />
      </form>
    </>
  );
};

export default ContactDetails;
