import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
     
      <Navbar />

      <div className="flex justify-center px-4 sm:px-6 lg:px-10 mt-6 flex-1">
        <div className="bg-neutral-700 rounded-xl w-full">

          <h1 className="text-center font-extrabold text-xl sm:text-2xl py-8">
            About Us
          </h1>

          <p className="px-6 sm:px-10 pb-10 leading-relaxed text-sm sm:text-base">
            Managing money shouldn’t be confusing or stressful. We believe
            everyone deserves a simple, clear, and reliable way to understand
            where their money goes and that’s exactly why we built this
            platform.
            <br />
            Our expense tracker is designed to help you record, organize, and
            analyze your expenses effortlessly. Whether it’s daily spending,
            monthly budgeting, or comparing expenses across different months,
            our goal is to give you meaningful insights without complexity.
            <br />
            <strong>Simplicity</strong> – an intuitive interface that’s easy to use  
            <br />
            <strong>Clarity</strong> – clear breakdowns of your spending by category and time  
            <br />
            <strong>Control</strong> – helping you make better financial decisions with real data
            <br />
            This project is built with modern web technologies and secure cloud
            infrastructure to ensure your data is safe, accurate, and always
            accessible. We’re constantly learning, improving, and adding
            features to make personal finance tracking more helpful and
            user-friendly.
            <br />
            This platform is not just about tracking numbers. It’s about
            helping you build better financial habits over time.
            <br />
            Thank you for being part of this journey.
          </p>
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default About;
