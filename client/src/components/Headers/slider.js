import React, { useState, useEffect } from "react";
 import M1 from '../../img/M1.jpg';
 import M2 from '../../img/M2.jpg';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Slider() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex(index + 1);
    if (index === 1) {
      setIndex(0);
    }
  };
  const handlePrev = () => {
    setIndex(index - 1);
    if (index === 0) {
      setIndex(1);
    }
  };

  return (
    <>
      <div
        className="relative -top-50"
      >
       
        <div className="overflow-hidden">
          <div
            className={`${
              index === 0 ? "flex" : "hidden"
            } `}
          >
            <img
              className="h-screen w-full object-cover z-0"
              alt=""
              src={M1}
            />
          </div>
          
          <div
            className={`${
              index === 1 ? "flex" : "hidden"
            }`}
          >
            <img
              className="h-screen w-full object-cover z-0"
              alt=""
              src={M2}
            />
          </div>
        </div>

                     <div className={`${index === 0 ? "flex" : "hidden"}`}>
                 <div className="w-full absolute top-[40%] flex justify-center flex flex-col ">
                     <h1 className="flex font-medium justify-center font-bold text-5xl text-white">RENT A CAR</h1>
                     <h1 className="flex mt-4 font-medium justify-center font-bold text-8xl text-white">Best Rental Cars
                         In</h1>
                     <h1 className="flex mt-4  justify-center font-bold text-8xl text-white">Your
                         Location</h1>
                 </div>
             </div>

             <div className={`${index === 1 ? "flex" : "hidden"}`}>
                 <div className="w-full absolute top-[40%]  justify-center flex flex-col ">
                     <h1 className="flex  justify-center font-bold text-5xl text-white">RENT A CAR</h1>
                     <h1 className="flex mt-4  justify-center font-bold text-8xl text-white">Quality Cars
                         With</h1>
                     <h1 className="flex mt-4 justify-center font-bold text-8xl text-white">Unlimited
                         Miles</h1>
                 </div>
             </div>
             <div className="w-full h-16 absolute top-[70%] flex justify-center">
                 <button className="flex px-14 py-4 text-white text-2xl font-bold bg-orange-400 ">
                     Reserve Now
                 </button>
             </div>

        {/* <div className="w-full absolute sm:top-[20%] md:top-[27.5%] lg:top-[40.5%] xl:top-[44.5%] flex items-start justify-center">
          <button className="flex items-start justify-start px-14 py-2 2xl:px-28 2xl:py-5 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-6xl font-medium bg-yellow-400 ">
            BUY NOW
          </button>
        </div> */}
        <button
          type="button"
          className="sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-12 lg:w-12 xl:h-13 xl:w-13 2xl:w-20 2xl:h-20  bg-[#11111b6d] flex absolute sm:top-20 md:top-36 lg:top-48 xl:top-64 2xl:top-96 2xl:left-16 left-10 z-30 justify-center items-center sm:px-1 md:px-2 lg:px-2.5 xl:px-4 cursor-pointer"
          onClick={handlePrev}
        >
          <IoIosArrowBack className="h-24 w-24 font-normal" />
        </button>
        <button
          type="button"
          className="sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-12 lg:w-12 xl:h-13 xl:w-13 2xl:w-20 2xl:h-20 bg-[#11111b6d] flex absolute sm:top-20 md:top-36 lg:top-48 xl:top-64 2xl:top-96 2xl:right-16 right-10 z-30 justify-center items-center sm:px-1 md:px-2 lg:px-2.5 xl:px-4 cursor-pointer"
          onClick={handleNext}
        >
          <IoIosArrowForward className="h-24 w-24 font-normal" />
        </button>
      </div>
    </>
  );
}

export default Slider;