import React from 'react';
import loader from '../../assets/loader/loader-2.gif'
const Loder = (props) => {
    console.log(props);
    return (
        <div className="text-center col-12 py-2 my-2" style={{display: props.visibility}}>
            <img src={loader} alt=""/>
        </div>
    );
};

export default Loder;