var Lottery = artifacts.require("./Lottery.sol");

module.exports = function (deployer) {
	deployer.deploy(Lottery, { gas: 6700000 });
};
