import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import styles from "./HomePage.module.scss";
import Spinner from "../components/Spinner.js";

const HomePage = ({ friends, isFetchingFrnds }) => {
	if (isFetchingFrnds) return <Spinner message="Loading friends..." />;

	if (friends.length < 1)
		return <h2>You currently have no one to chat with. :(</h2>;

	return (
		<motion.section
			className={styles.container}
			exit={{ opacity: 0 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
		>
			<h2 style={{ marginBottom: "1rem" }}>Your friends</h2>
			{friends.map((frnd) => (
				<ProfileBoard profile={frnd} key={frnd.owner} />
			))}
		</motion.section>
	);
};

const ProfileBoard = ({ profile }) => {
	let { image, name, owner, about } = profile;
	if (name === "false") name = "";
	return (
		<Link to={`/chat/${owner}`} className={styles.link}>
			<section className={styles.body}>
				<figure className={styles.avatar}>
					<img
						src={`https://raendom-backend.z52da5wt.xyz${image}`}
						alt={name || "Fellow superhero"}
					/>
				</figure>

				<aside className={styles.textArea}>
					<h4 className={styles.username}>{name || "Fellow superhero"}</h4>
					<p className={styles.about}>{about}</p>
				</aside>
			</section>
		</Link>
	);
};

const mapStateToProps = (state) => ({
	friends: state.friends,
	isFetchingFrnds: state.isFetchingFrnds,
});

export default connect(mapStateToProps, null)(HomePage);
