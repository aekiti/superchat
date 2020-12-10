import React from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { setFetchingUsers } from "../actions/actionCreator.js";
import styles from "./SuperchatUsersList.module.scss";

const SuperchatUsersList = ({ users, friendInstance, friends, dispatch }) => {
	const runQuery = (query) => {
		console.log(query);
	};

	return (
		<motion.section className={styles.container}>
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
			{users.map((user) => (
				<ProfilePanel
					key={user[0]}
					profile={user[1]}
					friendInstance={friendInstance}
					dispatch={dispatch}
				/>
			))}
		</motion.section>
	);
};

const ProfilePanel = ({ profile, friendInstance, dispatch }) => {
	if (profile.name === "false") profile.name = "";
	const imgLink = `https://raendom-backend.z52da5wt.xyz${profile.image}`;

	const sendRequest = async () => {
		// show spinner
		dispatch(setFetchingUsers());
		// accept friend request
		await friendInstance.methods.send_friend_request(profile.owner);
		// hide spinner
		dispatch(setFetchingUsers());
	};

	// about, image, name, owner
	return (
		<section className={styles.profileBody}>
			<figure className={styles.avatar}>
				<img alt={profile.name || "Fellow superhero"} src={imgLink} />
			</figure>

			<h4 className={styles.username}>{profile.name || "Fellow superhero"}</h4>
			{/* <p>{profile.owner}</p> */}

			<aside className={styles.btnBody}>
				<button
					className={`${styles.btn} ${styles.btnSecondary}`}
					onClick={() => sendRequest()}
				>
					Send Request
				</button>
			</aside>
		</section>
	);
};

const mapStateToProps = (state) => ({
	users: state.users,
	friendInstance: state.contractInstances.friendInstance,
	friends: state.friends,
});
export default connect(mapStateToProps, null)(SuperchatUsersList);
