package com.ups.cra.icc.idugroute.pojo;

public class GyroscopeData {

	public String x;
	public String y;
	public String z;

	public GyroscopeData(String x, String y, String z) {
		super();
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	public GyroscopeData(){
		
	}
	
	@Override
	public String toString() {
		return "GyroscopeData [x=" + x + ", y=" + y
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
