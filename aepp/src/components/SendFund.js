import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./SendFund.module.scss";

const SendFund = ({ receiver, setShowModal, messageInstance }) => {
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("No description");
	const [bcResponse, setResponse] = useState("");

	const clearResponse = () => {
		window.setTimeout(() => setResponse(""), 2000);
	};

	useEffect(() => {
		clearResponse();
	}, [bcResponse]);

	const sendFund = async (e) => {
		e.preventDefault();

		if (!amount)
			return setResponse("You can't send a value less than or equal zero (0)");

		try {
			let resp = await messageInstance.methods.send_fund(receiver, description);
			setResponse(resp);
		} catch (e) {
			setResponse(`Error: ${e}`);
		}
	};

	return (
		<motion.section
			className={styles.modalOverlay}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { duration: 0.5 } }}
		>
			<div className={styles.modal}>
				<div className={styles.header}>
					<button
						type="button"
						onClick={() => setShowModal(false)}
						className={styles.closeModal}
					>
						&#10005;
					</button>
				</div>

				<form method="POST" onSubmit={(e) => sendFund(e)}>
					<label htmlFor="amount" className={styles.label}>
						Amount(AE)
					</label>
					<input
						type="text"
						name="amount"
						id="amount"
						required
						className={styles.input}
						onChange={(e) => setAmount(e.target.value)}
					/>
					<label htmlFor="description" className={styles.label}>
						Description
					</label>
					<input
						type="text"
						name="description"
						id="description"
						className={styles.input}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<p>{bcResponse}</p>
					<button className={styles.btn}>Send fund</button>
				</form>
			</div>
		</motion.section>
	);
};

export default SendFund;
