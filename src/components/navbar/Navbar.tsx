import React, {useState} from 'react';
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const handleNavigationForRestaurentRegisteration = (event: any) => {
        event.preventDefault();
        navigate('/restaurent/register');
    };

    const handleNavigationForRegisterSlot = (event: any) => {
        event.preventDefault();
        navigate('/restaurent/slots/register' , {});
    };
    const searchClickHandler = (event: any) => {
        event.preventDefault();
        let key : string;
        let value : string;
        if(searchValue.includes(':')) {
            key = searchValue.split(':')[0];
            value = searchValue.split(':')[1];
        }
        else {
            key = "name" // default key;
            value = searchValue;
        }
        navigate('/restaurent/search', {state: {search_key : key, search_value : value}});
    }
    return (<>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#90EE90' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Restaurent Booking App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Search Form */}
                    <form className="d-flex">
                        <input
                            className="form-control mt-1"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button className="btn btn-outline-success" onClick={searchClickHandler} type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button className="nav-link"
                                onClick={handleNavigationForRestaurentRegisteration}>Register Restaurent</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link"
                                onClick={handleNavigationForRegisterSlot}>Register Slots</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>);
}

export default Navbar;