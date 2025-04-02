import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getContact } from "../api/ContactService";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  title: string;
  status: string;
  photoUrl: string;
}

interface ContactDetailProps {
  updateContact: (contact: Contact) => Promise<void>;
  updateImage: (formData: FormData) => Promise<string | undefined>;
}

const ContactDetail: React.FC<ContactDetailProps> = ({
  updateContact,
  updateImage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [contact, setContact] = useState<Contact>({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    status: "",
    photoUrl: "",
  });

  const { id } = useParams<{ id: string }>();

  const fetchContact = async (id: string | undefined) => {
    if (!id) return;

    try {
      const { data } = await getContact(id);
      setContact(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const updatePhoto = async (file: File) => {
    if (!id) return;

    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", id);

      const newPhotoUrl = await updateImage(formData);
      if (newPhotoUrl) {
        setContact((prev) => ({ ...prev, photoUrl: newPhotoUrl }));
      }

      // Reset file input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdateContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateContact(contact);
      fetchContact(id);
    } catch (error) {}
  };

  useEffect(() => {
    fetchContact(id);
  }, [id]);

  return (
    <>
      <Link to={"/contacts"} className="link">
        <i className="bi bi-arrow-left"></i> Back to list
      </Link>
      <div className="profile">
        <div className="profile-details">
          <img
            src={contact.photoUrl || "default-profile.png"}
            alt={`Profile photo of ${contact.name}`}
            className="profile-image"
          />
          <div className="profile-metadata">
            <p className="profile-name">{contact.name}</p>
            <p className="profile-muted">JPG, GIF, or PNG. Max size of 10MB</p>
            <button onClick={selectImage} className="btn">
              <i className="bi bi-cloud-upload"></i> Change Photo
            </button>
          </div>
        </div>
        <div className="profile-settings">
          <div>
            <form onSubmit={onUpdateContact} className="form">
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
                    type="email"
                    value={contact.email}
                    onChange={onChange}
                    name="email"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Phone</span>
                  <input
                    type="tel"
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
            if (event.target.files?.[0]) {
              updatePhoto(event.target.files[0]);
            }
          }}
          name="file"
          accept="image/*"
        />
      </form>
    </>
  );
};

export default ContactDetail;
