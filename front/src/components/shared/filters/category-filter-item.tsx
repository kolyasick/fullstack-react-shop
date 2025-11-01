import type { Category } from "../../../types/product";

type Props = {
  category: Category;
  checked: boolean;
  setCategory: (c: Category["title"]) => void;
};

const CategoryFilterItem: React.FC<Props> = ({
  category,
  checked,
  setCategory,
}) => {
  return (
    <label className="flex items-center">
      <input
        onChange={() => setCategory(category.title)}
        checked={checked}
        type="radio"
        name="category"
        className="mr-2"
      />
      {category.title}
    </label>
  );
};

export default CategoryFilterItem;
