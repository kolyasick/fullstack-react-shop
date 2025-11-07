export const PromocodeForm = () => {
  return (
    <div
      className={`p-6 border-t border-gray-200 ${
        false ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Промокод"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
          Применить
        </button>
      </div>
    </div>
  );
};
