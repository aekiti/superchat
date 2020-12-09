import React from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner.js";

const HomePage = ({ friends, isFetchingMessages }) => {
	if (isFetchingMessages) return <Spinner message="Loading messages..." />;

	return (
		<motion.section
			exit={{ opacity: 0 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
		>
			<h1>Hello world</h1>
		</motion.section>
	);
};

const mapStateToProps = (state) => ({
	friends: state.friends,
	isFetchingMessages: state.isFetchingMessages,
});

export default connect(mapStateToProps, null)(HomePage);
