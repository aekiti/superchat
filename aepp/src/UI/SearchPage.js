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
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					duration: 0.5,
				},
			}}
		>
			<header className={styles.header}>
				<input
					type="search"
					name="query"
					id="query"
					className={styles.input}
					placeholder="Search... [username or address]"
					onChange={(e) => runQuery(e.target.value)}
				/>
			</header>

			<div></div>
		</motion.section>
	);
};

export default SearchPage;
