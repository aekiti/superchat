import React from "react";
import styles from "./SearchPage.module.scss";
import { motion } from "framer-motion";

const SearchPage = () => {
	const runQuery = (query) => {
		console.log(query);
	};

	return (
		<motion.section
			className={`container ${styles.container}`}
			exit={{ opacity: 0 }}
		>
			<header className={styles.header}>
				<input
					type="search"
					name="query"
					id="query"
					className={styles.input}
					placeholder="Search..."
					onChange={(e) => runQuery(e.target.value)}
				/>
			</header>

			<div></div>
		</motion.section>
	);
};

export default SearchPage;
