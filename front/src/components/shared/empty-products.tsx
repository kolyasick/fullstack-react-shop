const EmptyProducts = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-6xl mb-4">😔</div>
      <div className="text-2xl text-gray-600 mb-2">Ничего не найдено</div>
      <div className="text-gray-500 mb-4">
        Попробуйте изменить параметры фильтрации
      </div>
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Сбросить фильтры
      </button>
    </div>
  );
};

export default EmptyProducts;
