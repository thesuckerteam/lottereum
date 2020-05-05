import React, { Component } from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite/no-important";
import MainContent from "./MainContent";
import HeaderContent from "./HeaderContent";

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
	todayTrends: {
		marginTop: 30,
	},
	lastRow: {
		marginTop: 30,
	},
	unresolvedTickets: {
		marginRight: 30,
		"@media (max-width: 1024px)": {
			marginRight: 0,
		},
	},
	tasks: {
		marginTop: 0,
		"@media (max-width: 1024px)": {
			marginTop: 30,
		},
	},
});

export default class ContentComponent extends Component {
	render() {
		return (
			<Column>
				<HeaderContent />
				<div className={css(styles.todayTrends)}>
					<MainContent />
				</div>
				<Row
					horizontal='space-between'
					className={css(styles.lastRow)}
					breakpoints={{ 1024: "column" }}></Row>
			</Column>
		);
	}
}
