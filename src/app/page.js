import Navbar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Map from "./components/Map";
import Card from "./components/Card";

const getProperties = async () => {
  const HYPGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
  console.log("url:", HYPGRAPH_ENDPOINT);

  if (!HYPGRAPH_ENDPOINT) {
    throw new Error("HYPGRAPH_ENDPOINT is not set");
  }

  const response = await fetch(HYPGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
      query MyQuery3 {
        properties {
          
          beds
          description
          images {
            fileName
            url
          }
          location {
            latitude
            longitude
          }
          name
          rentalPrice
          slug
          id
         
        }
      }      
      
      `
    })
  });

  if (!response.ok) {
    // Log error details or handle them appropriately
    console.error("API response not OK:", await response.text());
    return []; // Return an empty array or appropriate error indication
  }

  const json = await response.json();

  // Log the JSON to see what you are getting from the API
  console.log("API Response:", json);

  // Ensure that json.data and json.data.properties exist
  if (json.data && json.data.properties) {
    return json.data.properties;
  } else {
    // Handle cases where properties are not present
    console.error('Data not found or missing properties');
    return []; // Return an empty array to avoid further errors
  }
}



const Home = async()  => {
  const properties = await getProperties()
  const locations = properties.map(property => property.location)
  // console.log(properties)

console.log(locations)

  return (
    <>
      <Navbar />
      <SearchBar />
      <main>
        <article>
          <Map locations={locations} />
        </article>
        <article className="listings">
          <h2>Rental Listings</h2>
          <div className="card-container">
            {properties.map(property => (
              <Card 
              key={property.id} 
              property={property} />
            ))}
          </div>
        </article>
      </main>
    </>
  );
};

export default Home;
