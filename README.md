# Govee.js
 Govee.js is a Javascript Wrapper for the Govee v1.3 API

 # Installation
 ```bash
 npm i govee.js
```
# Functions
## GetDevices
```javascript
const Govee = require("govee.js");
const API = new Govee("APIKEY");
API.GetDevices().then((res) => {
    console.log(res);
})
```

## RunCMD
### Parameters
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| device_address | `string` | The Mac Address of the device you want to run a CMD on |
| device_model | `string` | The Device Model |
| cmd | `{name: string, value: any}` | The Command name and value you want to run |
```javascript
const Govee = require("govee.js");
const API = new Govee("APIKEY");

API.RunCMD("DUMMY_DEVICE_ADDRESS", "DUMMY_DEVICE_MODEL", {
    name: "turn",
    value: "off"
}).then((res) => {
    /*
        res will be {
            data: {},
            code: 200,
            message: "Success"
        } if successful
    */
    console.log(res)
})
```
## GetDeviceState
### Parameters
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| device_address | `string` | The Mac Address of the device |
| device_model | `string` | The Device Model |

```javascript
const Govee = require("govee.js");
const API = new Govee("APIKEY");

API.GetDeviceState("DUMMY_DEVICE_ADDRESS", "DUMMY_DEVICE_MODEL").then((res) => {
    console.log(res);
})
```

# Device
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| device | `string` | The Mac Address for your device
| model | `string` | Product Model of your device |
| deviceName | `string` | The name of your device |
| controllable | `boolean` | Controllable will be true when the device support commands to control. |
| retrievable | `boolean` | Retrievable will be true when the device support querying the current device state.|
| supportedCmds | `string[]` | Commands supported by the device. |
| properties | `object` | The properties of your device |

## Functions
The Device class has 5 functions **`TurnOn`, `TurnOff`, `ChangeBrightness`, `ChangeColor`, `ChangeColorTemperature`** <br>
Usage for each of these functions are as follows:

### TurnOn
```javascript
const Govee = require("govee.js");
const API = new Govee("APIKEY");
/*
The Function TurnOn has 1 Parameter which is the APIKEY
*/
(async () => {
const Devices = await API.GetDevices().then((res) => {
    return res.data.devices;
})
Devices.forEach((device) => {
    device.TurnOn(API.apiKey).then((res) => {
        /*
        res will be {
            data: {},
            code: 200,
            message: "Success"
        } if successful
        */
    })
})
})()
```
### TurnOff
```javascript
const Govee = require("govee.js");
const API = new Govee("APIKEY");
/*
The Function TurnOff has 1 Parameter which is the APIKEY
*/
(async () => {
const Devices = await API.GetDevices().then((res) => {
    return res.data.devices;
})
Devices.forEach((device) => {
    device.TurnOff(API.apiKey).then((res) => {
        /*
        res will be {
            data: {},
            code: 200,
            message: "Success"
        } if successful
        */
    })
})
})()
```
### ChangeBrightness
```javascript
const Govee = require("govee.js");
const API = new Govee("APIKEY");
/*
The Function ChangeBrightness has 2 Parameter which is the APIKEY and a value;
value should be between 0 and 100
*/
(async () => {
const Devices = await API.GetDevices().then((res) => {
    return res.data.devices;
})
Devices.forEach((device) => {
    device.ChangeBrightness(API.apiKey, 50).then((res) => {
        /*
        res will be {
            data: {},
            code: 200,
            message: "Success"
        } if successful
        */
    })
})
})()
```
### ChangeColor
```javascript
const Govee = require("govee.js");
const API = new Govee("APIKEY");
/*
The Function ChangeBrightness has 4 Parameter which is the APIKEY,
r which is a value between 0 and 255
g which is a value between 0 and 255
b which is a value between 0 and 255
*/
(async () => {
const Devices = await API.GetDevices().then((res) => {
    return res.data.devices;
})
Devices.forEach((device) => {
    device.ChangeColor(API.apiKey, 255, 255, 255).then((res) => {
        /*
        res will be {
            data: {},
            code: 200,
            message: "Success"
        } if successful
        */
    })
})
})()
```
### ChangeColorTemperature
```javascript
const Govee = require("govee.js");
const API = new Govee("APIKEY");
/*
The Function ChangeColorTemperature has 2 Parameter which is the APIKEY and value;
value will be a number between the min and max ColorTemp for your device you can get this in the properties of the device
*/
(async () => {
const Devices = await API.GetDevices().then((res) => {
    return res.data.devices;
})
Devices.forEach((device) => {
    device.ChangeColorTemperature(API.apiKey, 7000).then((res) => {
        /*
        res will be {
            data: {},
            code: 200,
            message: "Success"
        } if successful
        */
    })
})
})()
```

