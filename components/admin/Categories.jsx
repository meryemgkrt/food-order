import Title from "../ui/Title";
import LoginInput from "../form/LoginInput";
import { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [inptText, setInptText] = useState("");
  const [categories, setCategories] = useState([]);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({
    isOpen: false,
    category: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        const categoryTitles = res?.data.map((category) => category.title);
        setCategories(categoryTitles || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (inptText.trim()) {
      if (!categories.includes(inptText.trim())) {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
            title: inptText.trim(),
          });

          setCategories([...categories, inptText.trim()]);
          setInptText("");
        } catch (error) {
          console.error("Kategori eklenirken hata oluştu:", error);
          alert("Kategori eklenemedi");
        }
      }
    }
  };

  const confirmDeleteCategory = (categoryToDelete) => {
    setDeleteConfirmModal({
      isOpen: true,
      category: categoryToDelete,
    });
  };

  const handleDeleteCategory = async () => {
    const categoryToDelete = deleteConfirmModal.category;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        data: { title: categoryToDelete },
      });

      setCategories(
        categories.filter((category) => category !== categoryToDelete)
      );

      // Modal'ı kapat
      setDeleteConfirmModal({ isOpen: false, category: null });
    } catch (error) {
      console.error("Kategori silinirken hata oluştu:", error);
      alert("Kategori silinemedi");

      // Hata durumunda da modal'ı kapat
      setDeleteConfirmModal({ isOpen: false, category: null });
    }
  };

  const closeModal = () => {
    setDeleteConfirmModal({ isOpen: false, category: null });
  };

  return (
    <div className="p-8 relative">
      <Title className="text-[32px] md:text-[40px] text-center text-primary font-bold font-dancing">
        Categories
      </Title>

      {/* Add New Category Section */}
      <div className="flex items-center gap-4 mt-6">
        <LoginInput
          type="text"
          value={inptText}
          onChange={(e) => setInptText(e.target.value)}
          placeholder="Add new Category"
          className="w-full h-10 p-4 pl-3 text-sm placeholder:text-sm border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
        <button
          onClick={handleAddCategory}
          className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition"
        >
          Add
        </button>
      </div>

      {/* Category List Section */}
      <div className="relative w-full mt-6">
        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-4">
            {categories.map((category, index) => (
              <div
                key={`${category}-${index}`}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-200 hover:shadow-lg"
              >
                <b className="text-gray-800 font-medium">{category}</b>
                <button
                  onClick={() => confirmDeleteCategory(category)}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-800 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        {categories.length > 5 && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Kategori Silme Onayı
            </h2>
            <p className="mb-6 text-gray-600">
              {`"${deleteConfirmModal.category}" kategorisini silmek istediğinizden emin misiniz?`}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition"
              >
                İptal
              </button>
              <button
                onClick={handleDeleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Categories;
