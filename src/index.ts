import axios from "axios";
const instance = axios.create({
    baseURL: "https://developer-api.govee.com/v1",
    responseType: "json"
})
export interface Device {
    device: string,
    model: string,
    deviceName: string,
    controllable: boolean,
    retrievable: boolean,
    supportCmds: string[],
    properties: object,
}
class Govee {
    apiKey: string;
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    };
    public ListDevices = async(): Promise<{data: {"devices": Device[]}, message: string, code: number}> => {
        return instance.get("/devices", {
            headers: {
                "Govee-API-Key": this.apiKey
            }
        }).then(({data}) => {
            return data;
        }).catch((err) => {throw new Error(err)});
    };
    public RunCMD = async(device_address: string, device_model: string, cmd: {name: any, value: any}): Promise<{code: number, message: string, data: {}}> => {
        return instance.put("/devices/control", {
            "device": device_address,
            "model": device_model,
            "cmd": cmd
        }, {
            headers: {
                "Govee-API-Key": this.apiKey
            }
        }).then(({data}) => {
            return data;
        }).catch((err) => {throw new Error(err)});
    }
    public GetDeviceState = async(device_address: string, device_model: string): Promise<{data: {device: string, modeL: string, properties: Map<string, any>[]}, message: string, code: number}> => {
        return instance.get("/devices/state", {
            headers: {
                "Govee-API-Key": this.apiKey
            },
            params: {
                "device": device_address,
                "model": device_model
            }
        }).then(({data}) => {
            return data;
        }).catch((err) => {throw new Error(err)});
    }
}
export {Govee};