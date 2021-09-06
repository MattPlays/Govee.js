const fetch = require("node-fetch");
module.exports = class Device {
    /**
     * 
     * @param {string} device - Mac address of your device.
     * @param {string} model - Product Model of your device.
     * @param {string} deviceName - The Device Name
     * @param {boolean} controllable - Controllable will be true when the device support commands to control.
     * @param {boolean} retrievable - Retrievable will be true when the device support querying the current
device state.
     * @param {string[]} supportCmds - Commands supported by the device.
 Valid Values in the array: `"turn"`, `"brightness"`, `"color"`, `"colorTem"`
     * @param {object} properties 
     * @returns {Device} - Return your devices supported by the Govee API.
     */
    constructor(device, model, deviceName, controllable, retrievable, supportCmds, properties) {
        this.device = device;
        this.model = model;
        this.deviceName = deviceName;
        this.controllable = controllable;
        this.retrievable = retrievable;
        this.supportCmds = supportCmds;
        this.properties = properties;
    }
    /**
     * 
     * @param {string} apiKey
     * @returns {Promise<{data: any, message: string, code: number}>}
     */
    async TurnOn(apiKey) {
        const url = `https://developer-api.govee.com/v1/devices/control`
        let payload = {
            "device": this.device,
            "model": this.model,
            "cmd": {
                "name": "turn",
                "value": "on"
            }
        }
        const options = {
            "method": "PUT",
            "headers": {
                "Govee-API-Key": apiKey,
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(payload),
        }
        return fetch(url, options).then((res) => res.json()).then((data) => {
            return data;
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * 
     * @param {string} apiKey 
     * @returns {Promise<{data: any, message: string, code: number}>}
     */
    async TurnOff(apiKey) {
        const url = `https://developer-api.govee.com/v1/devices/control`
        let payload = {
            "device": this.device,
            "model": this.model,
            "cmd": {
                "name": "turn",
                "value": "off"
            }
        }
        const options = {
            "method": "PUT",
            "headers": {
                "Govee-API-Key": apiKey,
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(payload),
        }
        return fetch(url, options).then((res) => res.json()).then((data) => {
            return data;
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * 
     * @param {string} apiKey 
     * @param {number} value - Number between 0 and 100
     * @returns {Promise<{data: any, message: string, code: number}>}
     */
    async ChangeBrightness(apiKey, value) {
        if(value > 100) throw new Error("Brightness value must be between 0 and 100");
        if(value < 0) throw new Error("Brightness value must be between 0 and 100");
        const url = `https://developer-api.govee.com/v1/devices/control`
        let payload = {
            "device": this.device,
            "model": this.model,
            "cmd": {
                "name": "brightness",
                "value": Math.abs(value)
            }
        }
        const options = {
            "method": "PUT",
            "headers": {
                "Govee-API-Key": apiKey,
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(payload),
        }
        return fetch(url, options).then((res) => res.json()).then((data) => {
            return data;
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * 
     * @param {string} apiKey 
     * @param {number} r - Red value between 0 and 255
     * @param {number} g - Green value between 0 and 255
     * @param {number} b - Blue value between 0 and 255
     * @returns {Promise<{data: any, message: string, code: number}>}
     */
    async ChangeColor(apiKey, r, g, b) {
        if((r > 255 || r < 0) || (g > 255 || g < 0) || (b > 255 || b < 0)) throw new Error("Value\'s R,G,B must be between 0 and 255");
        const url = `https://developer-api.govee.com/v1/devices/control`
        let payload = {
            "device": this.device,
            "model": this.model,
            "cmd": {
                "name": "color",
                "value": {
                    "r": r,
                    "g": g,
                    "b": b
                }
            }
        }
        const options = {
            "method": "PUT",
            "headers": {
                "Govee-API-Key": apiKey,
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(payload),
        }
        return fetch(url, options).then((res) => res.json()).then((data) => {
            return data;
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * @param {string} apiKey
     * @param {number} value - the valid values are returned by DeviceList, there will be one more field
named `“properties”`
     * @returns {Promise<{data: any, message: string, code: number}>}
     */
    async ChangeColorTemperature(apiKey, value) {
        const url = `https://developer-api.govee.com/v1/devices/control`
        let payload = {
            "device": this.device,
            "model": this.model,
            "cmd": {
                "name": "colorTemp",
                "value": value
            }
        }
        const options = {
            "method": "PUT",
            "headers": {
                "Govee-API-Key": apiKey,
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(payload),
        }
        return fetch(url, options).then((res) => res.json()).then((data) => {
            return data;
        }).catch((err) => {throw new Error(err)}); 
    }
}