import { Device } from "./Device";
export class Govee {
    constructor(apiKey: string)
    async GetDevices(): Promise<{data: {devices: Device[], message: string, code: number}}>;
    async RunCMD(device_address: string, device_model: string, cmd: {name: string, value: any}): Promise<any>;
    async GetDeviceState(device_address: string, device_model: string): Promise<{data: {device: string, model: string, properties: [{"online": boolean, "powerState": "on" | "off", "brightness": number, "color": {r: number, g: number, b: number}}]}}>;
}