import * as Yup from "yup";

const productValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title must be at most 50 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(200, "Description must be at most 200 characters"),
  category: Yup.string().required("Category is required"),
  prices: Yup.object().shape({
    small: Yup.number()
      .required("Small price is required")
      .min(0, "Price cannot be negative")
      .typeError("Price must be a number"),
    medium: Yup.number()
      .required("Medium price is required")
      .min(0, "Price cannot be negative")
      .typeError("Price must be a number"),
    large: Yup.number()
      .required("Large price is required")
      .min(0, "Price cannot be negative")
      .typeError("Price must be a number"),
  }),
  extras: Yup.array().of(
    Yup.object().shape({
      text: Yup.string()
        .required("Extra name is required")
        .max(20, "Extra name must be at most 20 characters"),
      price: Yup.number()
        .required("Extra price is required")
        .min(0, "Price cannot be negative")
        .typeError("Price must be a number"),
    })
  ),
});

export default productValidationSchema;
