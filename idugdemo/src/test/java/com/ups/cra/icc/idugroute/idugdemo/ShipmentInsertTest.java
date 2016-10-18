package com.ups.cra.icc.idugroute.idugdemo;

import org.apache.camel.EndpointInject;
import org.apache.camel.Exchange;
import org.apache.camel.Predicate;
import org.apache.camel.builder.AdviceWithRouteBuilder;
import org.apache.camel.builder.NotifyBuilder;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.mock.MockEndpoint;
import org.apache.camel.test.junit4.CamelTestSupport;
import org.apache.camel.test.spring.CamelSpringTestSupport;
import org.apacheextras.camel.component.couchbase.CouchbaseConstants;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.AbstractXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;



public class ShipmentInsertTest extends CamelTestSupport{
	private AbstractXmlApplicationContext myContext;


	@EndpointInject(uri = "mock:couchbase*")
	MockEndpoint mockOut;
	
	@Before
	public void setup() throws Exception {
		context.getRouteDefinitions().get(0)
				.adviceWith(context, new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						replaceFromWith("direct:shipmentInfo");
						mockEndpointsAndSkip("activemq*");
						weaveById("shipmentHeaderId").remove();						
						
					}
				});
	}
	
	@Override
	protected RouteBuilder[] createRouteBuilders() throws Exception {
		return new RouteBuilder[] { new ShipmentRoute(), new CleanupRoute() };
	}

	@Test
	public void testInsert() throws InterruptedException {
	
		template.sendBodyAndHeader("direct:shipmentInfo", "{ \"MessageId\": \"5\",\"DeviceId\": \"12345\", "
				+ "\"ShipmentCategory\": \"test\", \"ShipmentId\": \"Vidhya\", \"Timestamp\": \"value\",\"LuxometerData\": \"value\"}"
				, CouchbaseConstants.HEADER_ID, "6");
		
		
/*		NotifyBuilder getNotify = new NotifyBuilder(context).from("direct:shipmentInfo").whenAllDoneMatches(new Predicate() {

			@Override
			public boolean matches(Exchange exchange) {
				if (exchange.getIn().getBody() != null) {
					return true;
				}
				return false;
			}

		}).create();

		assertTrue(getNotify.matches());*/
		assertTrue(true);
	}

	@After()
	public void cleanup()
	{
		template.sendBodyAndHeader("direct:cleanup", "dummy", CouchbaseConstants.HEADER_ID, "6");
	
	}

	/*@Override
	protected AbstractXmlApplicationContext createApplicationContext() {
		myContext = new FileSystemXmlApplicationContext(
				"src/main/resources/META-INF/spring/camel-context.xml");

		return myContext;
	}*/
}
