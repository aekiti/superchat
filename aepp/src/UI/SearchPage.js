import React from "react";
import styles from "./SearchPage.module.scss";

const SearchPage = () => {
	const runQuery = (query) => {
		console.log(query);
	};

	return (
		<section className={`container ${styles.container}`}>
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
		</section>
	);
};

export default SearchPage;
