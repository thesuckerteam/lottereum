import React, { Component } from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import web3 from "../../config/web3";
import lottery from "../../config/lottery";
import PlayerCard from "../cards/PlayerCard";
import RewardContent from "./RewardContent";
import lotto from "../../images/lottery_pic.png";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		border: "1px solid #DFE0EB",
		borderRadius: 4,
		cursor: "pointer",
		marginTop: 15,
	},
	graphSection: {
		padding: "10px 10px 10px 10px",
	},
	separator: {
		backgroundColor: "#DFE0EB",
		width: 1,
		minWidth: 1,
	},
	stats: {
		borderTop: "1px solid #DFE0EB",
		width: "100%",
		height: 200,
		overflowX: "scroll",
	},
	lastRow: {
		marginTop: 30,
	},
	input2: {
		marginLeft: 10,
		marginTop: -10,
		padding: "5px 10px 5px 10px",
		fontFamily: "Trebuchet MS",
		fontSize: 15,
		color: "#fff",
		fontWeight: 700,
		backgroundColor: "#00AD5F",
		borderRadius: 5,
		opacity: 0.7,
		transition: 0.3,
		display: "inline-block",
		cursor: "pointer",
		textDecoration: "none",
		":hover": { opacity: 1 },
	},
	input1: {
		marginLeft: 10,
		fontFamily: "Trebuchet MS",
		padding: "5px 10px 5px 10px",
		fontSize: 15,
		color: "#fff",
		fontWeight: 700,
		backgroundColor: "#00AD5F",
		borderRadius: 5,
		opacity: 0.7,
		transition: 0.3,
		display: "inline-block",
		cursor: "pointer",
		textDecoration: "none",
		":hover": { opacity: 1 },
	},
	whiteInput: {
		fontFamily: "Trebuchet MS",
		marginLeft: 10,
		transition: "all 0.2s",
		fontSize: 15,
		padding: "5px 0px 5px 10px",

		":hover": {
			background: "#efefef",
		},
	},

	playerContain: {
		overflowX: "auto",
		height: 350,
		width: "500px",
		float: "left",
		position: "relative",
	},
	rowContain: {
		justifyContent: "center",
		alignItems: "center",
	},
	imageSet: {
		bottom: 0,
		width: "100%",
		height: 280,
		objectFit: "cover",
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
		};
	}

	async componentDidMount() {
		const isMetaMaskPluginAvailable = web3 && lottery;
		this.setState({ isMetaMaskPluginAvailable });
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

		try {
			await window.ethereum.enable();
		} catch (error) {
			this.setState({ isWarningAppended: true });
		}

		try {
			const accounts = await web3.eth.getAccounts();
			this.props.onLoading();
			await lottery.methods.enter().send({
				from: accounts[0],
				value: web3.utils.toWei(value, "ether"),
			});
			this.updateContractInfo();
			this.setState({
				value: "",
			});
		} catch (error) {
			this.setState({
				errorMessage: error.message,
			});
		}
		this.updateContractInfo();
		this.props.onClose();
	};

	handleOnPickWinner = async (event) => {
		event.preventDefault();
		const { isMetaMaskPluginAvailable, balanceEther } = this.state;
		if (!isMetaMaskPluginAvailable) {
			return this.metaMaskNotAvailable();
		}

		try {
			await window.ethereum.enable();
		} catch (error) {
			this.setState({ isWarningAppended: true });
		}

		try {
			const accounts = await web3.eth.getAccounts();
			this.props.onLoading();
			await lottery.methods.pickWinner().send({
				from: accounts[0],
			});
		} catch (error) {
			this.setState({
				errorMessage: error.message,
			});
		}

		const winner = await lottery.methods.winner().call();
		alert(`The winner is ${winner}, wins ${balanceEther} ether`);
		this.updateContractInfo();
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
				<Row flexGrow={1} justifyContent='center' alignItems='center'>
					Total&nbsp;<h3>{players.length}</h3>&nbsp;players already joined here
				</Row>
				<Row flexGrow={1} justifyContent='center' alignItems='center'>
					The contract is managed by {manager}
				</Row>
				<Row
					flexGrow={1}
					className={css(styles.container)}
					horizontal='center'
					breakpoints={{ 1024: "column" }}>
					<Column
						wrap
						alignItems='center'
						flexGrow={7}
						flexBasis='735px'
						className={css(styles.graphSection)}
						breakpoints={{
							1024: { width: "calc(100% - 48px)", flexBasis: "auto" },
						}}>
						<h2>
							<form>
								<label>
									Lottery Amount:
									<input
										className={css(styles.whiteInput)}
										onChange={this.handleInputChange}
										placeholder='Example: 0.1'
										value={value}
									/>
								</label>
								<input
									className={css(styles.input1)}
									type='submit'
									value='Submit'
									onClick={this.handleOnSubmit}
								/>
							</form>
						</h2>
						<img className={css(styles.imageSet)} src={lotto} />
					</Column>
					<Column
						className={css(styles.separator)}
						breakpoints={{ 1024: { display: "none" } }}>
						<div />
					</Column>
					<Column
						className={css(styles.playerContain)}
						flexGrow={3}
						flexBasis='342px'
						justifyContent='center'
						alignItems='center'
						breakpoints={{ 1024: css(styles.stats) }}>
						{players.length === 0
							? "There is no players"
							: players.map((address, index) => (
									<PlayerCard number={index + 1} address={address} />
							  ))}
					</Column>
				</Row>
				<Row
					horizontal='space-between'
					alignItems='center'
					className={css(styles.lastRow)}
					breakpoints={{ 1024: "column" }}></Row>
				<Row
					flexGrow={1}
					horizontal=''
					justifyContent='center'
					alignItems='center'>
					<input
						className={css(styles.input2)}
						type='submit'
						value='Pick A Winner'
						onClick={this.handleOnPickWinner}
					/>
				</Row>
			</Column>
		);
	}
}
