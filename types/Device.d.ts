export class Device {
    constructor(device: string, model: string, deviceName: string, controllable: boolean, retrievable: boolean, supportedCmds: string[], properties: object);
    async TurnOn(apiKey: string): Promise<any>;
    async TurnOff(apiKey: string): Promise<any>;
    async ChangeBrightness(apiKey: string, value: number): Promise<any>;
    async ChangeColor(apiKey: string, r: number, g: number, b: number): Promise<any>;
    async ChangeColorTemperature(apiKey: string, value: number): Promise<any>;
}