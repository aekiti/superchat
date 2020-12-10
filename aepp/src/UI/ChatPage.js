import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import styles from "./ChatPage.module.scss";
import logo from "../assets/logo/superhero.svg";

const ChatPage = ({ isFetchingFrnds }) => {
	// Redirect to homepage if app is still loading
	if (isFetchingFrnds) return <Redirect to="/" />;
	// Profile Board (w/ send fund)
	// Received Msg
	// Sent Msg
	// Input Area
	return (
		<motion.section
			className={styles.container}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
		>
			<ProfileBoard avatar={logo} username="Fellow superhero" />

			<div style={{ padding: "1rem" }}>
				<SentMsg text="Hi" time="4:31 PM" />
				<ReceivedMsg text="Hey" time="4:32 PM" />
				<SentMsg
					text="Good evening. How're you today? Hope you're doing okay?"
					time="4:33 PM"
				/>
			</div>

			<input
				type="text"
				name="new-message"
				id="new-message"
				className={styles.msgInput}
				placeholder="Type a message"
			/>
		</motion.section>
	);
};

const ProfileBoard = ({ avatar, username }) => {
	return (
		<section className={styles.profileBoard}>
			<figure className={styles.avatar}>
				<img src={avatar} alt="" />
			</figure>

			<h4 className={styles.username}>{username}</h4>
		</section>
	);
};

const ReceivedMsg = ({ text, time }) => {
	return (
		<div className={styles.receivedMsg}>
			<p>{text}</p>
			<p className={styles.time}>{time}</p>
		</div>
	);
};

const SentMsg = ({ text, time }) => {
	return (
		<div className={styles.sentMsg}>
			<p>{text}</p>
			<p className={styles.time}>{time}</p>
		</div>
	);
};

const mapStateToProps = (state) => ({
	friends: state.friends,
	isFetchingFrnds: state.isFetchingFrnds,
});
export default connect(mapStateToProps, null)(ChatPage);
