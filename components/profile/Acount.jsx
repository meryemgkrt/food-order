import React from 'react'
import Title from '../ui/Title';
import LoginInput from '../form/LoginInput';
import { useFormik } from 'formik';
import accountSchema from '@/schema/accountSchema';

const Acount = () => {
      const onSubmit = async (values, actions) => {
        console.log("Submitted Values:", values);
        await new Promise((resolve) => setTimeout(resolve, 600));
        actions.resetForm();
      };

      const formik = useFormik({
        initialValues: {
          username: "",
          email: "",
          phone: "",
          adress: "",
          job: "",
          bio: "",
        },
        onSubmit,
        validationSchema: accountSchema, // Doğrulama şeması burada kullanılıyor
      });

      const inputs = [
        {
          id: 1,
          type: "text",
          name: "username",
          placeholder: "Enter your username",
          value: formik.values.username,
          error: formik.touched.username && formik.errors.username,
        },
        {
          id: 2,
          type: "email",
          name: "email",
          placeholder: "Enter your email",
          value: formik.values.email,
          error: formik.touched.email && formik.errors.email,
        },
        {
          id: 3,
          type: "number",
          name: "phone",
          placeholder: "Enter your phone",
          value: formik.values.phone,
          error: formik.touched.phone && formik.errors.phone,
        },
        {
          id: 4,
          type: "text",
          name: "adress",
          placeholder: "Enter your adress",
          value: formik.values.adress,
          error: formik.touched.adress && formik.errors.adress,
        },
        {
          id: 5,
          type: "text",
          name: "job",
          placeholder: "Enter your job",
          value: formik.values.job,
          error: formik.touched.job && formik.errors.job,
        },
        {
          id: 6,
          type: "text",
          name: "bio",
          placeholder: "Enter your bio",
          value: formik.values.bio,
          error: formik.touched.bio && formik.errors.bio,
        },
      ];
   
  return (
    <form className="flex-1" onSubmit={formik.handleSubmit}>
      <div className="p-8">
        <Title className="text-[32px] md:text-[40px] text-primary font-bold font-dancing">
          Account Information
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {inputs.map((input) => (
            <LoginInput
              key={input.id}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={input.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={input.error}
            />
          ))}
        </div>

        {/* Buton */}
        <div className="flex justify-start mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-all w-full md:w-auto"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
}

export default Acount
