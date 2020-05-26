import React from "react";
import { Column } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite/no-important";

const styles = StyleSheet.create({
	statContainer: {
		borderBottom: "1px solid #DFE0EB",
		padding: "24px 32px 24px 32px",
		height: "calc(114px - 48px)",
		":last-child": {
			border: "none",
		},
	},
	statTitle: {
		fontFamily: "Trebuchet MS",
		fontStyle: "normal",
		fontWeight: "600",
		fontSize: 18,
		lineHeight: "22px",
		letterSpacing: "0.3px",
		textAlign: "center",
		color: "#9FA2B4",
		whiteSpace: "nowrap",
		marginBottom: 6,
	},
	statValue: {
		fontFamily: "Trebuchet MS",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 24,
		lineHeight: "30px",
		letterSpacing: "0.3px",
		textAlign: "center",
		color: "#252733",
	},
});

export default function PlayerCard({ number, address }) {
	return (
		<Column
			flexGrow={1}
			className={css(styles.statContainer)}
			vertical='center'
			horizontal='center'>
			<span className={css(styles.statTitle)}>Player Number: {number}</span>
			<span className={css(styles.statValue)}>Address: {address}</span>
		</Column>
	);
}
