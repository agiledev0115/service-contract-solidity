// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract ServiceContract {

    enum Status {
        Requested,
        Accepted,
        Rejected,
        Accept_Viewed,
        Reject_Viewed,
        Finished,
        Cancelled
    }
    
    struct Provider {
        bytes32[] services;
        uint256[] prices;
        uint256[] maxCount;
        uint256[] curCount;
        uint256[] totalTrust;
        bool hasRegisterd;
    }

    struct Request {
        address provider;
        bytes32[] services;
        Status status;
        uint256[] Av;
        uint256[] A;
        uint256[] R;
        uint256[] Cr;
        uint256[] C;
        uint256[] feedback;
    }

    struct Requester {
        mapping(uint256 => Request) requests;
        uint256 req_count;
        bool hasRegisterd;
    }

    bytes32[] public service_names;

    mapping(address => Provider) private providers;
    address[] private provider_addrs;

    mapping(address => Requester) private requesters;
    address[] private requester_addrs;
    
    uint private constant multiplier = 10 ** 18;

    uint256 private limitFee = 100;

    mapping(address => mapping(address => mapping(bytes32 => uint256))) reputation;
    
    event Registered(
        address addr,
        bytes32[] service,
        uint256[] prices
    );

    event GiveFeedback(
        address from,
        address to,
        bytes32[] service,
        uint256[] mark
    );

    event Requested(
        address from,
        address to,
        bytes32[] services
    );

    event Accepted(
        address from,
        address to,
        bytes32[] services
    );

    event Rejected(
        address from,
        address to,
        bytes32[] services
    );

    event Cancelled(
        address from,
        address to,
        bytes32[] services
    );

    constructor() public {}

    function registerService(
        bytes memory params,
        bytes memory params1,
        bytes memory params2
    ) public  {
        require(providers[msg.sender].hasRegisterd != true, "Account already registered.");
        bytes32[] memory arrData = abi.decode(params, (bytes32[]));
        uint256[] memory pData = abi.decode(params1, (uint256[]));
        uint256[] memory mData = abi.decode(params2, (uint256[]));

        for(uint256 i = 0;i < pData.length;i ++) {
            uint256 j = 0;
            for(j = 0;j < service_names.length;j ++)
                if(service_names[j] == arrData[i])
                    break;
            if(j == service_names.length)
                service_names.push(arrData[i]);
        }

        providers[msg.sender].services = arrData;
        providers[msg.sender].prices = pData;
        providers[msg.sender].maxCount = mData;
        provider_addrs.push(msg.sender);
        providers[msg.sender].hasRegisterd = true;

        providers[msg.sender].curCount = new uint256[](arrData.length);
        providers[msg.sender].totalTrust = new uint256[](arrData.length);

        for(uint256 i = 0;i < providers[msg.sender].services.length; i ++) {
            providers[msg.sender].curCount[i] = 0;
            providers[msg.sender].totalTrust[i] = 10 ** 7;
        }

        emit Registered(msg.sender, arrData, pData);
    }

    function _isCandidate(
        uint256 cur,
        bytes32[] memory content
    ) private view returns(uint256) {
        address addr = provider_addrs[cur];
        uint256 c = 0;
        for(uint256 j = 0; j < content.length; j ++)
            for(uint256 k = 0; k < providers[addr].services.length; k ++)
                if(providers[addr].services[k] == content[j])
                    c = c + 1;
        if(c == content.length)
            return 1;
        return 0;
    }

    function findService(
        bytes memory params
    ) public view returns (uint256, address[] memory, address[] memory, address[] memory) {
        bytes32[] memory content = abi.decode(params, (bytes32[]));
        uint256 candCount;

        for(uint256 i = 0;i < provider_addrs.length; i ++) {
            candCount += _isCandidate(i, content);
        }

        address[] memory candidates = new address[](candCount);
        uint256[] memory repData = new uint256[](candCount);

        uint256 cur = 0;
        uint256 greyCount = 0;
        uint256 blackCount = 0;
        uint256 whiteCount = 0;
        uint256 maxFee = 0;

        for(uint256 i = 0; i < provider_addrs.length; i ++) {
            uint256 count = 0;
            address addr = provider_addrs[i];
            uint256 price = 0;
            uint256 mark = 0;
            for(uint256 j = 0; j < content.length; j ++) {
                for(uint256 k = 0; k < providers[addr].services.length; k ++) {
                    if(providers[addr].services[k] == content[j]) {
                        count = count + 1;
                        price = price + providers[addr].prices[k];
                        mark = mark + providers[addr].totalTrust[k];
                    }
                }
            }
            if(count == content.length) {
                candidates[cur] = addr;
                repData[cur] = mark / content.length;
                if(repData[cur] >= 6 * 10 ** 7) {
                    whiteCount = whiteCount + 1;
                    if(price > maxFee)
                        maxFee = price;
                }
                else if(repData[cur] >= 3 * 10 ** 7)
                    greyCount = greyCount + 1;
                else if(repData[cur] >= 10 ** 7)
                    blackCount = blackCount + 1;
                cur = cur + 1;
            }
        }

        address[] memory blackList = new address[](blackCount);
        address[] memory greyList = new address[](greyCount);
        address[] memory whiteList = new address[](whiteCount);
        blackCount = 0;
        greyCount = 0;
        whiteCount = 0;

        for(uint256 i = 0;i < cur; i ++) {
            if(repData[i] >= 6 * 10 ** 7) {
                whiteList[whiteCount] = candidates[i];
                whiteCount = whiteCount + 1;
            }
            else if(repData[i] >= 3 * 10 ** 7) {
                greyList[greyCount] = candidates[i];
                greyCount = greyCount + 1;
            }
            else if(repData[i] >= 10 ** 7) {
                blackList[blackCount] = candidates[i];
                blackCount = blackCount + 1;
            }
        }
        
        return (maxFee, blackList, greyList, whiteList);
    }

    function requestService(
        address to,
        bytes memory params,
        bytes memory params1,
        bytes memory params2,
        bytes memory params3,
        bytes memory params4,
        bytes memory params5
    ) public {
        bytes32[] memory arrData = abi.decode(params, (bytes32[]));

        for(uint256 i = 0; i < providers[to].services.length; i ++)
            for(uint256 j = 0; j < arrData.length; j ++)
                if(providers[to].services[i] == arrData[j])
                    require(providers[to].curCount[i] < providers[to].maxCount[i], "Provider cannot provide a service");

        if(requesters[msg.sender].hasRegisterd != true) {
            requester_addrs.push(msg.sender);
            requesters[msg.sender].hasRegisterd = true;
        }

        uint256 cur_req_count = requesters[msg.sender].req_count;

        requesters[msg.sender].requests[cur_req_count].provider = to;
        requesters[msg.sender].requests[cur_req_count].services = arrData;
        requesters[msg.sender].requests[cur_req_count].status = Status.Requested;
        requesters[msg.sender].requests[cur_req_count].Av = abi.decode(params1, (uint256[]));
        requesters[msg.sender].requests[cur_req_count].A = abi.decode(params2, (uint256[]));
        requesters[msg.sender].requests[cur_req_count].R = abi.decode(params3, (uint256[]));
        requesters[msg.sender].requests[cur_req_count].Cr = abi.decode(params4, (uint256[]));
        requesters[msg.sender].requests[cur_req_count].C = abi.decode(params5, (uint256[]));

        requesters[msg.sender].requests[cur_req_count].feedback = new uint256[](arrData.length);

        for(uint256 i = 0;i < arrData.length;i ++)
            requesters[msg.sender].requests[cur_req_count].feedback[i] = 0;

        requesters[msg.sender].req_count = requesters[msg.sender].req_count + 1;

        emit Requested(msg.sender, to, arrData);
    }

    function acceptRequest(
        address req,
        uint256 index,
        bool flag
    ) public {
        bytes32[] memory requested_service = requesters[req].requests[index].services;

        if(flag == true) {
            for(uint256 i = 0; i < providers[msg.sender].services.length; i ++)
                for(uint256 j = 0;j < requested_service.length; j ++)
                    if(providers[msg.sender].services[i] == requested_service[j])
                        require(providers[msg.sender].curCount[i] < providers[msg.sender].maxCount[i],
                            "Provider cannot accept the request, please reject it!");

            requesters[req].requests[index].status= Status.Accepted;

            for(uint256 i = 0; i < providers[msg.sender].services.length; i ++)
                for(uint256 j = 0;j < requested_service.length; j ++)
                    if(providers[msg.sender].services[i] == requested_service[j])
                        providers[msg.sender].curCount[i] = providers[msg.sender].curCount[i] + 1;
            
            emit Accepted(req, msg.sender, requested_service);
        }
        else {
            requesters[req].requests[index].status = Status.Rejected;
            
            emit Rejected(req, msg.sender, requested_service);
        }
    }

    function getWaitingList() public view returns(address[] memory, bytes32[][] memory, uint256[] memory) {
        uint256 wCount = 0;
        for(uint256 i = 0; i < requester_addrs.length; i ++)
            for(uint256 j = 0;j < requesters[requester_addrs[i]].req_count;j ++)
                if(requesters[requester_addrs[i]].requests[j].status == Status.Requested &&
                    requesters[requester_addrs[i]].requests[j].provider == msg.sender)
                    wCount = wCount + 1;
        
        address[] memory addr_arr = new address[](wCount);
        uint256[] memory index_arr = new uint256[](wCount);
        bytes32[][] memory service_arr = new bytes32[][](wCount);

        uint256 cur = 0;
        
        for(uint256 i = 0; i < requester_addrs.length; i ++)
            for(uint256 j = 0;j < requesters[requester_addrs[i]].req_count;j ++)
                if(requesters[requester_addrs[i]].requests[j].status == Status.Requested &&
                    requesters[requester_addrs[i]].requests[j].provider == msg.sender) {
                    addr_arr[cur] = requester_addrs[i];
                    index_arr[cur] = j;
                    service_arr[cur] = requesters[requester_addrs[i]].requests[j].services;
                    cur = cur + 1;
                }

        return (addr_arr, service_arr, index_arr);
    }

    function getProgressList() public view returns(address[] memory, bytes32[][] memory, uint256[] memory) {
        uint256 wCount = 0;
        for(uint256 j = 0;j < requesters[msg.sender].req_count;j ++)
            if(requesters[msg.sender].requests[j].status == Status.Accepted ||
                requesters[msg.sender].requests[j].status == Status.Accept_Viewed)
                wCount = wCount + 1;
        
        address[] memory addr_arr = new address[](wCount);
        uint256[] memory index_arr = new uint256[](wCount);
        bytes32[][] memory service_arr = new bytes32[][](wCount);

        uint256 cur = 0;
        
        for(uint256 j = 0;j < requesters[msg.sender].req_count;j ++)
            if(requesters[msg.sender].requests[j].status == Status.Accepted ||
                requesters[msg.sender].requests[j].status == Status.Accept_Viewed) {
                addr_arr[cur] = msg.sender;
                index_arr[cur] = j;
                service_arr[cur] = requesters[msg.sender].requests[j].services;
                cur = cur + 1;
            }

        return (addr_arr, service_arr, index_arr);
    }

    function getCounts(uint256 index) public view returns(uint256[] memory, uint256[] memory, uint256[] memory, uint256[] memory, uint256[] memory) {
        bytes32[] memory requested_service = requesters[msg.sender].requests[index].services;
        uint256[] memory mData = new uint256[](requested_service.length);
        uint256[] memory tData = new uint256[](requested_service.length);
        uint256[] memory maxData = new uint256[](requested_service.length);
        uint256[] memory minData = new uint256[](requested_service.length);

        address p = requesters[msg.sender].requests[index].provider;

        for(uint256 k = 0;k < requested_service.length;k ++) {
            mData[k] = 0;
            tData[k] = 0;
            maxData[k] = 0;
            minData[k] = 50;
            for(uint256 i = 0;i < requesters[msg.sender].req_count;i ++)
                for(uint256 j = 0;j < requesters[msg.sender].requests[i].services.length; j ++)
                    if(requesters[msg.sender].requests[i].services[j] == requested_service[k]) {
                        if(requesters[msg.sender].requests[i].status == Status.Accepted || 
                            requesters[msg.sender].requests[i].status == Status.Accept_Viewed) {
                            tData[k] = tData[k] + 1;
                            if(requesters[msg.sender].requests[i].provider == p)
                                mData[k] = mData[k] + 1;
                        }
                        if(requesters[msg.sender].requests[i].status == Status.Finished && requesters[msg.sender].requests[i].provider == p) {
                            if(requesters[msg.sender].requests[i].feedback[j] > maxData[k])
                                    maxData[k] = requesters[msg.sender].requests[i].feedback[j];
                            if(requesters[msg.sender].requests[i].feedback[j] < minData[k])
                                minData[k] = requesters[msg.sender].requests[i].feedback[j];
                        }
                    }
        }

        return (mData, tData, maxData, minData, providers[p].curCount);
    }

    function calcFB(uint256 index) public view returns(uint256[] memory, uint256[] memory, uint256[] memory, uint256[] memory, uint256[] memory) {
        return (requesters[msg.sender].requests[index].Av,
                requesters[msg.sender].requests[index].A,
                requesters[msg.sender].requests[index].R,
                requesters[msg.sender].requests[index].Cr,
                requesters[msg.sender].requests[index].C);
    }

    function _calcGlobalTrust(address p, bytes32 s) private view returns(uint256) {
        uint256 sum = 0;
        for(uint256 i = 0; i < requester_addrs.length; i ++)
            sum += reputation[requester_addrs[i]][p][s];
        return sum;
    }

    function giveFeedback(
        uint256 index,
        bytes memory param,
        bytes memory param1
    ) public {
        // uint256[] memory fbData = _calcFB(index, params1, params2, params3, params4, params5);
        uint256[] memory fbData = abi.decode(param, (uint256[]));
        uint256[] memory hData = abi.decode(param1, (uint256[]));
        address p = requesters[msg.sender].requests[index].provider;

        for(uint256 i = 0; i < fbData.length;i ++)
            reputation[msg.sender][p][requesters[msg.sender].requests[index].services[i]] = fbData[i];

        requesters[msg.sender].requests[index].status= Status.Finished;

        for(uint256 i = 0; i < providers[p].services.length; i ++) {
            for(uint256 j = 0;j < requesters[msg.sender].requests[index].services.length; j ++)
                if(providers[p].services[i] == requesters[msg.sender].requests[index].services[j]) {
                    if(providers[p].curCount[i] > 3)
                        providers[p].totalTrust[i] = (hData[i] * reputation[msg.sender][p][providers[p].services[i]] + (10 ** 4 - hData[i]) * _calcGlobalTrust(p, providers[p].services[i]));
                    else
                        providers[p].totalTrust[i] = ((10 ** 4 - hData[i]) * reputation[msg.sender][p][providers[p].services[i]] + hData[i] * _calcGlobalTrust(p, providers[p].services[i]));
                    providers[p].curCount[i] = providers[p].curCount[i] - 1;
                }
        }
    }

    function getMarks(uint256 index) public returns(uint256[] memory, uint256[] memory) {
        address p = requesters[msg.sender].requests[index].provider;
        uint256[] memory gData = new uint256[](providers[p].services.length);
        uint256[] memory tData = new uint256[](providers[p].services.length);
        for(uint256 i = 0;i < providers[p].services.length; i ++) {
            gData[i] = _calcGlobalTrust(p, providers[p].services[i]);
            tData[i] = providers[p].totalTrust[i];
        }

        return (gData, tData);
    }
}