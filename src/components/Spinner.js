import React from "react";
import { motion } from "framer-motion";
import styles from "./Spinner.module.scss";

const Spinner = ({ message }) => {
	return (
		<motion.section
			className={styles.container}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
		>
			<div className={styles.spinner}>
				<svg
					width="74px"
					height="74px"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 100"
					preserveAspectRatio="xMidYMid"
				>
					<path
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						d="M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40 C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z"
						stroke="#fff"
						strokeWidth="7"
						strokeDasharray="159.08513549804687 97.50379272460938"
					>
						<animate
							attributeName="stroke-dashoffset"
							calcMode="linear"
							values="0;256.58892822265625"
							keyTimes="0;1"
							dur="1"
							begin="0s"
							repeatCount="indefinite"
						/>
					</path>
				</svg>
			</div>
			<p className={styles.message}>{message}</p>
		</motion.section>
	);
};

export default Spinner;
