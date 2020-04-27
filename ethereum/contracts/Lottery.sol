pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    function Lottery() public {
        // account that deploy smart contract
        manager = msg.sender;
    }
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    // Get the total players
    function getPlayers() public view returns (address[]) {
        return players;
    }
    // Player put their money
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    // Random lottery number
    function random() public view returns (uint) {
        return uint(keccak256(block.difficulty, now, players.length));
    }
    // Transfer money to the winner ( only restricted to manager )
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }
}