import React from "react";

const styles = {
	container: {
		backgroundColor: "#31394d",
		color: "white",
		padding: '10px',
		paddingLeft: '30px',
	},
};

export default function HeaderSection() {
	return (
		<div style={styles.container}>
			<h1>Lottereum</h1>
		</div>
	);
}
