import React from "react";
import type { Brand } from "../../types/product";
import api from "../../axios/config";

const Filters = () => {
  const [brands, setBrands] = React.useState<Brand[]>([]);

  React.useEffect(() => {
    api.get("/products/brands").then((res) => setBrands(res.data));
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Фильтры</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Сбросить
        </button>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Категории</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="radio" name="category" className="mr-2" />
            Все категории
          </label>

          <label className="flex items-center">
            <input type="radio" name="category" className="mr-2" />
            Смартфоны
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Бренды</h4>
        {brands.map((b) => (
          <div key={b.id} className="space-y-2 max-h-40 overflow-y-auto">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              {b.title}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Цена, $</h4>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="От"
            className="w-1/2 px-2 py-1 border border-gray-300 rounded text-sm"
          />
          <input
            type="number"
            placeholder="До"
            className="w-1/2 px-2 py-1 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Наличие</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="radio" name="stock" className="mr-2" />
            Все
          </label>
          <label className="flex items-center">
            <input type="radio" name="stock" className="mr-2" />В наличии
          </label>
          <label className="flex items-center">
            <input type="radio" name="stock" className="mr-2" />
            Нет в наличии
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3">Рейтинг</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input type="radio" name="rating" className="mr-2" />
              {rating}+ звезды и выше
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
