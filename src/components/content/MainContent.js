import React, { Component } from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import web3 from "../../config/web3";
import lottery from "../../config/lottery";
import PlayerCard from "../cards/PlayerCard";
import RewardContent from "./RewardContent";

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
	graphSection: {
		padding: 24,
	},
	separator: {
		backgroundColor: "#DFE0EB",
		width: 1,
		minWidth: 1,
	},
	stats: {
		borderTop: "1px solid #DFE0EB",
		width: "100%",
	},
	todayTrends: {
		marginTop: 30,
	},
	lastRow: {
		marginTop: 30,
	},
});

export default class MainContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			manager: "",
			players: [],
			balance: "",
			balanceEther: "",
			value: "",
			isMetaMaskPluginAvailable: false,
			isWarningAppended: false,
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

	handleInputChange = (event) => {
		const value = event.target.value;

		if (!value || value.match(/^\d{1,}(\.\d{0,4})?$/)) {
			this.setState(() => ({ value }));
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
		this.props.onLoading();

		try {
			await lottery.methods.enter().send({
				from: accounts[0],
				value: web3.utils.toWei(value, "ether"),
			});
			this.updateContractInfo();
			this.setState({
				value: "",
			});
		} catch (err) {
			this.setState({
				errorMessage: err.message,
			});
		}
		this.props.onClose();
		this.setState({ isLoading: false });
	};

	handleOnPickWinner = async (event) => {
		event.preventDefault();

		const { isMetaMaskPluginAvailable, balanceEther } = this.state;
		if (!isMetaMaskPluginAvailable) {
			return this.metaMaskNotAvailable();
		}

		await window.ethereum.enable();
		const accounts = await web3.eth.getAccounts();
		this.props.onLoading();

		try {
			await lottery.methods.pickWinner().send({
				from: accounts[0],
			});
		} catch (ex) {}
		const winner = await lottery.methods.winner().call();
		alert(`The winner is ${winner}, wins ${balanceEther} ether`);
		this.props.onClose();
		this.setState({ balanceEther: 0 });
	};

	metaMaskNotAvailable = () => {
		this.setState({
			isWarningAppended: true,
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

	render() {
		const {
			value,
			isMetaMaskPluginAvailable,
			isWarningAppended,
			isLoading,
			manager,
			players,
			balance,
			balanceEther,
		} = this.state;

		console.log("Metamask: ", isMetaMaskPluginAvailable);
		console.log("Manager: ", manager);
		console.log("Player: ", players);
		console.log("Balance: ", balance);
		console.log("BalanceEther: ", balanceEther);

		return (
			<Column>
				{isWarningAppended && <div>Error please enable Metamask!</div>}
				<RewardContent balanceEther={balanceEther} />
				<div className={css(styles.todayTrends)}>
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
										Lottery Amount:
										<input onChange={this.handleInputChange} value={value} />
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
								players.map((address, index) => (
									<PlayerCard number={index + 1} address={address} />
								))}
						</Column>
					</Row>
				</div>
				<Row
					horizontal='space-between'
					className={css(styles.lastRow)}
					breakpoints={{ 1024: "column" }}></Row>
			</Column>
		);
	}
}
