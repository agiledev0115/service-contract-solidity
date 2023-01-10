const ServiceContract = artifacts.require("ServiceContract");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('ServiceContract', ([owner, investor]) => {
    let serviceContract;
    let accounts;

    before(async () => {
        accounts = await web3.eth.getAccounts();
        serviceContract = await ServiceContract.new();

        console.log(accounts);
    })
    
    describe('ServiceContract', async () => {
        it('Create test service', async () => {
            var service1 = [web3.utils.asciiToHex("S1"), web3.utils.asciiToHex("S2"), web3.utils.asciiToHex("S3")]
            var parameters = web3.eth.abi.encodeParameters(['bytes32[]'],[service1])

            result = await serviceContract.registerService(parameters, { from: accounts[0] })
            
            var service2 = [web3.utils.asciiToHex("S1"), web3.utils.asciiToHex("S2"), web3.utils.asciiToHex("S3"), web3.utils.asciiToHex("S4")]
            var parameters = web3.eth.abi.encodeParameters(['bytes32[]'],[service2])

            result = await serviceContract.registerService(parameters, { from: accounts[1] })
        })

        it('Request service', async () => {
            var service1 = [web3.utils.asciiToHex("S1"), web3.utils.asciiToHex("S2"), web3.utils.asciiToHex("S3"), web3.utils.asciiToHex("S4")]
            var parameters = web3.eth.abi.encodeParameters(['bytes32[]'],[service1])

            result = await serviceContract.findService(parameters, { from: accounts[2] })
            console.log('Request Result:' + result)
        })
    })
})