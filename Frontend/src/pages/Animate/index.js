import React from "react";
import { motion } from "framer-motion";

const cardVariantsLeft = {
  offscreen: {
    y: -300,
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};
const cardVariantsRight = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};
function Animate() {
  return (
    <>
      <motion.div class="p-2 xl:p-6">
        <div class="p-4 border-gray-200  rounded-lg dark:border-gray-700">
          <div class="grid grid-cols-5 gap-4 mb-4">
            <div class="border-4 border-dashed"></div>
            <div class="col-span-4">
              <div class="grid grid-cols-3 gap-4 mb-4">
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
              </div>
              <motion.div
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                transition={{
                  type: "spring",
                  bounce: 0.5,
                  duration: 0.9,
                }}
                class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800"
              >
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </motion.div>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">*</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
              </div>
              <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
              </div>
              <motion.div
                className="card-container"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
                class="grid grid-cols-2 gap-4"
              >
                <motion.div
                  variants={cardVariantsLeft}
                  class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800"
                >
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </motion.div>
                <motion.div
                  variants={cardVariantsRight}
                  class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800"
                >
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </motion.div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                  <p class="text-2xl text-gray-400 dark:text-gray-500">+</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Animate;
