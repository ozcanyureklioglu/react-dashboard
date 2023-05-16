import React from "react";
import { motion } from "framer-motion";
const textVariant = {
  offscreen: {
    x: 500,
  },
  onscreen: {
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

function DarkMain() {
  return (
    <>
      <div class="items-center h-screen">
        <motion.div class=" p-4 flex  my-8 ">
          <h1 class=" text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Hi There,
          </h1>
          <h1 class=" text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-violet-600">
            I'm Özcan
          </h1>
        </motion.div>
        <motion.div
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            bounce: 0.5,
            duration: 1.5,
          }}
          class="p-4 flex justify-center items-center my-8"
        >
          <h1 class="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Pata Küte...
          </h1>
        </motion.div>
        <motion.div
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            bounce: 0.5,
            duration: 1.5,
          }}
          class="p-4 flex justify-center items-center my-8"
        >
          <h1 class="text-9xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-white">
            Abe Kaynana...
          </h1>
        </motion.div>
      </div>

      <motion.div
        className="card-container"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        class=" p-4 my-80 "
      >
        <motion.div variants={textVariant}>
          <h1 class="text-9xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-white">
            Salonumuz Klimalıdır.
          </h1>
        </motion.div>
      </motion.div>
    </>
  );
}

export default DarkMain;
