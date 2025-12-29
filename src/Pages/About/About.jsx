import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const About = () => {
  return (
    <div className='bg-black text-white h-screen flex items-center justify-center flex-col gap-10'>
      <div className='w-320'><Navbar /></div>
    
        <div className='flex flex-col bg-neutral-700 rounded-xl mr-[5%] ml-[5%]'>
            <div className='w-full rounded-t-2xl'>
                <h1 className='flex justify-center font-extrabold text-2xl px-5 py-10'>About Us</h1>
            </div>
            <div className='flex gap-10 rounded-b-2xl'>
                <p className='px-10 py-5 pb-10'>
                    Managing money shouldn’t be confusing or stressful. We believe everyone deserves a simple, clear, and reliable way to understand where their money goes — and that’s exactly why we built this platform.Our expense tracker is designed to help you record, organize, and analyze your expenses effortlessly. Whether it’s daily spending, monthly budgeting, or comparing expenses across different months, our goal is to give you meaningful insights without complexity.We focus on:Simplicity – an intuitive interface that’s easy to useClarity – clear breakdowns of your spending by category and time Control – helping you make better financial decisions with real data This project is built with modern web technologies and secure cloud infrastructure to ensure your data is safe, accurate, and always accessible. We’re constantly learning, improving, and adding features to make personal finance tracking more helpful and user-friendly. This platform is not just about tracking numbers — it’s about helping you build better financial habits over time.
                    Thank you for being part of this journey.
                </p>
        </div>
      </div>
      <div className='w-320'><Footer /></div>
    </div>
  )
}

export default About
