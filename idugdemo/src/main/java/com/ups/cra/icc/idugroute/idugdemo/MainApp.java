package com.ups.cra.icc.idugroute.idugdemo;

import java.io.FileInputStream;
import java.util.Properties;

import org.apache.activemq.camel.component.ActiveMQComponent;
import org.apache.camel.CamelContext;
import org.apache.camel.impl.DefaultCamelContext;

public class MainApp {

	public static void main(String[] args) throws Exception {

		/*Properties defaultProps = new Properties();
		FileInputStream in = new FileInputStream("./src/main/resources/idug.properties");
		defaultProps.load(in);
		in.close();*/

		
		CamelContext context = new DefaultCamelContext();
		ActiveMQComponent activeMQComponent = new ActiveMQComponent();
		//activeMQComponent.setBrokerURL("http://www.ws.amq.idug2016.link:80");
		//activeMQComponent.setBrokerURL(defaultProps.getProperty("brokerURL"));
		activeMQComponent.setBrokerURL("tcp://172.30.84.159:61616");
		activeMQComponent.setUserName("admin");
	    activeMQComponent.setPassword("admin");
	   
		context.addComponent("activemq", activeMQComponent);
		context.addRoutes(new ShipmentRoute());
		context.start();
		
		
		
		
		/*old code*/
		/*
		 Main main = new Main(); 
		 main.enableHangupSupport();
		 main.addRouteBuilder(new ShipmentRoute());
		 main.run(args);
		*/ 
	}

}
