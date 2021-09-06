const fetch = require("node-fetch");
const SupportedModels = require("./SupportedModels");
const Device = require("./Device");
var ValidCommands = ["turn", "brightness", "color", "colorTem"];
class Govee {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = "https://developer-api.govee.com/v1/"
    }
    /**
     * @returns {Promise<{data: {devices: Device[], message: string, code: number}}>}
     */
    async GetDevices() {
        if(!this.apiKey) throw new Error("An APIKey must be provided in the instance")
        const url = `${this.baseURL}devices`;
        const options = {
            "method": "GET",
            "headers": {
                "Govee-API-Key": this.apiKey,
                "Accept": "application/json"
            }
        }
        return fetch(url, options).then((res) => res.json()).then((data) => {
            return {
                data: {
                    devices: data.data.devices.map((d) => {return new Device(d.device, d.model, d.deviceName, d.controllable, d.retrievable, d.supportedCmds, d.properties)}),
                },
                message: data.message,
                code: data.code
            };
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * @param {string} device_address 
     * @param {string} device_model 
     * @param {{name: string, value: any}} cmd 
     */
    async RunCMD(device_address, device_model, cmd) {
        if(!this.apiKey) throw new Error("An APIKey must be provided in the instance")
        if(ValidCommands.indexOf(cmd.name) == -1) throw new Error("Invalid Command name");
        const url = `${this.baseURL}devices/control`;
        var payload = {
            "device": device_address,
            "model": device_model,
            "cmd": cmd,
        };
        const options = {
            "method": "PUT",
            "headers": {
                "Govee-API-Key": this.apiKey,
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(payload),
        }
        return fetch(url, options).then((res) => res.json()).then((data) => {
            return data;
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * @param {string} device_address 
     * @param {string} device_model 
     * @returns {Promise<{data: {device: string, model: string, properties: [{"online": boolean, "powerState": "on" | "off", "brightness": number, "color": {r: number, g: number, b: number}}]}}>}
     */
    async GetDeviceState(device_address, device_model) {
        if(!this.apiKey) throw new Error("An APIKey must be provided in the instance")
        if(SupportedModels.indexOf(device_model) == -1) throw new Error("This Device is not supported in this verison.")
        const url = `${this.baseURL}devices/state?device=${encodeURI(device_address)}&model=${device_model}`;
        const options = {
            "method": "GET",
            "headers": {
                "Govee-API-Key": this.apiKey,
                "Accept": "application/json"
            }
        }
        return fetch(url, options).then((res) => res.json()).then((data) => {
            return data;
        }).catch((err) => {throw new Error(err)});
    }
}
module.exports = Govee;