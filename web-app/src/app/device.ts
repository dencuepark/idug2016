//model for Device
export class Device {
  DeviceId: string;
  ShipmentCategory: string;
  ShipmentId: string;
  //Type: string;
  //Condition: string;
  TemperatureData: {
    topTemp: string,
    ambientTemperature: string,
    targetTemperature: string,
  };
  AccelerometerData: {
    topAcc: string,
    x: string,
    y: string,
    z: string
  };
  HumidityData: {
    humidityTemperature: string,
    relativeHumidity: string
  };
  MagnetometerData: {
    x: string,
    y: string,
    z: string
  };
  GyroscopeData: {
    x: string,
    y: string,
    z: string
  }
  BarometerData: string;
  LuxometerData: string;
}
