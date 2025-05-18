import axios from "axios";
import About from "@/components/About";
import Campaigns from "@/components/Campaigns";
import Caroucel from "@/components/Caroucel";
import Customer from "@/components/customer/Customer";
import Footer from "@/components/layout/Footer";
import MenuWrapper from "@/components/product/MenuWrapper";
import Reservation from "@/components/Reservation";
import React from "react";

const Index = ({ categoryList = [], productList = [] }) => {
  return (
    <div className="scrollbar-custom">
      <Caroucel />
      <Campaigns />
      <MenuWrapper categoryList={categoryList} productList={productList} />
      <About />
      <Reservation />
      <Customer />
      <Footer /> {/* Footer'ı ekledim */}
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const [categoryResponse, productResponse] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`),
    ]);

    return {
      props: {
        categoryList: categoryResponse.data || [],
        productList: productResponse.data || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        categoryList: [],
        productList: [],
      },
    };
  }
};

export default Index;
