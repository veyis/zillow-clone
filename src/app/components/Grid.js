'use client'
import { useState, useEffect } from "react";
import Card from "./Card";
import Map from "./Map";

const Grid = ({ properties }) => {
    const [input, setInput] = useState("");
    const [houses, setHouses] = useState(properties);
    const [locations, setLocations] = useState(houses.map(house => house.location));

    const setInputAndMapLocations = (value) => {
        setInput(value);
        setHouses(properties.filter(property => property.name.toLowerCase().includes(value.toLowerCase())));
        setLocations(houses.map(house => house.location));
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
