import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import styles from "./ChatPage.module.scss";
import logo from "../assets/logo/superhero.svg";
import SendFund from "../components/SendFund.js";

const ChatPage = ({ isFetchingFrnds, friends, match, messageInstance }) => {
	const [showModal, setShowModal] = useState(false);
	const [chatMsg, setChatMsg] = useState("");
	const frndProfile = friends.filter(
		(frnd) => frnd.owner === match.params.friendId
	);

	useEffect();

	// Redirect to homepage if app is still loading
	if (isFetchingFrnds) return <Redirect to="/" />;

	// Redirect to homepage is friend profile is not found
	// if (frndProfile.length < 1) return <Redirect to="/" />;

	let profileImg;
	if (frndProfile[0].name === "false") frndProfile[0].name = "";
	if (frndProfile[0].image === "false") {
		profileImg = logo;
	} else {
		profileImg = `https://raendom-backend.z52da5wt.xyz${frndProfile[0].image}`;
	}

	const sendFund = () => {
		setShowModal(!showModal);
	};

	const sendMessage = async (e) => {
		e.preventDefault();
		if (!chatMsg) return;

		console.log("sending message..");
		await messageInstance.methods.send_message(frndProfile[0].owner, chatMsg);
		setChatMsg("");
	};

	return (
		<motion.section
			className={styles.container}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
		>
			<ProfileBoard
				avatar={profileImg}
				username={frndProfile[0].name || "Fellow superhero"}
				address={frndProfile[0].owner}
			/>

			<div className={styles.chatAction}>
				<form
					method="POST"
					autoComplete="off"
					autoFocus={true}
					onSubmit={(e) => sendMessage(e)}
				>
					<button
						type="button"
						className={styles.sendFund}
						title="Send Fund"
						onClick={() => sendFund()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							version="1.0"
							viewBox="0 0 333 333"
							width="35"
							height="35"
							fill="#1c1c24"
						>
							<defs />
							<path d="M121.7 63.8C101 84.5 94 92.1 94 93.9c0 1.8 12.9 15.2 54 56.2 30.9 30.9 54.7 53.9 55.7 53.9 2.3 0 34.7-32.3 33.6-33.5-.4-.4-.3-.5.3-.2s6.3-4.7 12.8-11.2c8.7-8.8 11.5-12.3 11-13.5-.5-1.2-1.4-1.6-2.8-1.2-1.1.3-2.5.6-2.9.6-.5 0-.6.4-.3.8.3.5-11.2 12.5-25.4 26.7l-26 26-9.1-9c-5-5-11.4-11.4-14.2-14.3-2.9-3.1-5.6-5.1-6.4-4.7-.9.3-1.1 0-.7-.6.4-.7-15.2-17-37-38.8L99 93.5l26-26 26-26 34 34c33 33 34 33.9 34 30.5 0-3.3-2.2-5.8-33.3-36.8C167.5 51 151.8 36 151 36c-.8 0-14 12.5-29.3 27.8z" />
							<path d="M127.9 70.7l-13.6 13.8 1.3 3.5c1.7 4.7 1.7 7.4-.1 11.5l-1.4 3.5 40 40.1 40 40.1 2.9-1.2c2.8-1.2 10.4-.9 14.6.4 1.8.6 4.3-1.4 15.3-12.3 7.2-7.2 13.1-13.7 13.1-14.5 0-.7-.5-2.8-1.1-4.5l-1.2-3.3-6.1.7c-3.3.4-6.3.9-6.5 1.1-.3.2.8 1.7 2.4 3.4 1.7 1.7 2.5 3.5 2.2 4.4-.9 2.4-1.9 2-6.2-2.4-3-3.1-4.7-4-7.2-4-1.8 0-3.3.3-3.3.7 0 .4 2.3 3.1 5.1 5.9 4.7 4.8 5.6 7.4 2.6 7.4-.7 0-3.9-2.7-7.2-6-3.3-3.4-6.8-6-8-6-3.1-.1-9.7-3.4-12.3-6.3-2.3-2.4-2.6-2.5-5.8-1.1-4.4 1.8-12.9 1.8-18.6-.2-10.7-3.6-18.2-14.5-18.2-26.3.1-8 1.9-12.5 7.4-18.5 8.4-9.1 20.4-11.6 31.8-6.6 8.4 3.6 16.2 14.4 16.2 22.2 0 1 .6 1.8 1.4 1.8 2.5 0 11.6-2.3 11.6-2.9 0-.3-13-13.6-28.9-29.5l-28.9-28.8-3.7 1.2c-3.6 1.2-11.3 1-14.5-.4-1-.4-5.7 3.6-15.1 13.1zm22.5 5.2c7.2 7.2 8.7 10.1 5.3 10.1-2 0-17-15.7-16.3-16.9 1.4-2.2 3.2-1 11 6.8zm-7 7c7.2 7.2 8.7 10.1 5.3 10.1-2 0-17-15.7-16.3-16.9 1.4-2.2 3.2-1 11 6.8zm-7 7c7.2 7.2 8.7 10.1 5.3 10.1-2 0-17-15.7-16.3-16.9 1.4-2.2 3.2-1 11 6.8zm72 72c7.2 7.2 8.7 10.1 5.3 10.1-2 0-17-15.7-16.3-16.9 1.4-2.2 3.2-1 11 6.8zm19.4 1.6c-.3.3-.9-.2-1.2-1.2-.6-1.4-.5-1.5.5-.6.7.7 1 1.5.7 1.8zm-46.4-.7c.2.4-.4.8-1.4.8-1 0-1.6-.4-1.4-.8.3-.4.9-.8 1.4-.8.5 0 1.1.4 1.4.8z" />
							<path d="M210.6 79.3l-3.9 1.2 9.1 8.6 9.2 8.5v11.7c0 6.4-.2 11.7-.4 11.7-2.6 0-23.4 5.5-25.1 6.6-2.9 1.9-4.8 7.2-3.9 10.8.8 3.5 5.9 7.6 9.3 7.6 1.6 0 14-1.8 27.7-4 14.1-2.3 28.4-4 33-4 4.9 0 8.5-.5 9.2-1.2 1.3-1.3 1.8-36.1.6-39.2-.5-1.2-2-1.6-5.8-1.6-4 0-10-1.9-28.6-9-12.9-4.9-24.2-9-25-8.9-.8 0-3.3.6-5.4 1.2zM284 91.9c-1.5 2.9-1.4 55.3.2 56.9 1.7 1.7 29.9 1.7 31.6 0 1.6-1.6 1.7-54 .2-56.9-1-1.7-2.3-1.9-16-1.9s-15 .2-16 1.9z" />
							<path d="M167.2 97.6c-8.5 4.2-13.2 12.1-13.2 21.9 0 6.6 1.6 10.8 6 15.9 5 5.7 10.3 8 18 8 7.4-.1 12.2-1.6 11.4-3.7-.4-1.2-1.1-1.2-4.2-.1-7.2 2.6-14.6 1.2-20.8-3.9-15.1-12.5-5.8-37.7 13.8-37.7 10.4 0 19.9 7.8 21.4 17.5.8 5.4 3 5.5 2.7.2-.5-7.4-7.2-16.1-14.9-19.3-5.5-2.3-14.2-1.8-20.2 1.2z" />
							<path d="M180.3 106.1c-1.2.4-2.9 1.9-3.8 3.3-1.4 2.1-1.5 3.1-.5 6.1 1.1 3.2.9 3.8-1.2 6-3.2 3.5-4 3.1-3.6-1.6.4-5-1.4-6.1-3.8-2.4-1.5 2.3-1.5 3.1-.4 6.5 1.2 3.6 1.1 4.2-.5 6-2.5 2.8-1 3.8 1.8 1.2 1.6-1.5 2.7-1.8 3.7-1.2.8.5 3 1 4.8 1 5.8 0 9-5.8 6.1-11.2-.9-1.7-.6-2.5 2.1-5.2l3.2-3.1-.6 3.7c-.7 4 .6 5.7 2.9 3.8 1.8-1.5 2-6.1.3-7.8-.8-.8-.8-1.5.2-2.7 1.5-1.8.5-3.4-1.1-1.8-.8.8-2 .7-4.3-.2-1.9-.8-3.9-1-5.3-.4zm4.2 4c.7 1.1-2.2 4.9-3.7 4.9-1.2 0-1-3.4.4-4.8 1.5-1.5 2.5-1.5 3.3-.1zm-5.5 15.5c-.7.7-2.4 1.4-3.8 1.4h-2.6l2.9-3c2.5-2.6 3-2.8 3.8-1.5.5 1 .4 2.1-.3 3.1zM26 164.9c-3.6.3-7.1 1-7.7 1.4-1.7 1.1-1.9 81.8-.3 84.8 1 1.8 2.3 1.9 21.5 1.9s20.5-.1 21.5-1.9c.6-1.3 1-16.4 1-43.1l-.1-41-2.2-1.4c-2.4-1.4-21.4-1.8-33.7-.7zm-4.6 1.9c.3.5-.1.9-.9.9s-1.2-.4-.9-.9c.3-.4.7-.8.9-.8.2 0 .6.4.9.8zM70 204.4v27.3l9.3.6c5.1.3 10.9 1.2 12.9 2s12.9 7.8 24.2 15.6c11.3 7.7 22 14.8 23.7 15.7 5.3 2.7 12.5 2.8 23.9.4 5.8-1.2 27.5-5.7 48.3-10 20.7-4.3 38.8-8.5 40.2-9.4 1.3-.9 2.9-3.3 3.6-5.5.9-3.2.9-4.4-.6-7.4-2.8-6-4.4-6.3-42.5-8.2-54.8-2.7-54.5-2.7-54.5-5 0-1.9.5-2 13.1-1.6 12.3.3 13.3.2 15.3-1.8 4.4-4.4 1.8-9.8-6.9-14.5-4.5-2.4-6.9-3-17.3-3.7-6.7-.5-14.4-1.4-17.2-2.1-5.8-1.3-15.4-5.2-20.5-8.4-13.9-8.5-24.4-11.4-42.2-11.4H70v27.4z" />
						</svg>
					</button>

					<input
						type="text"
						name="new-message"
						id="new-message"
						className={styles.msgInput}
						placeholder="Type a message"
						onChange={(e) => setChatMsg(e)}
					/>

					<button
						type="submit"
						className={styles.sendMessage}
						title="Send Message"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<path
								fill="currentColor"
								d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
							></path>
						</svg>
					</button>
				</form>
			</div>

			{showModal && (
				<SendFund
					setShowModal={setShowModal}
					receiver={frndProfile[0].owner}
					messageInstance={messageInstance}
				/>
			)}
		</motion.section>
	);
};

const ProfileBoard = ({ avatar, username, address }) => {
	return (
		<section className={styles.profileBoard}>
			<figure className={styles.avatar}>
				<img src={avatar} alt={username} />
			</figure>

			<aside className={styles.textArea}>
				<h4 className={styles.username}>{username || "Fellow superhero"}</h4>
				<p className={styles.about}>{address}</p>
			</aside>
		</section>
	);
};

/*const ReceivedMsg = ({ text, time }) => {
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
};*/

const mapStateToProps = (state) => ({
	friends: state.friends,
	isFetchingFrnds: state.isFetchingFrnds,
	messageInstance: state.contractInstances.messageInstance,
});
export default connect(mapStateToProps, null)(ChatPage);
