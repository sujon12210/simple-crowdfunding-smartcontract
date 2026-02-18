const hre = require("hardhat");

async function main() {
  const CF = await hre.ethers.getContractFactory("Crowdfunding");
  const cf = await CF.deploy();

  await cf.waitForDeployment();

  console.log("Crowdfunding deployed to:", await cf.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
