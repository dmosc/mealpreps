import { motion } from 'framer-motion';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="p-12 flex flex-col gap-3 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center items-center text-s">
          You're odering from
        </p>
        <p className="flex flex-row justify-center items-center font-bold text-2xl">
          mealpreps
        </p>
        <p className="mb-12 flex flex-row justify-center items-center text-xs italic">
          Homemade, low-calorie meals from around the world, right at your
          doorstep.
        </p>
        <p className="mb-5 flex flex-row justify-center items-center text-s">
          I'm a smart agent ready to help you place an order. I can answer any
          question about the menu, make modifications, keep track of your order
          and help you process final details like delivery instructions and
          payment.
        </p>
        <p className="flex flex-row justify-center items-center text-s">
          Would you like me to suggest some recent popular options or do you
          have something in mind?
        </p>
      </div>
    </motion.div>
  );
};
