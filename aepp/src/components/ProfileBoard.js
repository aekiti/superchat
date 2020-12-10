import React from "react";
import styles from "./ProfileBoard.module.scss";

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

export default ProfileBoard;
