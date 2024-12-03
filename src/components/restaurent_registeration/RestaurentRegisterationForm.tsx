import React, { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { BACKEND_API_ENDPOINT } from '../../constants/GlobalConstant';


import axios from 'axios';

export interface Restaurent {
    name: string;
    city: string;
    area: string;
    foodType: string;
}

function RestaurentRegisterationForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Restaurent>({
        name: '',
        city: '',
        area: '',
        foodType: '',
    });
    const [showModal, setShowModal] = useState<boolean>(true); // Modal visibility state
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

    // Toggle the modal visibility
    const toggleModal = () => setShowModal(!showModal);

    // Handle input changes
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e: any) => {
        // console.log(e.target.value);
        setFormData({ ...formData, foodType: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        try {
            console.log("hi");
            axios
                .post(BACKEND_API_ENDPOINT + '/register/restaurent', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then((response: any) => {
                    console.log("hi2");
                    setShowSuccessMessage(true);
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err)
                    setShowErrorMessage(true);
                });
        }
        catch (ex: any) {
            console.log(ex)
            setShowErrorMessage(true);
        }
        console.log('Form Data Submitted:', formData);
        // Add form submission logic here (e.g., API call)
    };

    return (<>
        {showModal && <div className="modal fade show"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Restaurent Registeration Form
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={toggleModal} // Close modal
                        />
                    </div>
                    <div>
                        {showSuccessMessage && "Restaurent got registered successfully"}
                        {showErrorMessage && "Error while restering the restaurent, please retry after some time"}
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    placeholder="Enter restaurent name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    placeholder="Enter restaurent city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="area" className="form-label">Area</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="area"
                                    name="area"
                                    placeholder="Enter restaurent area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="dropdown">Choose food type</label>
                                <br />
                                <select
                                    id="dropdown"
                                    value={!formData.foodType ? "option1" : formData.foodType}
                                    onChange={handleSelectChange}
                                >
                                    <option value="option1">Select Food Type</option>
                                    <option value="VEG">Veg</option>
                                    <option value="NON_VEG">Non Veg</option>
                                    <option value="BOTH">Both</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>}
    </>
    );
}

export default RestaurentRegisterationForm;