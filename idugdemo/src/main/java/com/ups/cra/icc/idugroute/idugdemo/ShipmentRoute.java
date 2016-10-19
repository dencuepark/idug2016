package com.ups.cra.icc.idugroute.idugdemo;

import java.util.Random;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;
import org.apacheextras.camel.component.couchbase.CouchbaseConstants;

public class ShipmentRoute extends RouteBuilder {

	/*fabric8 cdi services*/
	/*@Inject
    @ServiceName("broker-amq-tcp")
    @Alias("activemq")
    ActiveMQComponent activeMQComponent;
	*/
	
	@Override
	public void configure() throws Exception {
		
		onException(Exception.class).process(new Processor() {
			public void process(Exchange exchange) throws Exception {
				Throwable t = exchange.getProperty(Exchange.EXCEPTION_CAUGHT,
						Throwable.class);

				if (t != null)
					System.out.print("Exception message is: " + t.getMessage());
			}
		});


		
	     	from("activemq:topic:mqtt.SensorTag")	
		//from("activemq:topic:VidhyaTest")	 
		.process(new Processor(){

			@Override
			public void process(Exchange exchange) throws Exception {
				System.out.println("Shipment Route running : " + exchange.getIn().getBody(String.class));	
			}
		})
	
		//.setHeader(CouchbaseConstants.HEADER_ID,constant(new Random().nextInt())).id("shipmentHeaderId")
		.process(new Processor(){

			@Override
			public void process(Exchange exchange) throws Exception {
				exchange.getIn().setHeader(CouchbaseConstants.HEADER_ID, new Random().nextInt());
				System.out.println("Couchbase Header ID : " + exchange.getIn().getHeader(CouchbaseConstants.HEADER_ID));	
			}
		})
		//.to("couchbase:http://localhost:11210/idug-sample?operation=" + CouchbaseConstants.COUCHBASE_PUT)
		.to("couchbase:http://172.30.10.67:11210/shipment?operation=" + CouchbaseConstants.COUCHBASE_PUT)
		.end();
		 
		
		/* sample code
		//from("direct:deviceInsert").marshal().json(JsonLibrary.Jackson).to("couchbase:http://localhost:11210/idug-sample?operation=" + CouchbaseConstants.COUCHBASE_PUT);
		from("direct:deviceInsert")
		.setHeader(CouchbaseConstants.HEADER_ID, constant(2))
		.to("couchbase:http://localhost:11210/idug-sample?operation=" + CouchbaseConstants.COUCHBASE_PUT);
		*/
		
		
	}

}
