type Props = {
  clearFilters: () => void;
};

export const FiltersHeader: React.FC<Props> = ({ clearFilters }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold">Фильтры</h3>
      <button
        onClick={clearFilters}
        className="text-sm text-blue-600 hover:text-blue-800"
      >
        Сбросить
      </button>
    </div>
  );
};

