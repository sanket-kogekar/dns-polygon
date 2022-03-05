const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("gangsta");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("billionaire", {
    value: hre.ethers.utils.parseEther("1"),
  });
  await txn.wait();
  console.log("Minted domain billionaire.gangsta");

  txn = await domainContract.setRecord(
    "billionaire",
    "Am I a billionaire or a gangsta??"
  );
  await txn.wait();
  console.log("Set record for billionaire.gangsta");

  const address = await domainContract.getAddress("billionaire");
  console.log("Owner of domain billionaire:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    console.log("My runMain exiting! (all good!)");
    process.exit(0);
  } catch (error) {
    console.log("My runMain ERR!", error);
    console.log(error);
    process.exit(1);
  }
};

runMain();
