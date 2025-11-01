import RatingFilterItem from "./rating-filter-item";

type Props = {
  selectedRaging: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
};

const RatingFilter: React.FC<Props> = ({ selectedRaging, setRating }) => {
  return (
    <div className="mb-6">
      <h4 className="font-medium mb-3">Рейтинг</h4>
      <div className="space-y-2">
        {[4, 3, 2, 1].map((rating) => (
          <RatingFilterItem
            key={rating}
            rating={rating}
            selectedRating={selectedRaging}
            setRating={setRating}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
