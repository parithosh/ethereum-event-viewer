Coding test Slock.it:

Please write a test application to investigate or list or visualize the ENS contract events of
 the past (e.g. the last 1 or 2 days). focussing in particular on the bid revelation event:
 unsealBid(bytes32 _hash, uint256 _value, bytes32 _salt)

Task definition: 
    -Test application to read,list and visualize ENS contract events
    -Duration/scope: 1 or 2 days. Find a way to convert time range into block range needed by web3 filters(Maybe add a toggle option to increase this for a later version)
    -Focus on unsealbid events
    -Check if node is synced or not
    -Have a UI for interactions, any GUI (choose to attempt webapp with node, modifying old project code for quick iterations)
    
Note: The ethereum address of the ENS-Registrar Contract is: 0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef

Instructions:


Experience:
    -Had some issues with syncing node, slow internet delayed some progress. Try and schedule this for the night from next time. 
    -Having a look a the ENS contract, the unsealBid function sends out the event BidRevelead. But the cancelBid function also sends out the event. Scope of task seems to be to focus on unsealBid's revelation event. Look into it in case any obvious mistake was made, else try and find a workaround/accept as a constraint. 
    -Had some issues with the code, which seemed to be due to following the wrong version of web3. Make sure you check before deep diving into solving errors. 
    -Needed to find a way to convert utc or dates into block ranges. solution: find latest block time, and subtract 86400/average_block_time