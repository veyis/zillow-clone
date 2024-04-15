'use client'
import { useState, useEffect } from "react";
import Card from "./Card";
import Map from "./Map";

const Grid = ({ properties }) => {
    const [input, setInput] = useState("");
    const [houses, setHouses] = useState(properties);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        // Update locations whenever houses is updated
        setLocations(houses.map((house) => house.location));
    }, [houses]); // Dependency array, ensuring effect runs only if houses changes

    const setInputAndMapLocations = (value) => {
        setInput(value);
        const filteredHouses = properties.filter((house) =>
            house.location.toLowerCase().includes(value.toLowerCase())
        );
        setHouses(filteredHouses);
        // setLocations call is removed from here and handled by useEffect
    };

    console.log("locations:", locations);

    return (
        <>
            <div className="search-bar">
                <input
                    placeholder="Search Location"
                    onChange={(e) => setInputAndMapLocations(e.target.value)}
                    value={input}
                />
            </div>

            <main>
                <article>
                    <Map locations={locations} />
                </article>
                <article className="listings">
                    <h2>Rental Listings</h2>
                    <div className="card-container">
                        {houses.map(property => (
                            <Card
                                key={property.id}
                                property={property}
                            />
                            ))
                        }
                    </div>
                </article>
            </main>
        </>
    );
}

export default Grid;
