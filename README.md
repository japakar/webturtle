# webturtle
A web miner for TurtleCoin

## How to include to your website
In order to implement the miner to your website you have to do the following, easy steps:

 - Download our script and add it to your website  
  `<script src='turtleminer.js'></script>`  
    
 - Edit the configuration
  ```
  const minerConfig = {  
      pool: "herominers",	// pool name; available: mine2gether, minerrocks, hashvault, cryptopool, semipool, turtlepool, herominers  
      wallet: "TRTLv198neLLCadgT3rzAnepD9aDf4MMC33MDMbkkELJcRAiZyH35fL3qG7xjJDSUCGCRJFWwxyvNDCwxy8kVpbFTsx654w8PEJ", // your wallet address. This one is for donations  
      minerName: "WebMiner"	// the miner name also knows as 'password' for the pool, default 'x'  
	  
      throttle: 10,	// cpu throttle 70 = 30% CPU usage, 30 = 70% CPU usage  
      threads: 4,		// number of threads using for mining  
		
      paymentId: "",	// IN DEVELOPMENT! a payment id, only few pools support this  
      fixedDiff: -1,	// IN DEVELOPMENT! a fixed difficulty, -1 to auto detect  
  }
  ```
  
  - Initialize a new miner instance  
  `const miner = new TurtleMiner(minerConfig);`
  
  - Start mining whenever you want:  
  `miner.start();`
  
  - Stop mining whenever you want:
  `miner.stop();`
