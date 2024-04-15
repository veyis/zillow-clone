import ImageCard from "@/app/components/ImageCard";
import Link from "next/link";

const getProperty = async (slug) => {
  const HYPGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
  if (!HYPGRAPH_ENDPOINT) {
    throw new Error("HYPGRAPH_ENDPOINT is not set");
  }

  const response = await fetch(HYPGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `query Property($slug: String!) {
        properties(where: {slug: $slug}) {
          id
          name
          description
          rentalPrice
          parking
          pool
          petFriendly
          inUnitDryer
          elevator
          beds
          images{
            id,
            url,
            fileName
          }
          managinBroker{
            name,
            phoneNumber
          }
        }
      }`,
      variables: { slug },
    }),
  });
  

  
  const data = await response.json();
  console.log(data)
  return data.data.properties[0];

}

const Property = async ({params}) => {

 const property =  await getProperty(params.slug)
  console.log(property)
  

  return (
    <>
     <div className='property'>
      <div className="property-images-container">
        {property.images.map((image) => (
          
            <ImageCard
              key={image.id}
              url={image.url}
              fileName={image.fileName}
              width={300}
              height={150}
               />
         ))}
      </div>

  <div className="property-info-container"> 

<h1> {property.name}</h1>
<h2> <span> {property.beds} Beds   </span>  <span> ${property.rentalPrice} </span> </h2>
<p> {property.description} </p>

<br />
<h2> Amenities: </h2>

<ul>
  {property.parking && <li> Private Parking </li>}
  {property.pool && <li> Pool </li>}
  {property.petFriendly && <li> Pet Friendly </li>}
  {property.inUnitDryer && <li> In Unit Dryer </li>}
  {property.elevator && <li> Elevator </li>}

</ul>
<br />
<h3> Licenced Brokerage  </h3> 

<p> Managing Broker: {property.managinBroker ? property.managinBroker.name : '-'} </p>
<p> Phone Number: {property.managinBroker ? property.managinBroker.phoneNumber : '-'} </p>

<br />

<Link className="button" href="/"> Back to Listings </Link>
</div>
      </div>
    </>
  );
}


export default Property;
