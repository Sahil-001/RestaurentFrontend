import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


export interface Booking {
    userName: string;
    restaurentName: string;
    date: string;
    startTime: string;
    memberCount : number;
}

const RestaurentBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingRestaurentName, bookingDate, bookingStartTime } = location.state || {};

    const [formData, setFormData] = useState<Booking>({
        userName: "Random", // Just adding for future, not required as of now.
        restaurentName: bookingRestaurentName,
        date: bookingDate,
        startTime: bookingStartTime,
        memberCount: 0,
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
                .post('http://localhost:8001/restaurent/' + formData.restaurentName + "/book", formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then((response: any) => {
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
                                Restaurent Booking Form
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
                            {showSuccessMessage && "Restaurent got booked sucessfully"}
                            {showErrorMessage && "Error occurred while booking the restaurent, please retry after some time"}
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
                                        disabled
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
                                        disabled
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
                                        disabled
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="memberCount" className="form-label">Member Count</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="memberCount"
                                        name="memberCount"
                                        placeholder="Enter memberCount"
                                        value={formData.memberCount}
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

export default RestaurentBooking;