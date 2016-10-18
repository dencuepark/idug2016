package com.ups.cra.icc.idugroute.idugdemo;

import org.apache.activemq.camel.component.ActiveMQComponent;
import org.apache.camel.builder.AdviceWithRouteBuilder;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.test.junit4.CamelTestSupport;
import org.apache.camel.test.spring.CamelSpringTestSupport;
import org.apacheextras.camel.component.couchbase.CouchbaseConstants;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.AbstractXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class ShipmentIntegrationTest extends CamelTestSupport{
	//private AbstractXmlApplicationContext myContext;

	@Before
	public void setup() throws Exception {

		ActiveMQComponent activeMQComponent = (ActiveMQComponent) context.getComponent("activemq");
		activeMQComponent.setUserName("admin");
	    activeMQComponent.setPassword("admin");
		context.getRouteDefinitions().get(0)
				.adviceWith(context, new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						replaceFromWith("direct:shipmentInfo");
						weaveById("shipmentHeaderId").remove();						
						
					}
				});
	}
	
	@Override
	protected RouteBuilder[] createRouteBuilders() throws Exception {
		return new RouteBuilder[] { new ShipmentRoute(), new CleanupRoute() };
	}

	@Test
	public void testIntegration() throws InterruptedException {
	
		template.sendBodyAndHeader("activemq:topic:mqtt.ShipmentInfo", "{ \"MessageId\": \"5\",\"DeviceId\": \"12345\", "
				+ "\"ShipmentCategory\": \"test\", \"ShipmentId\": \"Vidhya\", \"Timestamp\": \"value\",\"LuxometerData\": \"value\"}"
				, CouchbaseConstants.HEADER_ID, "6");

		assertTrue(true);
	}

	@After()
	public void cleanup()
	{
		template.sendBodyAndHeader("direct:cleanup", "dummy", CouchbaseConstants.HEADER_ID, "6");
	
	}
/*
	@Override
	protected AbstractXmlApplicationContext createApplicationContext() {
		myContext = new FileSystemXmlApplicationContext(
				"src/main/resources/META-INF/spring/camel-context.xml");

		return myContext;
	}
	*/
	
}
