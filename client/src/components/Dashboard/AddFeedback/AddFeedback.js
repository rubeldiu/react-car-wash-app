import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import Header from '../../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const AddFeedback = () => {
    // Context from app.js
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

   // handle redirected to home
   let history = useHistory();
   function handleEventUpdate() {
     history.push('/');
   }

   // handle Add Review:
  const onSubmit = (data) => {
    const newReview = { ...data };
    newReview.img = loggedInUser.email
      ? loggedInUser.photo
      : "";

    fetch('https://young-sierra-54115.herokuapp.com/addReview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          handleEventUpdate();
        }
      });
  };
  // React hook form for validation and error message
  const { register, handleSubmit, errors } = useForm();

    return (
      <section>
      <Header/>
        <section className="container-fluid row">
      <Sidebar />
      <div
        className="col-md-10 p-4 pr-5"
        style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}
      >
      <h5 className="text-brand">Add FeedBack</h5>
      <form onSubmit={handleSubmit(onSubmit)} className='client-form'>
       
            <div className='form-group'>
              <input
                className='form-control'
                defaultValue={loggedInUser.name}
                name='name'
                type='text'
                placeholder='Your Name'
                ref={register({ required: true })}
              />
              {errors.name && <span className='error'>Name is required</span>}
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                defaultValue={loggedInUser.email}
                name='email'
                type='email'
                placeholder='Email Address'
                ref={register({ required: true })}
              />
              {errors.designation && (
                <span className='error'>Email is required</span>
              )}
            </div>

            <div className='form-group'>
              <textarea
                className='form-control'
                name='description'
                placeholder='Description'
                rows='4'
                ref={register({ required: true })}
              ></textarea>

              {errors.description && (
                <span className='error'>Description is required</span>
              )}
            </div>

            <div className='text-left'>
              <button type='submit' className='btn btn-brand'>
                Submit
              </button>
          </div>
       
      </form>
      </div>
    </section>
    </section>
    );
};

export default AddFeedback;