import React, { Component } from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite/no-important";
import RewardCard from "./RewardCard";
import MainContent from "./MainContent";

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
							title='first price'
							value='150 ether'
						/>
						<RewardCard
							className={css(styles.miniCardContainer)}
							title='Second price'
							value='120 ether'
						/>
						<RewardCard
							className={css(styles.miniCardContainer)}
							title='Third price'
							value='90 ether'
						/>
						<RewardCard
							className={css(styles.miniCardContainer)}
							title='Forth price'
							value='60 ether'
						/>
						<RewardCard
							className={css(styles.miniCardContainer)}
							title='5-30'
							value='30 ether'
						/>
						<RewardCard
							className={css(styles.miniCardContainer)}
							title='31-100'
							value='10 ether'
						/>
						<RewardCard
							className={css(styles.miniCardContainer)}
							title='3 digits'
							value='5 ether'
						/>
						<RewardCard
							className={css(styles.miniCardContainer)}
							title='2 digits'
							value='1 ether'
						/>
					</Row>
				</Row>
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
