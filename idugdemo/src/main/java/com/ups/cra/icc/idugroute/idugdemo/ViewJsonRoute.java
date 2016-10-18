package com.ups.cra.icc.idugroute.idugdemo;

import org.apache.camel.builder.RouteBuilder;

public class ViewJsonRoute extends RouteBuilder {

	
	@Override
	public void configure() throws Exception {
		from("couchbase:http://localhost:11210/idug-sample?designDocumentName=idug&viewName=idugview").to("seda:all_devices");
		
	}

	
	
}
