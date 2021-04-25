import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import Header from '../Header/Header';

const AddService = () => {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState(null);
  const handleblur = (e) => {
    const newInfo = { ...info };
    newInfo[e.target.name] = e.target.value;
    setInfo(newInfo);
  };
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };
   // handle redirected to home
   let history = useHistory();
   function handleEventUpdate() {
     history.push('/');
   }
  const handleSubmit = (e) => {
      e.preventDefault();
    const formData = new FormData()
        console.log(info);
        formData.append('file', file);
        formData.append('title', info.title);
        formData.append('description', info.description);
        formData.append('price', info.price);

    fetch("https://young-sierra-54115.herokuapp.com/addService", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        handleEventUpdate();
      })
      .catch((error) => {
        console.error(error);
      });
  };
    return (
      <section>
      <Header/>
        <section className="container-fluid row">
      <Sidebar />
      <div
        className="col-md-10 p-4 pr-5"
        style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}
      >
        <h5 className="text-brand">Add Service</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Service Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Service Title"
              onBlur={handleblur}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Description"
              onBlur={handleblur}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              className="form-control"
              placeholder="$Price"
              onBlur={handleblur}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload a image</label>
            <input
              type="file"
              className="form-control"
              id="file"
              placeholder="Picture"
              onChange={handleFileChange}
             
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </section>
    </section>
    );
};

export default AddService;