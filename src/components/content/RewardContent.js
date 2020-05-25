import React from "react";
import { Row } from "simple-flexbox";
import RewardCard from "../cards/RewardCard";
import { StyleSheet, css } from "aphrodite/no-important";

const styles = StyleSheet.create({
	cardsContainer: {
		marginRight: -30,
		marginTop: -30,
	},
	cardRow: {
		marginTop: 30,
		"@media (max-width: 768px)": {
			marginTop: 0,
		},
	},
	miniCardContainer: {
		flexGrow: 1,
		marginRight: 30,
		"@media (max-width: 768px)": {
			marginTop: 30,
			maxWidth: "none",
		},
	},
});

export default function RewardContent() {
	return (
		<Row
			className={css(styles.cardsContainer)}
			wrap
			flexGrow={1}
			horizontal='space-between'
			breakpoints={{ 768: "column" }}>
			<Row
				className={css(styles.cardRow)}
				wrap
				flexGrow={1}
				horizontal='space-between'
				breakpoints={{ 384: "column" }}>
				<RewardCard
					className={css(styles.miniCardContainer)}
					title='Total price'
					value='150 ether'
				/>
			</Row>
		</Row>
	);
}
