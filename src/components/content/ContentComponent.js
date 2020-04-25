import React, { Component } from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite/no-important";
import MiniCardComponent from "./MiniCardComponent";
import TodayTrendsComponent from "./UserLists";
import web3 from "../../web3";
import lottery from "../../lottery";
import contractInfo from "../../config/contract";

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
	constructor(props) {
		super(props);
		this.state = {
			manager: "",
			players: [],
			balance: "",
			balanceEther: "",
			value: "",
			message: "",
			isMetaMaskPluginAvailable: false,
			isTransactionIsRunning: false,
			startWarning: false,
			errorMessage: "",
		};
	}

	async componentDidMount() {
		const isMetaMaskPluginAvailable = web3 && lottery;
		this.setState({ isMetaMaskPluginAvailable });
		this.updateContractInfo();
	}

	async updateContractInfo() {
		fetch("/api/contract-info")
			.then((res) => res.json())
			.then(({ manager, players, balanceWei: balance, balanceEther }) => {
				this.setState({ manager, players, balance, balanceEther });
			})
			.catch(console.log);
	}

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
						<MiniCardComponent
							className={css(styles.miniCardContainer)}
							title='first price'
							value='150 ether'
						/>
						<MiniCardComponent
							className={css(styles.miniCardContainer)}
							title='Second price'
							value='120 ether'
						/>
						<MiniCardComponent
							className={css(styles.miniCardContainer)}
							title='Third price'
							value='90 ether'
						/>
						<MiniCardComponent
							className={css(styles.miniCardContainer)}
							title='Forth price'
							value='60 ether'
						/>
						<MiniCardComponent
							className={css(styles.miniCardContainer)}
							title='5-30'
							value='30 ether'
						/>
						<MiniCardComponent
							className={css(styles.miniCardContainer)}
							title='31-100'
							value='10 ether'
						/>
						<MiniCardComponent
							className={css(styles.miniCardContainer)}
							title='3 digits'
							value='5 ether'
						/>
						<MiniCardComponent
							className={css(styles.miniCardContainer)}
							title='2 digits'
							value='1 ether'
						/>
					</Row>
				</Row>
				<div className={css(styles.todayTrends)}>
					<TodayTrendsComponent />
				</div>
				<Row
					horizontal='space-between'
					className={css(styles.lastRow)}
					breakpoints={{ 1024: "column" }}></Row>
			</Column>
		);
	}
}
