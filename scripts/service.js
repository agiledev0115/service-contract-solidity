const prompt = require('prompt-sync')();

const ServiceContract = artifacts.require("ServiceContract");
const contractAddress = '0xE0Ac4e7a05e889cDdcb9D2E39f2EE564A45C1766';
const serviceContract = new web3.eth.Contract(ServiceContract.abi, contractAddress);

main = async () => {
    let data = prompt('What is your position? (provider or requester): ');
    let position = data;
    data = prompt('Your address: ');
    let addr = data;
    
    if(position == 'provider') {
        data = prompt('Please input what you want(register or accept): ');
        while(data !== 'exit') {
            if(data === 'register')
                await inputRegister(addr);
            if(data == 'accept')
                await acceptRequest(addr);
            data = prompt('Please input what you want(register or accept): ');
        }
    }
    else {
        // await getChangedList(addr);
        data = prompt('Please input what you want(request or feedback): ');
        while(data !== 'exit') {
            if(data === 'request')
                await inputRequest(addr);
            if(data === 'feedback')
                await inputFeedback(addr);
            data = prompt('Please input what you want(request or feedback): ');
        }
    }
}

inputRegister = async (addr) => {
    let input = await prompt('Your services: ');
    let services = input;

    input = await prompt('Your service prices(0-50): ');
    let prices = input;

    input = await prompt('Maximum Count of each services: ');
    let maxcount = input;

    await registerService(addr, services, prices, maxcount);
}

inputRequest = async (addr) => {
    let input = prompt('Your requests: ');
    let requests = input;

    await requestService(addr, requests);
}

inputFeedback = async (addr) => {
    await giveFeedback(addr);
}

acceptRequest = async (addr) => {
    await getWaitingList(addr);
}

registerService = async (account, service, p1, p2) => {
    let arr = service.split(' ');
    for(let i = 0;i < arr.length;i ++)
        arr[i] = web3.utils.asciiToHex(arr[i]);
    let services = web3.eth.abi.encodeParameters(['bytes32[]'], [arr]);

    arr = p1.split(' ');
    let prices = web3.eth.abi.encodeParameters(['uint256[]'], [arr]);

    arr = p2.split(' ');
    let maxcount = web3.eth.abi.encodeParameters(['uint256[]'], [arr]);

    try {
        await serviceContract.methods.registerService(services, prices, maxcount).send({ from: account });
        console.log("Service Registered Successfully");
    } catch(err) {
        console.log("Account already registered");
    }
}

requestService = async (account, content) => {
    let arr = content.split(' ');
    for(let i = 0;i < arr.length;i ++)
        arr[i] = web3.utils.asciiToHex(arr[i]);
    let requests = web3.eth.abi.encodeParameters(['bytes32[]'], [arr]);

    const result = await serviceContract.methods.findService(requests).call({ from: account });
    
    console.log('\nmaxfee: ', (result[0] * 0.125).toString());
    console.log('Blacklist: ');
    for(let i = 0;i < result[1].length;i ++)
        console.log(result[1][i]);
    
    console.log('\nmaxfee: ', (result[0] * 0.5).toString());
    console.log('Greylist: ');
    for(let i = 0;i < result[2].length;i ++)
    console.log(result[2][i]);
    
    console.log('\nmaxfee: ', (result[0]).toString());
    console.log('Whitelist: ');
    for(let i = 0;i < result[3].length;i ++)
    console.log(result[3][i]);
    
    let data = prompt('Please input provider address: ');
    let paddr = data;
    let AvData = [];
    let AData = [];
    let RData = [];
    let CrData = [];
    let CData = [];

    for(let i = 0;i < arr.length; i ++) {
        console.log(web3.utils.hexToAscii(arr[i]));
        let data = prompt('Availability(1-10): ');
        AvData[i] = Number(data);
        data = prompt('Accuracy(1-10): ');
        AData[i] = Number(data);
        data = prompt('Responsiveness(1-10): ');
        RData[i] = Number(data);
        data = prompt('Cruciality(1-10): ');
        CrData[i] = Number(data);
        data = prompt('Cooperation(1-10): ');
        CData[i] = Number(data);
    }

    let param1 = web3.eth.abi.encodeParameters(['uint256[]'], [AvData]);
    let param2 = web3.eth.abi.encodeParameters(['uint256[]'], [AData]);
    let param3 = web3.eth.abi.encodeParameters(['uint256[]'], [RData]);
    let param4 = web3.eth.abi.encodeParameters(['uint256[]'], [CrData]);
    let param5 = web3.eth.abi.encodeParameters(['uint256[]'], [CData]);

    while(true) {
        try {
            await serviceContract.methods.requestService(paddr, requests, param1, param2, param3, param4, param5).send({ from: account });
            console.log('Requested service, provider will accept your request')
            break;
        } catch(err) {
            data = prompt('Provider cannot provide a service, Please input the another provider address: ');
        }
    }
}

giveFeedback = async (account) => {
    const result = await serviceContract.methods.getProgressList().call({ from: account });
    console.log('\nYour current Request list: ');
    for(let i = 0;i < result[0].length;i ++) {
        let output = '';
        for(let j = 0;j < result[1][i].length; j ++)
            output += web3.utils.hexToAscii(result[1][i][j]) + ' ';
        console.log(i + 1, result[0][i], output);
    }

    let data = prompt('Please input the index: ');
    let n = Number(data) - 1;
    const result1 = await serviceContract.methods.calcFB(result[2][n]).call({ from: account });
    const result2 = await serviceContract.methods.getCounts(result[2][n]).call({ from: account });

    let AvData = [];
    let AData = [];
    let RData = [];
    let CrData = [];
    let CData = [];
    let fb = [];
    let h = [];

    for(let i = 0;i < result[1][n].length; i ++) {
        console.log(web3.utils.hexToAscii(result[1][n][i]));
        let data = prompt('Availability(1-10): ');
        AvData[i] = Number(data);
        data = prompt('Accuracy(1-10): ');
        AData[i] = Number(data);
        data = prompt('Responsiveness(1-10): ');
        RData[i] = Number(data);
        data = prompt('Cruciality(1-10): ');
        CrData[i] = Number(data);
        data = prompt('Cooperation(1-10): ');
        CData[i] = Number(data);
        fb[i] = AvData[i] * result1[0][i] +
            AData[i] * result1[1][i] +
            RData[i] * result1[2][i] +
            CrData[i] * result1[3][i] +
            CData[i] * result1[4][i];
        fb[i] = fb[i] * result2[0][i] / result2[1][i];
        if(result2[2][i] > result2[3][i])
            fb[i] = ((fb[i] - result2[3][i]) / (result2[2][i] - result2[3][i])) * 10000;
        else
            fb[i] = Math.sqrt(fb[i] / 5) * 1000;
        fb[i] = parseInt(fb[i]);
    }

    console.log('Local Trust values:');
    let str = '';
    for(let i = 0; i < fb.length;i ++)
        str += (fb[i] / 10000).toString() + ' ';
    console.log(str);

    for(let i = 0;i < result2[4].length;i ++) {
        if(result2[4][i] == 0)
            h[i] = 0;
        else {
            h[i] = (1 - 1 / Math.sqrt(result2[4][i])) * 10000;
            h[i] = parseInt(h[i]);
        }
    }

    let param = web3.eth.abi.encodeParameters(['uint256[]'], [fb]);
    let param1 = web3.eth.abi.encodeParameters(['uint256[]'], [h]);
    await serviceContract.methods.giveFeedback(result[2][n], param, param1).send({ from: account });
    const result3 = await serviceContract.methods.getMarks(result[2][n]).call({ from: account });
    console.log(result3);
    str = '';
    console.log('Global Trust values:');
    for(let i = 0;i < result3[0].length; i ++)
        str += (result3[0][i] / 10000).toString() + ' ';
    console.log(str);

    str = '';
    console.log('Reputation values:');
    for(let i = 0;i < result3[1].length; i ++)
        str += (result3[1][i] / 10000 / 10000).toString() + ' ';
    console.log(str);

    console.log('Give feedback')
}

getWaitingList = async (account) => {
    const result = await serviceContract.methods.getWaitingList().call({ from: account });
    console.log('\nCurrently Requested list: ');
    for(let i = 0;i < result[0].length;i ++) {
        let output = '';
        for(let j = 0;j < result[1][i].length; j ++)
            output += web3.utils.hexToAscii(result[1][i][j]) + ' ';
        console.log(i + 1, result[0][i], output);
    }

    let data = prompt('Please input the index: ');
    let n = Number(data) - 1;
    data = prompt('Will you accept or reject?: ');
    let flag = false;
    if(data == 'accept') flag = true;
    else flag = false;

    try {
        await serviceContract.methods.acceptRequest(result[0][n], result[2][n], flag).send({ from: account });
        console.log('Accepted the request')
    } catch(err) {
        console.log('Provider cannot accept the request, please reject it.');
    }
}

module.exports = async function(callback) {
	main();
}