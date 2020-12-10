import React from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { setFetchingUsers } from "../actions/actionCreator.js";
import styles from "./SuperchatUsersList.module.scss";
import logo from "../assets/logo/superhero.svg";

const SuperchatUsersList = ({ users, friendInstance, friends, userProfile, dispatch, }) => {
  let userFriends;
	const runQuery = (query) => {
		console.log(query);
  };
  for (let i = 0; i < friends.length; i++) {
    userFriends = friends[i].owner;
  }
  const filteredUser = users.filter(
    (users) => (users[0] !== userProfile.userAddress && users[0] !== userFriends)
  );

	return (
		<motion.section className={styles.container}>
			<header className={styles.header}>
				<input
					type="search"
					name="query"
					id="query"
					className={styles.input}
					placeholder="Search... [username or address]"
					onChange={(e) => runQuery(e.target.value)}
					autoComplete="off"
					autoFocus={true}
				/>
			</header>
      <br />
      <h4>{users.length} total users, {friends.length} total friends</h4>
			{filteredUser.map((user) => (
				<ProfilePanel
					key={user[0]}
					profile={user[1]}
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

	const sendRequest = async () => {
		// show spinner
		dispatch(setFetchingUsers());
		// accept friend request
		await friendInstance.methods.send_friend_request(profile.owner);
		// hide spinner
		dispatch(setFetchingUsers());
	};

	// about, image, name, owner
	return (
		<section className={styles.profileBody}>
			<figure className={styles.avatar}>
				<img alt={profile.name || "Fellow superhero"} src={imgLink} />
			</figure>

      <div className={styles.textArea}>
        <h4 className={styles.username}>{profile.name || "Fellow superhero"}</h4>
        <p className={styles.about}>{profile.owner}</p>
      </div>

			<aside className={styles.btnBody}>
				<button
					className={styles.roundBtn}
					onClick={() => sendRequest()}
				>
          +
				</button>
			</aside>
		</section>
	);
};

const mapStateToProps = (state) => ({
	users: state.users,
	friendInstance: state.contractInstances.friendInstance,
  friends: state.friends,
  userProfile: state.userProfile,
});
export default connect(mapStateToProps, null)(SuperchatUsersList);
