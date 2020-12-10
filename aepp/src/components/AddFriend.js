import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./AddFriend.module.scss";

const AddFriend = ({ setShowModal, friendInstance }) => {
	const [friendAddr, setFriendAddr] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const sendFriendRequest = async (e) => {
		e.preventDefault();
		console.log(friendAddr);

		if (!friendAddr) {
			setErrorMsg("Enter a valid address");
			return false;
		}
		let k = (await friendInstance.methods.send_friend_request(friendAddr))
			.decodeResult;

		console.log(k);
	};

	return (
		<motion.aside
			className={styles.modalOverlay}
			exit={{ opacity: 0 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.2 } }}
		>
			<motion.div
				className={styles.modal}
				initial={{ opacity: 0, x: -40 }}
				animate={{ opacity: 1, x: 0, transition: { duration: 0.4 } }}
			>
				<header className={styles.header}>
					<h4>Send New Friend Request</h4>
					<p onClick={() => setShowModal(false)}>&#10005;</p>
				</header>
				<div className={styles.body}>
					<form
						method="POST"
						autoComplete="off"
						onSubmit={(e) => sendFriendRequest(e)}
					>
						<label htmlFor="address">Address</label>
						<input
							type="text"
							name="address"
							id="address"
							placeholder="Starts with ak_"
							onChange={(e) => setFriendAddr(e.target.value)}
						/>
						<p style={{ color: "#ff0000" }}>{errorMsg}</p>
						<button type="submit">Send request</button>
					</form>
				</div>
			</motion.div>
		</motion.aside>
	);
};

export default AddFriend;
