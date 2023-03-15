import { CldImage as CloudinaryImage } from 'next-cloudinary';

const CldImage = (props) => {
  const deliveryType = !props.src.startsWith('https://res.cloudinary.com') ? 'fetch' : undefined;
  return <CloudinaryImage deliveryType={deliveryType} {...props} />;
};

export default CldImage;
