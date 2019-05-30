# webturtle
A web miner for TurtleCoin

## How to include to your website
In order to implement the miner to your website you have to do the following, easy steps:

 - Download our script and add it to your website  
  `<script src='turtleminer.js'></script>`  

 - Edit the configuration
  ```
const config = {
	pool: "trtl.pool.mine2gether.com",	// pool url
	port: 2225,	// pool port
	wallet: "TRTLv198neLLCadgT3rzAnepD9aDf4MMC33MDMbkkELJcRAiZyH35fL3qG7xjJDSUCGCRJFWwxyvNDCwxy8kVpbFTsx654w8PEJ", // your wallet address
	speed: 100,		// cpu speed/usage in %
	threads: 4,		// number of threads using for mining
	workerName: "WebMiner"	// the miner name also knows as 'password' for the pool, default 'x'
}
  ```

  - Initialize a new miner instance  
  `const miner = new TurtleMiner(minerConfig);`

  - Start mining whenever you want:  
  `miner.start();`

  - Stop mining whenever you want:  
  `miner.stop();`
