import Link from 'next/link'; 
import ImageCard from './ImageCard';

const Card = ({property}) => {

  console.log(property)
  return (
     <>
     
     <Link href={`/property/${property.slug}`}>
      <div className='card'>
        <h2>{property.name}</h2>
      <p>{property.images.fileName}</p> 
        <br />

        {property.images.url}

        <ImageCard
          url = {property.images[0].url}
          fileName = {property.images[0].fileName}
          alt = {property.name}
          width = {300}
          height = {150} 
        
        />
        <div className='text-container'>
          <h3> ${property.rentalPrice}/ month</h3>
          <h3> {property.beds} Beds </h3>
        <p>    {property.name}</p>
        </div>
      </div>
    
      </Link>

   

      

     </>
    );
  }
  
  export default Card;
  