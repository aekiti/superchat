import React from "react";
import { motion } from "framer-motion";
import { setFetchingUsers } from "../actions/actionCreator.js";
import styles from "./SearchResult.module.scss";
import logo from "../assets/logo/superhero.svg";

const SearchResult = ({ query, filteredUser, friendInstance, dispatch }) => {
	let SearchResults = filteredUser.filter(
		(user) => user[0].includes(query) || user[1].name.includes(query)
	);

	return (
		<motion.section
			className={styles.container}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.2 } }}
		>
			<h2>{SearchResults.length} Search result{(SearchResults.length > 1) ? 's' : ''}</h2>
			{SearchResults.length < 1 && <p>No results found!</p>}
			{SearchResults.map((user) => (
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
	let imgLink;
	if (profile.name === "false") profile.name = "";
	if (profile.image === "false") {
		imgLink = logo;
	} else {
		imgLink = `https://raendom-backend.z52da5wt.xyz${profile.image}`;
	}

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

			<div className={styles.textArea}>
				<h4 className={styles.username}>
					{profile.name || "Fellow superhero"}
				</h4>
				<p className={styles.about}>{profile.owner}</p>
			</div>

			<aside className={styles.btnBody}>
				<button className={styles.roundBtn} onClick={() => sendRequest()}>
					+
				</button>
			</aside>
		</section>
	);
};

export default SearchResult;
