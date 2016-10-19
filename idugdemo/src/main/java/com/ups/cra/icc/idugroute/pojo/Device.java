package com.ups.cra.icc.idugroute.pojo;

import java.util.Arrays;

public class Device {
    public String messageId;
    public String deviceId;
    public String timestamp;
    public TemperatureData temperatureData;
    public AccelerometerData accelerometerData;
    public HumidityData humidityData;
    public MagnetometerData magnetometerData;
    public String barometerData;
    public GyroscopeData gyroscopeData;
    public String luxometerData;

    public Device(){
    	
    }
    
	@Override
	public String toString() {
		return "Device [messageId=" + messageId + ", deviceId=" + deviceId + ", timestamp="
				+ timestamp + ", temperatureData=" + temperatureData + ", accelerometerData=" + accelerometerData
				+ ", humidityData=" + humidityData + ", humidityData=" + humidityData
				+ ", magnetometerData=" + magnetometerData
				+ ", barometerData=" + barometerData + ", gyroscopeData="
				+ gyroscopeData + ", luxometerData=" +luxometerData + "]";
	}
	
    public Device(String messageId, String deviceId, String timestamp, TemperatureData temperatureData, AccelerometerData accelerometerData, HumidityData humidityData, MagnetometerData magnetometerData, String barometerData, GyroscopeData gyroscopeData, String luxometerData){
        super();
    	this.messageId = messageId;
        this.deviceId = deviceId;
        this.timestamp = timestamp;
        this.temperatureData = temperatureData;
        this.accelerometerData = accelerometerData;
        this.humidityData = humidityData;
        this.magnetometerData = magnetometerData;
        this.barometerData = barometerData;
        this.gyroscopeData = gyroscopeData;
        this.luxometerData = luxometerData;
    }

	public String getMessageId() {
		return messageId;
	}

	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public TemperatureData getTemperatureData() {
		return temperatureData;
	}

	public void setTemperatureData(TemperatureData temperatureData) {
		this.temperatureData = temperatureData;
	}

	public AccelerometerData getAccelerometerData() {
		return accelerometerData;
	}

	public void setAccelerometerData(AccelerometerData accelerometerData) {
		this.accelerometerData = accelerometerData;
	}

	public HumidityData getHumidityData() {
		return humidityData;
	}

	public void setHumidityData(HumidityData humidityData) {
		this.humidityData = humidityData;
	}

	public MagnetometerData getMagnetometerData() {
		return magnetometerData;
	}

	public void setMagnetometerData(MagnetometerData magnetometerData) {
		this.magnetometerData = magnetometerData;
	}

	public String getBarometerData() {
		return barometerData;
	}

	public void setBarometerData(String barometerData) {
		this.barometerData = barometerData;
	}

	public GyroscopeData getGyroscopeData() {
		return gyroscopeData;
	}

	public void setGyroscopeData(GyroscopeData gyroscopeData) {
		this.gyroscopeData = gyroscopeData;
	}

	public String getLuxometerData() {
		return luxometerData;
	}

	public void setLuxometerData(String luxometerData) {
		this.luxometerData = luxometerData;
	}


    
    
    
    
    

    
}