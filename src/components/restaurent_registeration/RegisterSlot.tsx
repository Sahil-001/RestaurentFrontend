import React, { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import axios from 'axios';
import { BACKEND_API_ENDPOINT } from '../../constants/GlobalConstant'

export interface RegisterSlotForm {
    restaurentName: string;
    date: string;
    startTime: string;
    endTime: string;
    totalTable: number;
}

const RegisterSlot = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterSlotForm>({
        restaurentName: '',
        date: '',
        startTime: '00:00',
        endTime: '00:00',
        totalTable: 0,
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

    // Handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(formData);
        try {
            console.log("hi");
            axios
                .put(BACKEND_API_ENDPOINT + '/restaurent/' + formData.restaurentName + "/slot", formData, {
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

    return (
        <>
            {showModal && <div className="modal fade show"
                style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Restaurent Slot Registeration Form
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
                            {showSuccessMessage && "Restaurent slot got registered successfully"}
                            {showErrorMessage && "Error while registering the restaurent slot, please retry after some time"}
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="restaurentName" className="form-label">Restaurent Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="restaurentName"
                                        name="restaurentName"
                                        placeholder="Enter restaurent name"
                                        value={formData.restaurentName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        name="date"
                                        placeholder="Enter date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="startTime" className="form-label">Start Time (HH:MM)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="startTime"
                                        name="startTime"
                                        placeholder="Enter startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="endTime" className="form-label">End Time (HH:MM)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="endTime"
                                        name="endTime"
                                        placeholder="Enter endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="totalTable" className="form-label">Total Table</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="totalTable"
                                        name="totalTable"
                                        placeholder="Enter totalTable"
                                        value={formData.totalTable}
                                        onChange={handleChange}
                                        required
                                    />
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

export default RegisterSlot;