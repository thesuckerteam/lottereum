// const contractAddress = "0x2d6043c88635b4984b129e329c45c9a74ad42022";
// const contractAddress = '0x523f207e1cfCbC1e3da75aA506C0Eca8bBD7Ba08';
// const contractAddress = '0x8C9815E2372bC6F9Dec915751B31666aB08b2edb';
const contractAddress = "0x25a5797B51382e90b64752D229c4F97F0D2e94F6";

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
