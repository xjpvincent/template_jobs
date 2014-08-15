// Google Analytics Configuration Variables
var mobileConfig = {
	mobileDevice: 0,
	market: location.pathname.substr(1,2).toLowerCase(),
	language: location.pathname.substr(4,2).toLowerCase(),
	brand: location.pathname.substr(7,2).toLowerCase()
}

var gaConfig = {
	staging: (location.host == "www.landrover.com" || location.host == "global.landrover.com" || location.host == "web01.landrover.com" || location.host == "web02.landrover.com" || location.host == "web03.landrover.com") ? 0 : 1,
	page: {
		url: location.pathname,
		sreferrer: null,
		campaignid: null,
		market: mobileConfig.market,
		language: mobileConfig.language,
		brand: mobileConfig.brand,
		deeplink: {
			story: null,
			content: null
		},
		domain: null
	},
	gaCampaign: {
		content: null,
		medium: null,
		campaign: null,
		term: null,
		source: null
	},
	gaCookie: {
		utma: null,
		utmb: null,
		utmc: null,
		utmv: null,
		utmx: null,
		utmz: null
	},
	gaTracking: {
		enabled: 1
	},
	accounts: {
		globalAccount: null,
		marketAccount: null
	},
	script: {
		url: null,
		eventsload: 0,
		domload: 0,
		mapload: 0,
		gaload: null
	}
}