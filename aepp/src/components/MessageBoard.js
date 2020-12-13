import React from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import styles from "./MessageBoard.module.scss";
import { toAe } from "@aeternity/aepp-sdk/es/utils/amount-formatter";

const MessageBoard = ({ messages, userAddress }) => {
	// Empty messages
	if (messages.length < 1)
		return (
			<p style={{ textAlign: "center", color: "#565656", padding: "1rem" }}>
				No messages yet! Starting chatting with your friend.
			</p>
		);

	return (
		<div className={styles.container}>
			{messages.map((message) => {
				if (message.sender === userAddress) {
					return <SentMsg message={message} key={message.time} />;
				}
				return <ReceivedMsg message={message} key={message.time} />;
			})}
		</div>
	);
};

const ReceivedMsg = ({ message: { amount, category, content, time } }) => {
	return (
		<motion.div
			className={styles.receivedMsg}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.2 } }}
		>
			{amount ? (
				<p style={{ fontWeight: "800" }}>{toAe(amount)}AE received</p>
			) : null}
			<p>{content}</p>
			<p className={styles.time}>{parseTime(time)}</p>
		</motion.div>
	);
};

const SentMsg = ({ message: { amount, category, content, time } }) => {
	return (
		<div className={styles.sentMsg}>
			{amount ? (
				<p style={{ fontWeight: "800" }}>{toAe(amount)}AE sent</p>
			) : null}
			<p>{content}</p>
			<p className={styles.time}>{parseTime(time)}</p>
		</div>
	);
};

const parseTime = (time) =>
	new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// const parseFund = amount =>
const mapStateToProps = (state) => ({
	messages: state.messages,
	userAddress: state.userProfile?.userAddress,
});

export default connect(mapStateToProps, null)(MessageBoard);
