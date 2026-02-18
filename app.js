const CONTRACT_ADDRESS = "PASTE_DEPLOYED_ADDRESS";

const ABI = [
  "function createCampaign(uint,uint)",
  "function pledge(uint) payable",
  "function withdraw(uint)",
  "function refund(uint)"
];

let provider;
let signer;
let contract;

const statusEl = document.getElementById("status");

document.getElementById("connect").onclick = async () => {
  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  statusEl.innerText = "Connected";
};

document.getElementById("create").onclick = async () => {
  try {
    const goal = document.getElementById("goal").value;
    const duration = document.getElementById("duration").value;

    const tx = await contract.createCampaign(
      ethers.parseEther(goal),
      duration
    );

    statusEl.innerText = "Creating...";
    await tx.wait();
    statusEl.innerText = "Campaign created";
  } catch (err) {
    statusEl.innerText = err.reason || err.message;
  }
};

document.getElementById("pledge").onclick = async () => {
  try {
    const id = document.getElementById("campaignId").value;
    const amount = document.getElementById("amount").value;

    const tx = await contract.pledge(id, {
      value: ethers.parseEther(amount)
    });

    statusEl.innerText = "Pledging...";
    await tx.wait();
    statusEl.innerText = "Pledged!";
  } catch (err) {
    statusEl.innerText = err.reason || err.message;
  }
};

document.getElementById("withdraw").onclick = async () => {
  const id = document.getElementById("withdrawId").value;
  const tx = await contract.withdraw(id);
  await tx.wait();
  statusEl.innerText = "Withdrawn";
};

document.getElementById("refund").onclick = async () => {
  const id = document.getElementById("refundId").value;
  const tx = await contract.refund(id);
  await tx.wait();
  statusEl.innerText = "Refunded";
};
