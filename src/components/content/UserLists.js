import React from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";

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

class TodayTrendsComponent extends React.Component {
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
				<span className={css(styles.statTitle)}>{title}</span>
				<span className={css(styles.statValue)}>{value}</span>
			</Column>
		);
	}

	render() {
		return (
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
								<input type='text' name='name' />
							</label>
							<input type='submit' value='Submit' />
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
					{this.renderStat("Kittin V.", "user: #0001 lottery: 665781")}
					{this.renderStat("Vichaphol T.", "user: #0002 lottery: 123456")}
					{this.renderStat("Piyavat S.", "user: #0003 lottery: 987654")}
					{this.renderStat("Korawit R.", "user: #0004 lottery: 333555")}
					{this.renderStat("Narisa S.", "user: #0005 lottery: 129453")}
					{this.renderStat("Tanasorn T.", "user: #0006 lottery: 776241")}
				</Column>
			</Row>
		);
	}
}

export default TodayTrendsComponent;
