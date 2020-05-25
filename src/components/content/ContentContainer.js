import React, { Component } from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import HeaderSection from "../header/HeaderSection";
import MainContent from "./MainContent";
import LoadingOverlay from "react-loading-overlay";

const styles = StyleSheet.create({
	container: {
		height: "100%",
		minHeight: "100vh",
	},
	content: {
		marginTop: 20,
	},
	mainBlock: {
		backgroundColor: "#F7F8FC",
		padding: 30,
	},
});

export default class ContentContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
		const { message, isTransactionIsRunning } = this.state;
		return (
			<>
				<HeaderSection />
				<LoadingOverlay active={isTransactionIsRunning} spinner text={message}>
					<Row className={css(styles.container)}>
						<Column flexGrow={1} className={css(styles.mainBlock)}>
							<div className={css(styles.content)}>
								<MainContent
									onLoading={this.handleLoading}
									onClose={this.handleClose}
								/>
							</div>
						</Column>
					</Row>
				</LoadingOverlay>
			</>
		);
	}
}
