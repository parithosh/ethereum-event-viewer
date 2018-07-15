ENS event visualizer:
===================================

 write a test application to investigate or list or visualize the ENS contract events of
 the past (e.g. the last 1 or 2 days). focussing in particular on the bid revelation event:  
	<space>	 unsealBid(bytes32 _hash, uint256 _value, bytes32 _salt)  

## Task definition:   
    -Test application to read,list and visualize ENS contract events   
    -Duration/scope: 1 or 2 days. Find a way to convert time range into block range needed by web3 filters(Maybe add a toggle option to increase this for a later version)   
    -Focus on unsealbid events  
    -Check if node is synced or not  
    -Have a UI for interactions, any GUI (choose to attempt webapp with node, modifying old project code for quick iterations)  
    
Note: The ethereum address of the ENS-Registrar Contract is: 0x6090A6e47849629b7245Dfa1Ca21D94cd15878Ef  

## Instructions:  
    -Clone the github repo  
    -Run index.html on a browser of your choice  
    -Click on the block number desired to get more information  
    -Hit reload at the bottom of the page to reload and include the latest blocks  

## Experience:  
    -Had some issues with syncing node, slow internet delayed some progress.Try and schedule this for the night from next time    
    -Having a look a the ENS contract, the unsealBid function sends out the event BidRevelead. But the cancelBid function also sends out the event. Scope of task seems to be to focus on unsealBid's revelation event. Look into it in case any obvious mistake was made, else try and find a workaround/accept as a constraint    
    -Had some issues with the code, which seemed to be due to following the wrong version of web3. Make sure you check before deep diving into solving errors    
    -Needed to find a way to convert utc or dates into block ranges. solution: find latest block, and subtract 86400/average_block_time   
    -Settled for a local copy of web3.min.js, usually npm would handle the web3 installation and locate it in the node_modules, but mac osx was giving some errors with the compiler and refusing to install it. Had to use a global pre-compiled version of web3v1.0.0    
    -Instead of the local copy of web3.min.js, I tried using a CDN source as well, but most cdn sources i could find seemed to be of v0.2 and I have used v1.0.0-beta.34. Functions i have used broke under the earlier build due to changes. decided against this method    
    -Using materialize from older project to get the view on webapp   
    -Using etherscan, verified the result, looks to be in order    
    -Using infura as the web3 provider instead of local, this solution has its limitations with scale and requests, but for this application it should be enough. It adds the advantage that we don't need to worry about node syncing. 

## Future work:
    -Could use a local node, can be achieved by changing the web3 provider. Need to add a check for if the node is synced before proceeding  
    -Include tests for the system, include tests before webApp runs   
    -Look at other GUI options, maybe a more visual display of addresses or events  
    -Make the script push events at intervals, as new events occur on the chain push it onto the webApp  
    -Enable selection of date range for events,and the events       
    

## Contact info:  
Feel free to contact me to discuss any issues, questions, or comments. My contact info can be found on my GitHub page.