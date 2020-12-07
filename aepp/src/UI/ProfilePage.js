import React from "react";
import { connect } from "react-redux";
import logo from "../assets/logo-small.png";
import styles from "./ProfilePage.module.scss";

const ProfilePage = ({
	userProfile: { profileImg, username, userAddress, about },
}) => {
	return (
		<section className={styles.container}>
			<figure className={styles.profileImg}>
				<img src={profileImg || logo} alt="" />
			</figure>

			<div className={styles.info}>
				<span>Name</span>
				<p>{username || "Fellow Hero"}</p>

				<span>Address</span>
				<p>{userAddress || ""}</p>

				<span>About</span>
				<p>{about || ""}</p>
			</div>
		</section>
	);
};

const mapStateToProps = (state) => ({
	userProfile: state.userProfile,
});

export default connect(mapStateToProps, null)(ProfilePage);
