import React from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import HeaderSection from "./components/header/HeaderSection";
import ContentContainer from "./components/content/ContentContainer";
import "./App.css";

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

class App extends React.Component {
	state = { selectedItem: "Tickets" };

	componentDidMount() {
		window.addEventListener("resize", this.resize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.resize);
	}

	resize = () => this.forceUpdate();

	render() {
		const { selectedItem } = this.state;
		return (
			<Row className={css(styles.container)}>
				<Column flexGrow={1} className={css(styles.mainBlock)}>
					<HeaderSection title={selectedItem} />
					<div className={css(styles.content)}>
						<ContentContainer />
					</div>
				</Column>
			</Row>
		);
	}
}

export default App;
