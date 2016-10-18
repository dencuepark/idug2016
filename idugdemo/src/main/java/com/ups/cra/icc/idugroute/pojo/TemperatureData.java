package com.ups.cra.icc.idugroute.pojo;

public class TemperatureData {

	public String ambientTemperature;
	public String ambientTemperaturecelsiusToFahrenheit;
	public String targetTemperature;

	public TemperatureData(String ambientTemperature,
			String ambientTemperaturecelsiusToFahrenheit,
			String targetTemperature) {
		
		super();
		this.ambientTemperature = ambientTemperature;
		this.ambientTemperaturecelsiusToFahrenheit = ambientTemperaturecelsiusToFahrenheit;
		this.targetTemperature = targetTemperature;
	}

	
	@Override
	public String toString() {
		return "TemperatureData [ambientTemperature=" + ambientTemperature + ", ambientTemperaturecelsiusToFahrenheit=" + ambientTemperaturecelsiusToFahrenheit
				+ ", targetTemperature=" + targetTemperature + "]";
	}
	
	
	public String getAmbientTemperature() {
		return ambientTemperature;
	}

	public void setAmbientTemperature(String ambientTemperature) {
		this.ambientTemperature = ambientTemperature;
	}

	public String getAmbientTemperaturecelsiusToFahrenheit() {
		return ambientTemperaturecelsiusToFahrenheit;
	}

	public void setAmbientTemperaturecelsiusToFahrenheit(
			String ambientTemperaturecelsiusToFahrenheit) {
		this.ambientTemperaturecelsiusToFahrenheit = ambientTemperaturecelsiusToFahrenheit;
	}

	public String getTargetTemperature() {
		return targetTemperature;
	}

	public void setTargetTemperature(String targetTemperature) {
		this.targetTemperature = targetTemperature;
	}

	
	
}
