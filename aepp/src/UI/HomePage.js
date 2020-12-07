import React from "react";
import { motion } from "framer-motion";

const HomePage = () => (
	<motion.h1
		exit={{ opacity: 0 }}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1, transition: { duration: 0.5 } }}
	>
		HomePage
	</motion.h1>
);

export default HomePage;
