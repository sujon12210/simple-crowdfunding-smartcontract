# Simple Crowdfunding Smart Contract DApp

A minimal decentralized crowdfunding platform that demonstrates how on-chain fundraising works.

Users can:

- Create campaigns
- Fund campaigns
- Track progress
- Withdraw funds (creator only)
- Refund if goal not reached

This repo uses a flat structure for easy learning and readability.

---

## Features

• Create fundraising campaigns  
• Set funding goal  
• Track contributions  
• Refund logic  
• Withdraw logic  
• Wallet integration  

---

## Tech Stack

- Solidity
- Hardhat
- Ethers.js
- HTML + Vanilla JS

---

## Contract Logic

Each campaign stores:

- Creator
- Goal
- Deadline
- Total pledged
- Claimed status

Functions:

createCampaign(goal, duration)  
pledge(id)  
withdraw(id)  
refund(id)

---

## Setup

Install dependencies:

npm install

Compile:

npx hardhat compile

Run local chain:

npx hardhat node

Deploy:

npx hardhat run deploy.js --network localhost

---

## Frontend

Open:

index.html

Edit app.js and paste deployed contract address.

---

## Learning Goals

Understand:

- Struct storage
- Mappings
- Payable functions
- State validation
- On-chain accounting

---

## Important

Educational project only.

Do not use for real fundraising.

---

## License
MIT
