import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import footerSchema from "@/schema/footerSchema";
import LoginInput from "../form/LoginInput";
import Title from "../../components/ui/Title";

const Footer = () => {
  const [linkAddress, setLinkAddress] = useState("");
  const [iconName, setIconName] = useState("");
  const [icons, setIcons] = useState([]);

  // Formik configuration
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        location: "",
        email: "",
        phoneNumber: "",
        desc: "",
        day: "",
        time: "",
      },
      onSubmit: async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        console.log("Form Data", values);
        actions.resetForm();
      },
      validationSchema: footerSchema,
    });

  // Inputs for the form
  const inputs = [
    {
      id: 1,
      name: "location",
      type: "text",
      placeholder: "Your Location",
      value: values.location,
      onChange: handleChange,
      error: errors.location,
      touched: touched.location,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Your Email",
      value: values.email,
      onChange: handleChange,
      error: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "text",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      onChange: handleChange,
      error: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 4,
      name: "desc",
      type: "text",
      placeholder: "Your Description",
      value: values.desc,
      onChange: handleChange,
      error: errors.desc,
      touched: touched.desc,
    },
    {
      id: 5,
      name: "day",
      type: "text",
      placeholder: "Update Day",
      value: values.day,
      onChange: handleChange,
      error: errors.day,
      touched: touched.day,
    },
    {
      id: 6,
      name: "time",
      type: "text",
      placeholder: "Update Time",
      value: values.time,
      onChange: handleChange,
      error: errors.time,
      touched: touched.time,
    },
  ];

  // Add icon function
  const addIcon = () => {
    if (!linkAddress || !iconName) {
      alert("Please fill in both fields.");
      return;
    }

    const newIcon = {
      id: Date.now(), // Use a timestamp as a unique key
      link: linkAddress,
      name: iconName,
    };

    setIcons((prevIcons) => [...prevIcons, newIcon]);
    setLinkAddress("");
    setIconName("");
  };

  // Remove icon function
  const removeIcon = (id) => {
    setIcons((prevIcons) => prevIcons.filter((icon) => icon.id !== id));
  };

  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-3" onSubmit={handleSubmit}>
      <Title className="text-[40px] font-dancing text-center text-primary">
        Footer Settings
      </Title>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {inputs.map((input) => (
          <LoginInput key={input.id} {...input} onBlur={handleBlur} />
        ))}
      </div>

      <div className="mt-4 flex justify-between gap-4">
        <LoginInput
          placeholder="Link Address"
          value={linkAddress}
          onChange={(e) => setLinkAddress(e.target.value)}
        />
        <LoginInput
          placeholder="Icon Class (e.g., fa fa-facebook)"
          value={iconName}
          onChange={(e) => setIconName(e.target.value)}
        />
        <button className="btn-primary" type="button" onClick={addIcon}>
          Add
        </button>
      </div>

      <ul className="flex flex-wrap gap-6 mt-4">
        {icons.map(({ id, link, name }) => (
          <li key={id} className="flex items-center gap-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <i className={name}></i> {/* Render Font Awesome icon */}
            </a>
            <button
              type="button"
              className="text-danger"
              onClick={() => removeIcon(id)}
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>

      <button type="submit" className="btn-primary mt-4 mb-2">
        Update
      </button>
    </form>
  );
};

export default Footer;
