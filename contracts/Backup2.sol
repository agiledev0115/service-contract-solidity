uint256 wCount = 0;
        for(uint256 i = 0; i < requester_addrs.length; i ++)
            for(uint256 j = 0;j < requesters[requester_addrs[i]].req_count;j ++)
                if(requesters[requester_addrs[i]].requests[j].status == Status.Accepted ||
                   requesters[requester_addrs[i]].requests[j].status == Status.Accept_Viewed)
                    wCount = wCount + 1;
        
        address[] memory addr_arr = new address[](wCount);
        uint256[] memory index_arr = new uint256[](wCount);
        bytes32[][] memory service_arr = new bytes32[][](wCount);

        uint256 cur = 0;
        
        for(uint256 i = 0; i < requester_addrs.length; i ++)
            for(uint256 j = 0;j < requesters[requester_addrs[i]].req_count;j ++)
                if(requesters[requester_addrs[i]].requests[j].status == Status.Accepted ||
                   requesters[requester_addrs[i]].requests[j].status == Status.Accept_Viewed) {
                    addr_arr[cur] = requester_addrs[i];
                    index_arr[cur] = j;
                    service_arr[cur] = requesters[requester_addrs[i]].requests[j].services;
                    cur = cur + 1;
                }

        return (addr_arr, service_arr, index_arr);