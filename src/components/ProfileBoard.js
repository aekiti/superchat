import React from "react";
import styles from "./ProfileBoard.module.scss";
import logo from "../assets/logo/superhero.svg";

const ProfileBoard = ({ profile }) => {
  let { image, name, owner, about } = profile;
  let imgLink;
  if (name === "false") name = "";
  if (image === "false") {
    imgLink = logo;
  } else {
    imgLink = `https://raendom-backend.z52da5wt.xyz${image}`;
  }
  
	return (
		<section className={styles.body}>
			<figure className={styles.avatar}>
				<img src={imgLink} alt={name || "Fellow superhero"} />
			</figure>

			<aside className={styles.textArea}>
				<h4 className={styles.username}>{name || "Fellow superhero"}</h4>
				<p className={styles.about}>{about}</p>
			</aside>
		</section>
	);
};

export default ProfileBoard;
