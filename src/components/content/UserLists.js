import React, { Component } from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import web3 from "../../config/web3";
import lottery from "../../config/lotteryContract";
import LoadingOverlay from "react-loading-overlay";

const data = [];

for (let x = 1; x <= 24; x++) {
	data.push({ x: x, y: Math.floor(Math.random() * 100) });
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		border: "1px solid #DFE0EB",
		borderRadius: 4,
		cursor: "pointer",
	},
	graphContainer: {
		marginTop: 24,
		marginLeft: 0,
		marginRight: 0,
		width: "100%",
	},
	graphSection: {
		padding: 24,
	},
	graphSubtitle: {
		fontFamily: "Muli",
		fontStyle: "normal",
		fontWeight: "normal",
		fontSize: 12,
		lineHeight: "16px",
		letterSpacing: "0.1px",
		color: "#9FA2B4",
		marginTop: 4,
		marginRight: 8,
	},
	graphTitle: {
		fontFamily: "Muli",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 19,
		lineHeight: "24px",
		letterSpacing: "0.4px",
		color: "#252733",
	},
	legendTitle: {
		fontFamily: "Muli",
		fontStyle: "normal",
		fontWeight: "600",
		fontSize: 12,
		lineHeight: "15px",
		letterSpacing: "0.1px",
		color: "#9FA2B4",
		marginLeft: 8,
	},
	separator: {
		backgroundColor: "#DFE0EB",
		width: 1,
		minWidth: 1,
	},
	statContainer: {
		borderBottom: "1px solid #DFE0EB",
		padding: "24px 32px 24px 32px",
		height: "calc(114px - 48px)",
		":last-child": {
			border: "none",
		},
	},
	stats: {
		borderTop: "1px solid #DFE0EB",
		width: "100%",
	},
	statTitle: {
		fontFamily: "Muli",
		fontStyle: "normal",
		fontWeight: "600",
		fontSize: 16,
		lineHeight: "22px",
		letterSpacing: "0.3px",
		textAlign: "center",
		color: "#9FA2B4",
		whiteSpace: "nowrap",
		marginBottom: 6,
	},
	statValue: {
		fontFamily: "Muli",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 24,
		lineHeight: "30px",
		letterSpacing: "0.3px",
		textAlign: "center",
		color: "#252733",
	},
});

export default class TodayTrendsComponent extends Component {
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
			isLoading: true,
		};
	}

	async componentDidMount() {
		const isMetaMaskPluginAvailable = web3 && lottery;
		this.setState({ isMetaMaskPluginAvailable, isLoading: true });
		console.log("Account: ", await web3.eth.getAccounts());
		this.updateContractInfo();
	}

	updateContractInfo = async () => {
		try {
			const manager = await lottery.methods.manager().call();
			const players = await lottery.methods.getPlayers().call();
			const balanceWei = await web3.eth.getBalance(lottery.options.address);
			const balanceEther = await web3.utils.fromWei(balanceWei, "ether");
			this.setState({
				manager,
				players,
				balance: balanceWei,
				balanceEther,
				isLoading: false,
			});
		} catch (error) {
			alert(error);
		}
	};

	handleOnSubmit = async (event) => {
		event.preventDefault();
		this.setState({ errorMessage: "" });
		const { isMetaMaskPluginAvailable, value } = this.state;

		if (!isMetaMaskPluginAvailable) {
			return this.metaMaskNotAvailable();
		}

		await window.ethereum.enable();
		const accounts = await web3.eth.getAccounts();
		this.setState({
			message: "Transaction is processing. This might take 12 to 30 seconds.",
			isTransactionIsRunning: true,
			isLoading: true,
		});

		try {
			await lottery.methods.enter().send({
				from: accounts[0],
				value: web3.utils.toWei(value, "ether"),
			});
			this.updateContractInfo();
			this.setState({
				message: "You entered to the lottery",
				value: "",
			});
		} catch (err) {
			this.setState({
				errorMessage: err.message,
			});
		}

		this.setState({ isTransactionIsRunning: false, isLoading: false });
	};

	handleOnPickWinner = async (event) => {
		event.preventDefault();

		const { isMetaMaskPluginAvailable } = this.state;
		if (!isMetaMaskPluginAvailable) {
			return this.metaMaskNotAvailable();
		}

		await window.ethereum.enable();
		const accounts = await web3.eth.getAccounts();
		this.setState({
			message: "Transaction is processing. This might take 9 to 15 seconds.",
			isTransactionIsRunning: true,
			isLoading: true,
		});

		try {
			await lottery.methods.pickWinner().send({
				from: accounts[0],
			});
		} catch (ex) {}

		this.setState({
			message: "Winner picked",
		});

		this.setState({ isTransactionIsRunning: false, isLoading: false });
	};

	metaMaskNotAvailable = () => {
		this.setState({
			startWarning: true,
		});
	};

	renderLegend(color, title) {
		return (
			<Row vertical='center'>
				<div
					style={{ width: 16, border: "2px solid", borderColor: color }}></div>
				<span className={css(styles.legendTitle)}>{title}</span>
			</Row>
		);
	}

	renderStat(title, value) {
		return (
			<Column
				flexGrow={1}
				className={css(styles.statContainer)}
				vertical='center'
				horizontal='center'>
				<span className={css(styles.statTitle)}>Player Number: {title}</span>
				<span className={css(styles.statValue)}>Address: {value}</span>
			</Column>
		);
	}

	render() {
		const {
			isMetaMaskPluginAvailable,
			manager,
			players,
			balance,
			balanceEther,
			isLoading,
			isTransactionIsRunning,
			message,
		} = this.state;

		console.log("Metamask: ", isMetaMaskPluginAvailable);
		console.log("Manager: ", manager);
		console.log("Player: ", players);
		console.log("Balance: ", balance);
		console.log("BalanceEther: ", balanceEther);

		return (
			<LoadingOverlay active={isTransactionIsRunning} spinner text={message}>
				<Row
					flexGrow={1}
					className={css(styles.container)}
					horizontal='center'
					breakpoints={{ 1024: "column" }}>
					<Column
						wrap
						flexGrow={7}
						flexBasis='735px'
						className={css(styles.graphSection)}
						breakpoints={{
							1024: { width: "calc(100% - 48px)", flexBasis: "auto" },
						}}>
						<h1>
							<form>
								<label>
									Lottery Number:
									<input
										onChange={(event) =>
											this.setState({ value: event.target.value })
										}
										type='text'
										name='name'
									/>
								</label>
								<input
									type='submit'
									value='Submit'
									onClick={this.handleOnSubmit}
								/>
								<input
									type='submit'
									value='Pick A Winner'
									onClick={this.handleOnPickWinner}
								/>
							</form>
						</h1>
					</Column>
					<Column
						className={css(styles.separator)}
						breakpoints={{ 1024: { display: "none" } }}>
						<div />
					</Column>
					<Column
						flexGrow={3}
						flexBasis='342px'
						breakpoints={{ 1024: css(styles.stats) }}>
						{isLoading ||
							players.map((player, index) =>
								this.renderStat(index + 1, player)
							)}
					</Column>
				</Row>
			</LoadingOverlay>
		);
	}
}
