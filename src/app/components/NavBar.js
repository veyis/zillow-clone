import Image from 'next/image'
const Navbar = () => {  
    return (
        <nav> 
{/* //Zillow Logo */}
<Image 
width={110}
height={24}
src="/z-logo.svg" alt="Powered by Zillow" />    
        </nav>
    )
}
export default Navbar 


