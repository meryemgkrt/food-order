import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import productValidationSchema from "../../schema/productValidationSchema";
import Title from "../ui/Title";
import axios from "axios";
import { toast } from "react-toastify";




const AddProduct = ({ setIsProductModal }) => {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );

        const categoryTitles = res?.data.map((category) => category.title);
        setCategories(categoryTitles || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        const defaultCategories = ["pizza", "burger", "salad", "drink"];
        setCategories(defaultCategories);
        toast.error("Categories could not be loaded!");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // File Change Handler
  const handleFileChange = (e, setFieldValue) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        setFile(selectedFile);
        setFieldValue("file", selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Cloudinary Upload
  const handleUploadToCloudinary = async (file) => {
    if (!file) {
      throw new Error("Please select an image");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "food-files");
    formData.append("cloud_name", "duibvimj5");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/duibvimj5/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error(`Image upload failed: ${error.message}`);
    }
  };

  // Submit Handler
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true);
      setSubmitting(true);

      // Upload image to Cloudinary
      const imageUrl = await handleUploadToCloudinary(values.file);

      // Prepare product data
      const newProduct = {
        title: values.title,
        desc: values.description,
        prices: [
          parseFloat(values.prices.small),
          parseFloat(values.prices.medium),
          parseFloat(values.prices.large),
        ],
        category: values.category.toLowerCase(),
        img: imageUrl,
        extras: values.extras.map((extra) => ({
          text: extra.text,
          prices: parseFloat(extra.price),
        })),
      };

      // Send data to backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        newProduct
      );

      // Success notification
      toast.success("Product added successfully!");

      // Close modal
      setIsProductModal(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        `Product creation failed: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-primary hover:text-red-600 transition-all"
          onClick={() => setIsProductModal(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>

        {/* Title */}
        <Title className="font-bold text-3xl font-dancing text-center text-yellow-500 mb-6">
          Add New Product
        </Title>

        <Formik
          initialValues={{
            title: "",
            description: "",
            category: categories.length > 0 ? categories[0].toLowerCase() : "",
            prices: {
              small: "",
              medium: "",
              large: "",
            },
            extras: [],
            file: null,
          }}
          validationSchema={productValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form>
              {/* Image Upload */}
              <div className="flex flex-col text-sm mt-6">
                <label className="flex gap-2 items-center">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    className="btn-primary !rounded-none !bg-blue-600 pointer-events-none"
                  >
                    Choose Image
                  </button>
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt="Preview"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                </label>
                {errors.file && touched.file && (
                  <div className="text-red-500 text-sm">{errors.file}</div>
                )}
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-1">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  className="w-full border h-9 text-sm px-2 outline-none rounded-md"
                  placeholder="Enter product title"
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm">{errors.title}</div>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full border min-h-[60px] text-sm p-2 outline-none rounded-md"
                  placeholder="Enter product description"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm">
                    {errors.description}
                  </div>
                )}
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-1">
                  Category
                </label>
                {isLoadingCategories ? (
                  <div className="text-gray-500">Loading categories...</div>
                ) : (
                  <>
                    <Field
                      as="select"
                      name="category"
                      className="w-full border h-9 text-sm px-2 outline-none rounded-md"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </option>
                      ))}
                    </Field>
                    {errors.category && touched.category && (
                      <div className="text-red-500 text-sm">
                        {errors.category}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Prices */}
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-1">
                  Prices
                </label>
                <div className="grid grid-cols-3 gap-2 w-full">
                  {["small", "medium", "large"].map((size) => (
                    <div key={size} className="flex flex-col">
                      <Field
                        type="number"
                        name={`prices.${size}`}
                        min="0"
                        className="w-full border-b border-gray-300 h-8 px-2 text-sm outline-none border-l-0 border-r-0 border-t-0"
                        placeholder={size}
                      />
                      {errors.prices?.[size] && touched.prices?.[size] && (
                        <div className="text-red-500 text-sm">
                          {errors.prices[size]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Extras */}
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-1">
                  Extras
                </label>
                <FieldArray name="extras">
                  {({ push, remove }) => (
                    <>
                      <div className="grid grid-cols-3 gap-2 w-full items-end">
                        <Field
                          type="text"
                          name="extraText"
                          placeholder="Extra name"
                          className="w-full border-b border-gray-300 h-8 px-2 text-sm outline-none border-l-0 border-r-0 border-t-0"
                        />
                        <Field
                          type="number"
                          name="extraPrice"
                          min="0"
                          placeholder="Price"
                          className="w-full border-b border-gray-300 h-8 px-2 text-sm outline-none border-l-0 border-r-0 border-t-0"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const extraText = values.extraText;
                            const extraPrice = values.extraPrice;
                            if (extraText && extraPrice) {
                              push({ text: extraText, price: extraPrice });
                              setFieldValue("extraText", "");
                              setFieldValue("extraPrice", "");
                            }
                          }}
                          className="bg-green-600 hover:bg-green-800 text-white h-8 px-4 mx-3 rounded-full font-medium"
                        >
                          Add
                        </button>
                      </div>

                      <div className="mt-4 flex gap-2 flex-wrap">
                        {values.extras.map((extra, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => remove(index)}
                            className="text-sm border border-red-600 rounded-full p-2 text-gray-500 flex items-center gap-2 hover:bg-red-50 transition-colors"
                          >
                            {extra.text} - ${parseFloat(extra.price).toFixed(2)}
                            <span className="text-red-600">×</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* Submit */}
              <div className="mt-6 mx-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || isLoading ? "Creating..." : "Create"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
