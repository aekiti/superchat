import React from "react";
import logo from "../assets/logo-small.png";
import styles from "./MessageHeader.module.scss";

const MessageHeader = () => {
	return (
		<section className={styles.header}>
			{/* Avatar*/}
			<figure className={styles.avatar}>
				<img src={logo} alt="" />
			</figure>

			<h4 className={styles.username}>YinkaEnoch</h4>
		</section>
	);
};

export default MessageHeader;
