import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "./index.css";

import image1 from "./assets/images/birthday1.jpg";
import image2 from "./assets/images/birthday2.jpg";
import image3 from "./assets/images/birthday3.jpg";
import image4 from "./assets/images/birthday4.jpg";
import image5 from "./assets/images/birthday5.jpg";

gsap.registerPlugin(ScrollTrigger);

const images = [image1, image2, image3, image4, image5];

const quotes = [
  "Count your life by smiles, not tears. Count your age by friends, not years.",
  "Wishing you a day filled with love, laughter, and all the things you enjoy most!",
  "May your birthday be as wonderful and incredible as you are!",
  "The more you praise and celebrate your life, the more there is in life to celebrate.",
  "Age is merely the number of years the world has been enjoying you. Happy Birthday!",
];

export default function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const headingRef = useRef(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    gsap.to(".balloon", {
      y: -window.innerHeight,
      duration: 6,
      repeat: -1,
      ease: "linear",
      stagger: 2,
    });

    return () => {
      clearInterval(imageInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 to-purple-600 text-white text-center p-5 w-full overflow-hidden relative">
      {/* Confetti Effect */}
      <Confetti width={width} height={height} numberOfPieces={100} />

      {/* Flying Balloons (Using Emojis 🎈) */}
      <motion.div
        className="balloon left-10"
        animate={{ y: [-100, -height] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        🎈
      </motion.div>
      <motion.div
        className="balloon right-10"
        animate={{ y: [-100, -height] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
      >
        🎈
      </motion.div>

      <h1 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 animate-pulse">
        🎉 Happy Birthday! 🎂
      </h1>

      {/* Image Slideshow */}
      <div className="relative w-full max-w-lg rounded-xl shadow-2xl overflow-hidden mb-5">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            style={{ width: "20rem", height: "20rem" }}
            alt="Birthday Slideshow"
            className="w-40 h-40 object-cover rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      </div>

      {/* Floating Cake (Using Emoji 🎂) */}
      <motion.div
        className="text-7xl mb-5"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        🎂
      </motion.div>

      {/* Quotes */}
      <motion.p
        key={currentQuote}
        className="text-lg md:text-xl lg:text-2xl font-semibold italic max-w-lg p-3 bg-white bg-opacity-20 rounded-xl shadow-lg backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        "{quotes[currentQuote]}"
      </motion.p>
    </div>
  );
}
