import type { Category } from "../../../types/product";
import CategoryFilterItem from "./category-filter-item";

type Props = {
  categories: Category[];
  selectedCategory: Category["title"];
  setCategory: (c: Category["title"]) => void;
};

const CategoryFilter: React.FC<Props> = ({
  categories,
  selectedCategory,
  setCategory,
}) => {
  return (
    <div className="mb-6">
      <h4 className="font-medium mb-3">Категории</h4>
      <div className="space-y-2">
        {categories.map((c) => (
          <CategoryFilterItem
            key={c.id}
            category={c}
            checked={selectedCategory === c.title}
            setCategory={setCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
