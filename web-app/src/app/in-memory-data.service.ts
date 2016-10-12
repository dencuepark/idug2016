import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let devices = [
      {
        "MessageId": "3",
        "DeviceId": "1234",
        "Timestamp": "value",
        "TemperatureData": {
          "ambientTemperature": "33",
          "ambientTemperature-celsiusToFahrenheit": "33",
          "targetTemperature": "35"
        },
        "AccelerometerData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "HumidityData": {
          "humidityTemperature": "value",
          "humidityTemperature-celsiusToFahrenheit": "value",
          "relativeHumidity": "value"
        },
        "MagnetometerData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "BarometerData": "value",
        "GyroscopeData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "LuxometerData": "value"
      },
      {
        "MessageId": "3",
        "DeviceId": "2345",
        "Timestamp": "value",
        "TemperatureData": {
          "ambientTemperature": "33",
          "ambientTemperature-celsiusToFahrenheit": "33",
          "targetTemperature": "35"
        },
        "AccelerometerData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "HumidityData": {
          "humidityTemperature": "value",
          "humidityTemperature-celsiusToFahrenheit": "value",
          "relativeHumidity": "value"
        },
        "MagnetometerData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "BarometerData": "value",
        "GyroscopeData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "LuxometerData": "value"
      },
      {
        "MessageId": "3",
        "DeviceId": "3465",
        "Timestamp": "value",
        "TemperatureData": {
          "ambientTemperature": "33",
          "ambientTemperature-celsiusToFahrenheit": "33",
          "targetTemperature": "35"
        },
        "AccelerometerData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "HumidityData": {
          "humidityTemperature": "value",
          "humidityTemperature-celsiusToFahrenheit": "value",
          "relativeHumidity": "value"
        },
        "MagnetometerData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "BarometerData": "value",
        "GyroscopeData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "LuxometerData": "value"
      },
      {
        "MessageId": "3",
        "DeviceId": "4567",
        "Timestamp": "value",
        "TemperatureData": {
          "ambientTemperature": "33",
          "ambientTemperature-celsiusToFahrenheit": "33",
          "targetTemperature": "35"
        },
        "AccelerometerData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "HumidityData": {
          "humidityTemperature": "value",
          "humidityTemperature-celsiusToFahrenheit": "value",
          "relativeHumidity": "value"
        },
        "MagnetometerData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "BarometerData": "value",
        "GyroscopeData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "LuxometerData": "value"
      },
      {
        "MessageId": "3",
        "DeviceId": "5678",
        "Timestamp": "value",
        "TemperatureData": {
          "ambientTemperature": "33",
          "ambientTemperature-celsiusToFahrenheit": "33",
          "targetTemperature": "35"
        },
        "AccelerometerData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "HumidityData": {
          "humidityTemperature": "value",
          "humidityTemperature-celsiusToFahrenheit": "value",
          "relativeHumidity": "value"
        },
        "MagnetometerData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "BarometerData": "value",
        "GyroscopeData": {
          "x": "value",
          "y": "value",
          "z": "value"
        },
        "LuxometerData": "value"
      }

    ];
    return {devices};
  }
}
/*{DeviceId: 11, name: 'advanced automation'},
{DeviceId: 12, name: 'atomic banana'},
{DeviceId: 13, name: 'angry crust'},
{DeviceId: 14, name: 'aluminum dust'},
{DeviceId: 15, name: 'abdominal egg'},
{DeviceId: 16, name: 'artistic fence'},
{DeviceId: 17, name: 'aggressive goat'},
{DeviceId: 18, name: 'active hurricane'},
{DeviceId: 19, name: 'allergic infestation'},
{"DeviceId": "20", name: 'boring joust'},*/
