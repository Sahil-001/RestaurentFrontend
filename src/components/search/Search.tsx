import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Restaurent } from '../restaurent_registeration/RestaurentRegisterationForm';
import axios from 'axios';
import "./index.css";
import { BACKEND_API_ENDPOINT } from '../../constants/GlobalConstant'


function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const { search_key, search_value } = location.state || {};
    const [restaurentList, setRestaurentList] = useState<any>([]);
    const [errorMessage, showErrorMessage] = useState<boolean>(false);

    useEffect(() => {
        console.log(search_key);
        console.log(search_value);
        axios.get(BACKEND_API_ENDPOINT + '/search/restaurent?key=' + search_key + '&value=' + search_value,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response: any) => {
                setRestaurentList(response.data);
            })
            .catch((err) => {
                console.log(err)
                showErrorMessage(true);
            });
    }, []);

    const restaurentBookingHandler = (
        restaurentName: string,
        startTime: string,
        date: string
    ) => {
        navigate('/restaurent/book', {
            state:
            {
                bookingRestaurentName: restaurentName,
                bookingDate: date,
                bookingStartTime: startTime
            }
        });

    }

    return (<>
        <div className="row">
            {
                restaurentList.map((restaurent: any) => (
                    <div key={restaurent.id} className="col-md-4 mb-4">
                        <div className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{restaurent.name}</h5>
                                <p className="card-text">{restaurent.city}</p>
                                <p className="card-text">{restaurent.area}</p>
                                <p className="card-text">{restaurent.foodType}</p>
                                <p>Available Slots (Click slots to book it)</p>
                                <ul className="clickable-list">
                                    {
                                        restaurent.slots.map((slot: any) => (
                                            <li className={`list-item`}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    restaurentBookingHandler(restaurent.name, slot.startTime, slot.date);
                                                    console.log("clicked")
                                                }}>Date : {slot.date} StartTime : {slot.startTime} endTime : {slot.endTime} totalTable : {slot.totalTable}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                ))
            }</div> </>);
}

export default Search;