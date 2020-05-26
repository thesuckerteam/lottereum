import React from "react";
import { Row } from "simple-flexbox";
import RewardCard from "../cards/RewardCard";
import { StyleSheet, css } from "aphrodite/no-important";

const styles = StyleSheet.create({
	cardsContainer: {
		fontFamily: "Trebuchet MS",
		marginRight: -30,
		marginTop: -30,
		marginBottom: -20
		
	},
	cardRow: {
		marginTop: 10,
		marginBottom: 20,
		justifyContent: 'center',
		alignItems:'center',
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

export default function RewardContent(props) {
	return (
		<Row
			className={css(styles.cardsContainer)}
			wrap
			flexGrow={1}
			horizontal=''
			justifyContent='center'
			alignItems='center'
			breakpoints={{ 768: "column" }}>
			<Row
				className={css(styles.cardRow)}
				wrap
				flexGrow={1}
				horizontal=''
				breakpoints={{ 384: "column" }}>
				<RewardCard
					className={css(styles.miniCardContainer)}
					title='Total Price ( Ether )'
					value={props.balanceEther}
				/>
			</Row>
		</Row>
		
	);
}
