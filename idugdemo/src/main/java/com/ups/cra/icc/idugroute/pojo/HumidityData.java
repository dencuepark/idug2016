package com.ups.cra.icc.idugroute.pojo;

public class HumidityData {
	
	public String humidityTemperature;
	public String humidityTemperaturecelsiusToFahrenheit;
	public String relativeHumidity;

	public HumidityData(String humidityTemperature,
			String humidityTemperaturecelsiusToFahrenheit,
			String relativeHumidity) {
		super();
		this.humidityTemperature = humidityTemperature;
		this.humidityTemperaturecelsiusToFahrenheit = humidityTemperaturecelsiusToFahrenheit;
		this.relativeHumidity = relativeHumidity;
	}
	
	public HumidityData(){
		
	}
	
	@Override
	public String toString() {
		return "HumidityData [humidityTemperature=" + humidityTemperature + ", humidityTemperaturecelsiusToFahrenheit=" + humidityTemperaturecelsiusToFahrenheit
				+ ", relativeHumidity=" + relativeHumidity + "]";
	}

	public String getHumidityTemperature() {
		return humidityTemperature;
	}

	public void setHumidityTemperature(String humidityTemperature) {
		this.humidityTemperature = humidityTemperature;
	}

	public String getHumidityTemperaturecelsiusToFahrenheit() {
		return humidityTemperaturecelsiusToFahrenheit;
	}

	public void setHumidityTemperaturecelsiusToFahrenheit(
			String humidityTemperaturecelsiusToFahrenheit) {
		this.humidityTemperaturecelsiusToFahrenheit = humidityTemperaturecelsiusToFahrenheit;
	}

	public String getRelativeHumidity() {
		return relativeHumidity;
	}

	public void setRelativeHumidity(String relativeHumidity) {
		this.relativeHumidity = relativeHumidity;
	}

	
	
}
