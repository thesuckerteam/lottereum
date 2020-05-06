import React from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import HeaderSection from "./components/header/HeaderSection";
import ContentContainer from "./components/content/ContentContainer";
import "./App.css";
import LoadingOverlay from "react-loading-overlay";

const styles = StyleSheet.create({
	container: {
		height: "100%",
		minHeight: "100vh",
	},
	content: {
		marginTop: 54,
	},
	mainBlock: {
		backgroundColor: "#F7F8FC",
		padding: 30,
	},
});

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedItem: "Tickets",
			message: "",
			isTransactionIsRunning: false,
		};
	}

	componentDidMount() {
		window.addEventListener("resize", this.resize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.resize);
	}

	handleLoading = () => {
		this.setState({
			message: "Transaction is processing. This might take a while.",
			isTransactionIsRunning: true,
		});
	};

	handleClose = () => {
		this.setState({
			isTransactionIsRunning: false,
		});
	};

	resize = () => this.forceUpdate();

	render() {
		const { selectedItem, message, isTransactionIsRunning } = this.state;
		return (
			<LoadingOverlay active={isTransactionIsRunning} spinner text={message}>
				<Row className={css(styles.container)}>
					<Column flexGrow={1} className={css(styles.mainBlock)}>
						<HeaderSection title={selectedItem} />
						<div className={css(styles.content)}>
							<ContentContainer
								onLoading={this.handleLoading}
								onClose={this.handleClose}
							/>
						</div>
					</Column>
				</Row>
			</LoadingOverlay>
		);
	}
}
