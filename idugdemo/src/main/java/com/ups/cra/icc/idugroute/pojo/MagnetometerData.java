package com.ups.cra.icc.idugroute.pojo;

public class MagnetometerData {

	public String x;
	public String y;
	public String z;

	public MagnetometerData(String x, String y, String z) {
		super();
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	public MagnetometerData(){
		
	}
	
	@Override
	public String toString() {
		return "MagnetometerData [x=" + x + ", y=" + y
				+ ", z=" + z + "]";
	}
	

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}

	public String getZ() {
		return z;
	}

	public void setZ(String z) {
		this.z = z;
	}

}
