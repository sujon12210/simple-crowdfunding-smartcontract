// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Crowdfunding {

    struct Campaign {
        address creator;
        uint goal;
        uint pledged;
        uint deadline;
        bool claimed;
    }

    uint public campaignCount;
    mapping(uint => Campaign) public campaigns;
    mapping(uint => mapping(address => uint)) public pledgedAmount;

    function createCampaign(uint goal, uint duration) external {
        campaignCount++;

        campaigns[campaignCount] = Campaign({
            creator: msg.sender,
            goal: goal,
            pledged: 0,
            deadline: block.timestamp + duration,
            claimed: false
        });
    }

    function pledge(uint id) external payable {
        Campaign storage c = campaigns[id];

        require(block.timestamp < c.deadline, "Campaign ended");

        c.pledged += msg.value;
        pledgedAmount[id][msg.sender] += msg.value;
    }

    function withdraw(uint id) external {
        Campaign storage c = campaigns[id];

        require(msg.sender == c.creator, "Not creator");
        require(block.timestamp >= c.deadline, "Not ended");
        require(c.pledged >= c.goal, "Goal not reached");
        require(!c.claimed, "Already claimed");

        c.claimed = true;
        payable(c.creator).transfer(c.pledged);
    }

    function refund(uint id) external {
        Campaign storage c = campaigns[id];

        require(block.timestamp >= c.deadline, "Not ended");
        require(c.pledged < c.goal, "Goal reached");

        uint bal = pledgedAmount[id][msg.sender];
        require(bal > 0, "No pledge");

        pledgedAmount[id][msg.sender] = 0;
        payable(msg.sender).transfer(bal);
    }
}
