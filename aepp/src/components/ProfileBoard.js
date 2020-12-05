import React from "react";
import styles from "./ProfileBoard.module.scss";

const ProfileBoard = ({ avatar, username, lastMessage }) => {
	return (
		<section className={styles.body}>
			<figure className={styles.avatar}>
				<img src={avatar} alt="" />
			</figure>

			<aside className={styles.textArea}>
				<h4 className={styles.username}>{username}</h4>
				{lastMessage && <p className={styles.lastMessage}>{lastMessage}</p>}
			</aside>
		</section>
	);
};

export default ProfileBoard;
