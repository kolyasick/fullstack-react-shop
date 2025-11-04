
import { useFilterActions } from "../../contexts/filters/use-filter-actions";
import { useFilterState } from "../../contexts/filters/use-filter-state";

export const HeaderSearchInput: React.FunctionComponent = () => {
  const { setSearchQuery } = useFilterActions();
  const { searchQuery } = useFilterState();

  return (
    <div className="flex-1 max-w-md mx-4">
      <div className="relative">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          type="text"
          placeholder="Поиск товаров..."
          className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};
