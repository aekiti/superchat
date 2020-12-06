import React from "react";
import { connect } from "react-redux";
import logo from "../assets/logo-small.png";
import styles from "./ProfilePage.module.scss";

const ProfilePage = ({ profileImg, username, address, about }) => {
	return (
		<section className={styles.container}>
			<figure className={styles.profileImg}>
				<img src={logo} alt="" />
			</figure>

			<div className={styles.info}>
				<span>Name</span>
				<p>Yinka</p>

				<span>Address</span>
				<p>ak_23</p>

				<span>About</span>
				<p>Cool guy</p>
			</div>
		</section>
	);
};

export default ProfilePage;

// const mapStateToProps = (state) => ({ userProfile: state.userProfile });

// export default connect(mapStateToProps, null)(ProfilePage);*/
