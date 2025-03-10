'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const FlightSearch = () => {
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [flightResults, setFlightResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/flights?from=${departureCity}&to=${arrivalCity}&departureDate=${departureDate}&returnDate=${returnDate}&passengers=${passengers}`);
        const data = await response.json();
        setFlightResults(data.flights);
    };

    return (
        <section className="section-box box-filter-search background-body">
            <div className="container">
                <form className="form-search-filter" onSubmit={handleSearch}>
                    <input className="form-control" type="text" placeholder="Departure City" value={departureCity} onChange={(e) => setDepartureCity(e.target.value)} required />
                    <input className="form-control" type="text" placeholder="Arrival City" value={arrivalCity} onChange={(e) => setArrivalCity(e.target.value)} required />
                    <input className="form-control" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} required />
                    <input className="form-control" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                    <select className="form-control" value={passengers} onChange={(e) => setPassengers(e.target.value)}>
                        {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
                    </select>
                    <button className="btn btn-primary" type="submit">Search Flights</button>
                </form>
                <div>
                    {flightResults.length > 0 ? (
                        <ul>
                            {flightResults.map((flight, index) => (
                                <li key={index}>
                                    {flight.flightNumber} - {flight.departureTime} to {flight.arrivalTime} - ${flight.price}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No flights found.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FlightSearch;
