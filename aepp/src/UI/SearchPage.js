import React from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import styles from "./SearchPage.module.scss";
import Spinner from "../components/Spinner.js";
import SuperchatUsersList from "../components/SuperchatUsersList.js";

const SearchPage = ({ users, isFetchingUsers, dispatch, }) => {

  if (isFetchingUsers) return <Spinner message="Loading superchat users..." />;
  
	return (
		<motion.section
			className={styles.container}
			exit={{ opacity: 0 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
		>
      {users.length < 1 ? (
				<h2>Oops! You have have to register first.</h2>
			) : (
        <SuperchatUsersList />
			)}
		</motion.section>
	);
};

const mapStateToProps = (state) => ({
  users: state.users,
	isFetchingUsers: state.isFetchingUsers,
});
export default connect(mapStateToProps, null)(SearchPage);
