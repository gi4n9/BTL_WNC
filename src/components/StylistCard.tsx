import React from 'react';
interface StylistCardProps {
  name: string;
  position: string;
  imageUrl: string;
  experience: string;
}

const StylistCard: React.FC<StylistCardProps> = ({
  name,
  position,
  imageUrl,
  experience
}) => {
  return <div className="bg-white rounded-lg overflow-hidden shadow-lg text-center">
      <img src={imageUrl} alt={name} className="w-full h-64 object-cover object-center" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-blue-600 font-medium">{position}</p>
        <p className="text-gray-600 mt-2">{experience}</p>
      </div>
    </div>;
};
export default StylistCard;