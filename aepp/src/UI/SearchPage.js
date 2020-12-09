import React from "react";
import { connect } from "react-redux";
import styles from "./SearchPage.module.scss";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner.js";

const SearchPage = ({ friendRequests, friends, isFetchingMessages }) => {
	const runQuery = (query) => {
		console.log(query);
	};

	if (isFetchingMessages) return <Spinner message="Loading friends..." />;

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
					autoComplete="off"
					autoFocus={true}
				/>
			</header>

			<div></div>
		</motion.section>
	);
};

const mapStateToProps = (state) => ({
	friendRequests: state.friendRequests,
	friends: state.friends,
	isFetchingMessages: state.isFetchingMessages,
});
export default connect(mapStateToProps, null)(SearchPage);
