export class Device {
    constructor(device: string, model: string, deviceName: string, controllable: boolean, retrievable: boolean, supportCmds: string[], properties: object);
    TurnOn(apiKey: string): Promise<{data: any, message: string, code: number}>;
    TurnOff(apiKey: string): Promise<{data: any, message: string, code: number}>;
    ChangeBrightness(apiKey: string, value: number): Promise<{data: any, message: string, code: number}>;
    ChangeColor(apiKey: string, r: number, g: number, b: number): Promise<{data: any, message: string, code: number}>;
    ChangeColorTemperature(apiKey: string, value: number): Promise<{data: any, message: string, code: number}>;
}