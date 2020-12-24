import React, { useState } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import styles from "./FriendRequest.module.scss";
import FrndReqList from "../components/FrndReqList.js";
import AddFriend from "../components/AddFriend.js";
import Spinner from "../components/Spinner.js";

const FriendRequest = ({
	friendRequests,
	friendInstance,
	isFetchingFrndReq,
	dispatch,
}) => {
	const [showModal, setShowModal] = useState(false);

	if (isFetchingFrndReq)
		return <Spinner message="Fetching friend requests..." />;

	return (
		<motion.section
			className={styles.container}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
		>
			{friendRequests.length < 1 ? (
				<h2>Oops! You have no friend request.</h2>
			) : (
				<FrndReqList />
			)}
			{showModal && (
				<AddFriend
					setShowModal={setShowModal}
					friendInstance={friendInstance}
				/>
			)}
			{/* <button
				type="button"
				className={styles.floatBtn}
				onClick={() => setShowModal(true)}
			>
				+
			</button> */}
		</motion.section>
	);
};

const mapStateToProps = (state) => ({
	friendRequests: state.friendRequests,
	friendInstance: state.contractInstances.friendInstance,
	isFetchingFrndReq: state.isFetchingFrndReq,
});

export default connect(mapStateToProps, null)(FriendRequest);
