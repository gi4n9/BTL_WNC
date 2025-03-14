interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  imageUrl: string;
}

const ServiceCard = ({
  title,
  price,
  description,
  imageUrl
}: ServiceCardProps) => {
  return <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
            {price}
          </span>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>;
};
export default ServiceCard;