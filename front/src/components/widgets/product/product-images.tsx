type Props = {
  imageUrl: string;
};

export const ProductImages: React.FC<Props> = ({ imageUrl }) => {
  return (
    <div className="space-y-4">
      <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={"/products/" + imageUrl}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="aspect-square bg-gray-100 rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500"
          >
            <img
              src={"/products/" + imageUrl}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
