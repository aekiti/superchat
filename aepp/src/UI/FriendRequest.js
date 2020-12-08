import React, { useState } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import styles from "./FriendRequest.module.scss";

const FriendRequest = ({ friendRequests, contractInstances }) => {
	const [showModal, setShowModal] = useState(false);
	const { friendInstance } = contractInstances;

	return (
		<motion.section
			className={styles.container}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
		>
			<h2>Friend Requests</h2>

			{showModal && (
				<AddFriend
					setShowModal={setShowModal}
					friendInstance={friendInstance}
				/>
			)}

			<button
				type="button"
				className={styles.floatBtn}
				onClick={() => setShowModal(true)}
			>
				+
			</button>
		</motion.section>
	);
};

const AddFriend = ({ setShowModal, friendInstance }) => {
	const [friendAddr, setFriendAddr] = useState("");
	const sendFriendRequest = async (e) => {
		e.preventDefault();
		console.log(friendAddr);
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
							placeholder="ak_FfUXsy5X39FYaaWPs3tKBibc4tN1XFoyqDEz9fWybv7j129QR"
							onChange={(e) => setFriendAddr(e.target.value)}
						/>
						<button type="submit">Send request</button>
					</form>
				</div>
			</motion.div>
		</motion.aside>
	);
};

const mapStateToProps = (state) => ({
	friendRequests: state.friendRequests,
	contractInstances: state.contractInstances,
});

export default connect(mapStateToProps, null)(FriendRequest);
