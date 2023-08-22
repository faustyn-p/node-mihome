const Device = require('../device-miio');

module.exports = class extends Device {

	static model = 'roborock.vacuum.a08';
	static name = 'Roborock S6 Pure';
	static image = 'https://cdn.awsusor1.fds.api.mi-img.com/iotweb-product-center/developer_1575612793853JIRYdIrl.png';

	constructor(opts) {
		super(opts);

		this._miotSpecType = 'urn:miot-spec-v2:device:vacuum:0000A006:roborock-a08:1';
		this._propertiesToMonitor = [
			'vacuum:status',
			'vacuum:mode',
			'battery:battery-level',
		];
	}

	getStatus() {
		switch (this.properties?.['vacuum:status']) {
			case 2: return 'Off';
			case 3: return 'Idle';
			case 5: return 'Sweeping';
			case 6: return 'Go Charging';
			case 7: return 'Remote Control';
			case 8: return 'Charging';
			case 9: return 'Charging Error';
			case 10: return 'Paused';
			case 11: return 'Partial Sweeping';
			case 12: return 'Error';
			case 14: return 'Updating';
			case 15: return 'Back Sweeping';
			case 16: return 'Target Sweeping';
			case 17: return 'Area Sweeping';
			case 18: return 'Selected Sweeping';
			default: 'Unknown';
		}
	}

	getMode() {
		switch (this.properties?.['vacuum:mode']) {
			case 101: return 'Silent';
			case 102: return 'Basic';
			case 103: return 'Strong';
			case 104: return 'Full Speed';
			default: return 'Idle';
		}
	}

	getBatteryLevel() {
		return this.properties?.['battery:battery-level'];
	}

	startSweep() {
		return this.miotCallAction('vacuum:status', 1, 'vacuum:start-sweep');
	}

	stopSweep() {
		return this.miotCallAction('vacuum:status', 2, 'vacuum:stop-sweeping');
	}

	backToBase() {
		return this.miotCallAction('battery:battery-level', 1, 'battery:start-charge');
	}
};
