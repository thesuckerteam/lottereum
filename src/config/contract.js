const contractAddress = "0x8C9815E2372bC6F9Dec915751B31666aB08b2edb";
const contractAbi = [
	{
		constant: true,
		inputs: [],
		name: "manager",
		outputs: [
			{
				name: "",
				type: "address",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "uint256",
			},
		],
		name: "players",
		outputs: [
			{
				name: "",
				type: "address",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		constant: false,
		inputs: [],
		name: "enter",
		outputs: [],
		payable: true,
		stateMutability: "payable",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "random",
		outputs: [
			{
				name: "",
				type: "uint256",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [],
		name: "pickWinner",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "getPlayers",
		outputs: [
			{
				name: "",
				type: "address[]",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
];
export default { contractAddress, contractAbi };

// const contractAddress = '0x8C9815E2372bC6F9Dec915751B31666aB08b2edb';
// const contractAbi = [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"random","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
// export default { contractAddress, contractAbi };
