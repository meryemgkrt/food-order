import Image from 'next/image';
import React from 'react';
import Title from './ui/Title';

const About = () => {
  return (
    <div className="bg-secondary py-14">
      <div className="container mx-auto flex flex-wrap-reverse md:flex-row justify-center items-center gap-14">
        {/* Görsel Alanı */}
        <div className="relative sm:w-[445px] w-[350px] h-[500px] sm:h-[600px] mx-auto md:mx-0">
          <Image
            src="/image/about-img.png"
            alt="About Image"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>

        {/* Yazı ve Buton Alanı */}
        <div className="md:w-1/2 w-full text-white">
         
         .
          <Title className="text-center  font-dancing text-4xl font-bold text-primary mb-8">
            We Are Feane
          </Title>
          <p className="text-center md:text-left text-white text-sm md:text-base leading-relaxed">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All
          </p>
          <div className="mt-5 flex items-center justify-center md:justify-start">
            <button className="bg-primary text-white px-9 py-2 rounded-full hover:opacity-90 transition">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
