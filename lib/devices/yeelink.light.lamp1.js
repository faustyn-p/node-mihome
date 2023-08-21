const Device = require('../device-miio');

module.exports = class extends Device {

	static model = 'yeelink.light.lamp1';
	static name = 'Yeelight Desk Lamp 1';
	static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-user-center/developer_1678870888550gdE3eYDw.png';

	constructor(opts) {
		super(opts);

		this._miotSpecType = 'urn:miot-spec-v2:device:light:0000A001:yeelight-lamp1:1';
		this._propertiesToMonitor = [
			'light:on',
			'light:brightness',
			'light:color-temperature',
		];
	}

	getPower() {
		switch (this.properties?.['light:on']) {
			case 'on':
				return true;
			case 'off':
				return false;
			default:
				return undefined;
		}
	}

	getBrightness() {
		return this.properties?.['light:brightness'];
	}

	getColorTemperature() {
		return this.properties?.['light:color-temperature'];
	}

	setPower(v) {
		return this.miotSetProperty('light:on', v);
	}

	setBrightness(v) {
		if (v >= 1 && v <= 100) {
			return this.miotSetProperty('light:brightness', v);
		}

		return Promise.reject(new Error(`Light brightness should be between 1 and 4`));
	}

	setColorTemperature(v) {
		if (v >= 1700 && v <= 6500) {
			return this.miotSetProperty('light:color-temperature', v);
		}

		return Promise.reject(new Error(`Temperature should be between 1700 and 6500 kelvins`));
	}

};
