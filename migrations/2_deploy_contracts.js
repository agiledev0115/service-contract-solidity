const ServiceContract = artifacts.require("ServiceContract");

module.exports = async function(deployer, network, accounts) {
    console.log(network);
    console.log(accounts);
    await deployer.deploy(ServiceContract);
    const serviceContract = await ServiceContract.deployed();
    console.log('Contract deployed to address: ' + serviceContract.address);
}