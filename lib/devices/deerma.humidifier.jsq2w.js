const Device = require('../device-miio');

module.exports = class extends Device {

	static model = 'deerma.humidifier.jsq2w';
	static name = 'Xiaomi Smart Humidifier 2';
	static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-user-center/developer_1679047690594d0zLHhsq.png';

	constructor(opts) {
		super(opts);

		this._miotSpecType = 'urn:miot-spec-v2:device:humidifier:0000A00E:deerma-jsq2w:1';
		this._propertiesToMonitor = [
			'humidifier:on',
			'humidifier:fault',
			'humidifier:fan-level',
			'humidifier:target-humidity',
			'environment:relative-humidity',
			'environment:temperature',
		];
	}

	getPower() {
		switch (this.properties?.['humidifier:on']) {
			case 'on':
				return true;
			case 'off':
				return false;
			default:
				return undefined;
		}
	}

	getFault() {
		switch (this.properties?.['humidifier:fault']) {
			case 0:
				return 'No Faults';
			case 1:
				return 'Insufficient Water';
			case 2:
				return 'Water Separation';
			default:
				return 'Unknown fault';
		}
	}

	getFanLevel() {
		const fanLevel = parseInt(this.properties['humidifier:fan-level'], 10);
		if (fanLevel >= 1 && fanLevel <= 4) return fanLevel;
		return undefined;
	}

	getTartgetHumidity() {
		return this.properties['humidifier:target-humidity'];
	}

	getTemperature() {
		return this.properties['environment:temperature'];
	}

	getHumidity() {
		return this.properties['environment:relative-humidity'];
	}

	setPower(v) {
		return this.miotSetProperty('humidifier:on', v);
	}

	setFanLevel(v) {
		if (v >= 1 && v <= 4) {
			return this.miotSetProperty('humidifier:fan-level', v);
		}

		return Promise.reject(new Error(`Fan level should be between 1 and 4`));
	}

	setTargetHumidity(v) {
		if (v >= 0 && v <= 100) {
			return this.miotSetProperty('humidifier:fan-level', v);
		}

		return Promise.reject(new Error(`Invalid target humidity: ${v}`));
	}
};
