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