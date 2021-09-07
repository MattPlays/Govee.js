const fetch = require("node-fetch");
const SupportedModels = ["H6160", "H6163", "H6104", "H6109", "H6110", "H6117", "H6159", "H7022", "H6086", "H6089", "H6182", "H6085", "H7014", "H5081", "H6188", "H6135", "H6137", "H6141", "H6142", "H6195", "H7005", "H6083", "H6002", "H6003", "H6148", "H6052", "H6143", "H6144", "H6050", "H6199", "H6054", "H5001", "H6050", "H6154", "H6143", "H6144", "H6072", "H6121", "H611A", "H5080", "H6062", "H614C", "H615A", "H615B", "H7020", "H7021"," H614D","H611Z", "H611B", "H611C", "H615C", "H615D", "H7006", "H7007", "H7008", "H7012", "H7013", "H7050", "H6051", "H6056", "H6061", "H6058", "H6073", "H6076", "H619A", "H619C", "H618A", "H618C", "H6008", "H6071", "H6075", "H614A", "H614B", "H614E", "H618E, H619E"];
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
                    devices: data.data.devices.map((d) => {return new Device(d.device, d.model, d.deviceName, d.controllable, d.retrievable, d.supportCmds, d.properties)}),
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