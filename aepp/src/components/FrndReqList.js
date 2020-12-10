import React from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { setFetchingFrndReq } from "../actions/actionCreator.js";
import getFriendRequest from "../utils/getFriendRequest.js";
import styles from "./FrndReqList.module.scss";
import logo from "../assets/logo/superhero.svg";

const FrndReqList = ({ friendRequests, friendInstance, dispatch }) => {
	return (
		<motion.section className={styles.container}>
			<h2>Your friend request</h2>
			{friendRequests.map((frnd) => (
				<ProfilePanel
					key={frnd.owner}
					profile={frnd}
					friendInstance={friendInstance}
					dispatch={dispatch}
				/>
			))}
		</motion.section>
	);
};

const ProfilePanel = ({ profile, friendInstance, dispatch }) => {
  let imgLink;
  if (profile.name === "false") profile.name = "";
  if (profile.image === "false") {
    imgLink = logo;
  } else {
    imgLink = `https://raendom-backend.z52da5wt.xyz${profile.image}`;
  }

	const rejectRequest = async () => {
		// show spinner
		dispatch(setFetchingFrndReq());
		// remove friend
		await friendInstance.methods.reject_friend_request(profile.owner);
		// get new friend request list
		await getFriendRequest(friendInstance, dispatch);
	};

	const acceptRequest = async () => {
		// show spinner
		dispatch(setFetchingFrndReq());
		// accept friend request
		await friendInstance.methods.accept_friend_request(profile.owner);
		// get new friend request list
		await getFriendRequest(friendInstance, dispatch);
	};

	// about, image, name, owner
	return (
		<section className={styles.profileBody}>
			<figure className={styles.avatar}>
				<img alt={profile.name || "Fellow superhero"} src={imgLink} />
			</figure>

			<h4 className={styles.username}>{profile.name || "Fellow superhero"}</h4>

			<aside className={styles.btnBody}>
				<button
					className={`${styles.btn} ${styles.btnPrimary}`}
					onClick={() => acceptRequest()}
				>
					Accept
				</button>
				<button
					className={`${styles.btn} ${styles.btnSecondary}`}
					onClick={() => rejectRequest()}
				>
					Reject
				</button>
			</aside>
		</section>
	);
};

const mapStateToProps = (state) => ({
	friendRequests: state.friendRequests,
	friendInstance: state.contractInstances.friendInstance,
});
export default connect(mapStateToProps, null)(FrndReqList);
