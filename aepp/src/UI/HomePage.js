import React from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import styles from "./HomePage.module.scss";
import Spinner from "../components/Spinner.js";

const HomePage = ({ friends, isFetchingFrnds }) => {
	if (isFetchingFrnds) return <Spinner message="Loading friends..." />;

	return (
		<motion.section
			className={styles.container}
			exit={{ opacity: 0 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
		>
			{friends.map((frnd) => (
				<ProfileBoard profile={frnd} key={frnd.owner} className="red" />
			))}
		</motion.section>
	);
};

const ProfileBoard = ({ profile }) => {
	let { image, name, owner, about } = profile;
	image = "https://raendom-backend.z52da5wt.xyz" + image;
	return (
		<section className={styles.body}>
			<figure className={styles.avatar}>
				<img src={image} alt="{name}" />
			</figure>

			<aside className={styles.textArea}>
				<h4 className={styles.username}>{name}</h4>
				<p className={styles.about}>{about}</p>
			</aside>
		</section>
	);
};

const mapStateToProps = (state) => ({
	friends: state.friends,
	isFetchingFrnds: state.isFetchingFrnds,
});

export default connect(mapStateToProps, null)(HomePage);
