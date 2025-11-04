type Props = {
  rating: number;
  selectedRating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
};

export const RatingFilterItem: React.FC<Props> = ({
  rating,
  selectedRating,
  setRating,
}) => {
  return (
    <label key={rating} className="flex items-center">
      <input
        onChange={() => setRating(rating)}
        checked={selectedRating === rating}
        type="radio"
        name="rating"
        className="mr-2"
      />
      {rating}+ звезды и выше
    </label>
  );
};

