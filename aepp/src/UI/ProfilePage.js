import React from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import logo from "../assets/logo-small.png";
import styles from "./ProfilePage.module.scss";

const ProfilePage = ({
	userProfile: { profileImg, username, userAddress, about },
}) => {
	// Check for false values
	if (username === "false") username = "";
	if (profileImg === "false") profileImg = "";
	if (about === "false") about = "";
	return (
		<motion.section
			className={styles.container}
			exit={{ opacity: 0 }}
			initial={{ opacity: 0, y: -50 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					delay: 3,
					duration: 5,
				},
			}}
		>
			<figure className={styles.profileImg}>
				<img src={profileImg || logo} alt="" />
			</figure>

			<div className={styles.info}>
				<span>Name</span>
				<p>{username || "Fellow superhero"}</p>

				<span>Address</span>
				<p>{userAddress || ""}</p>

				<span>About</span>
				<p>{about || ""}</p>
			</div>
		</motion.section>
	);
};

const mapStateToProps = (state) => ({
	userProfile: state.userProfile,
});

export default connect(mapStateToProps, null)(ProfilePage);
