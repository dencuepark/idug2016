package com.ups.cra.icc.idugroute.pojo;

public class DeviceInfo {

	
	int id;
	String name;
	String temperature;

	public DeviceInfo() {

	}

	public DeviceInfo(int id, String name, String temperature) {
		super();
		this.id = id;
		this.name = name;
		this.temperature = temperature;
	}

	@Override
	public String toString() {
		return "DeviceInfo [id=" + id + ", name=" + name + ", temperature=" + temperature + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTemperature() {
		return temperature;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	
}


