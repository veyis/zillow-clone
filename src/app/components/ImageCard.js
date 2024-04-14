import Image from "next/image";

const ImageCard = ({ url, fileName, width, height }) => {
  // console.log("url:", url);
  // console.log("fileName:", fileName);
  // console.log("width:", width);
  // console.log("height:", height);

  return (
    <>
      <Image
        className="property-image"
        src={url}
        alt={fileName}
        width={width}
        height={height}
        priority
      />
    </>
  );
};




export default ImageCard;
