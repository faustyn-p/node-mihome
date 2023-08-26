const Device = require('../device-miio');

module.exports = class extends Device {

	static model = 'yeelink.light.bslamp2';
	static name = 'Yeelight Bedside Lamp 2';
	static image = 'https://cdn.cnbj1.fds.api.mi-img.com/iotweb-user-center/developer_16790701029405KNF9HsI.png';

	constructor(opts) {
		super(opts);
		this._propertiesToMonitor = [
			'power',
			'bright',
			'ct',
			'rgb'
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

	getColor() {
		return this.properties?.['rgb'];
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
			return this.miioCall('set_ct', [v]);
		}

		return Promise.reject(new Error(`Temperature should be between 1700 and 6500 kelvins`));
	}

	setColor(v) {
		if (v >= 1 && v <= 16777215) {
			return this.miioCall('set_rgb', [v]);
		}

		return Promise.reject(new Error(`Not valid RGB Color`));
	}

};
