const Device = require('../device-miio');

module.exports = class extends Device {

	static model = 'yeelink.light.lamp1';
	static name = 'Yeelight Desk Lamp 1';
	static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-user-center/developer_1678870888550gdE3eYDw.png';

	constructor(opts) {
		super(opts);
		this._propertiesToMonitor = [
			'power',
			'bright',
			'ct'
		];
	}

	getPower() {
		switch (this.properties?.['power']) {
			case 'on':
				return true;
			case 'off':
				return false;
			default:
				return this.properties?.['power'];
		}
	}

	getBrightness() {
		return this.properties?.['bright'];
	}

	getColorTemperature() {
		return this.properties?.['ct'];
	}

	setPower(v) {
		return this.miioCall('set_power', [v]);
	}

	setBrightness(v) {
		if (v >= 1 && v <= 100) {
			return this.miioCall('set_bright', [v]);
		}

		return Promise.reject(new Error(`Light brightness should be between 1 and 4`));
	}

	setColorTemperature(v) {
		if (v >= 1700 && v <= 6500) {
			return this.miioCall('set_ct_abx', [v]);
		}

		return Promise.reject(new Error(`Temperature should be between 1700 and 6500 kelvins`));
	}
};
