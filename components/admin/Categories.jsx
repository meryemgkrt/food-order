import Title from "../ui/Title";
import LoginInput from "../form/LoginInput";
import { useState } from "react";

const Categories = () => {
  const [inptText, setInptText] = useState("");
  const [categories, setCategories] = useState([]);

  return (
    <div className="p-8">
      <Title className="text-[32px] md:text-[40px] text-center text-primary font-bold font-dancing">
        Categories
      </Title>

      {/* Add New Category Section */}
      <div className="flex items-center gap-4 mt-6">
        <LoginInput
          type="text"
          value={inptText} // Inputa mevcut state bağlandı
          onChange={(e) => setInptText(e.target.value)}
          placeholder="Add new Category"
          className="w-full h-10 p-4 pl-3 text-sm placeholder:text-sm border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
        <button
          onClick={() => {
            if (inptText.trim()) {
              
              setCategories([...categories, inptText.trim()]);
              setInptText("");
            }
          }}
          className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition"
        >
          Add
        </button>
      </div>

      {/* Category List Section */}
      <div className="overflow-x-auto w-full flex flex-col gap-4 mt-6">
        {categories.map((category, index) => (
          <div
            key={`${category}-${index}`} 
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <b className="text-gray-800 font-medium">{category}</b>
            <button
              onClick={() =>
                setCategories(categories.filter((cat) => cat !== category))
              }
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-800 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
