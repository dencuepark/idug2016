package com.ups.cra.icc.idugroute.idugdemo;

import org.apache.camel.builder.RouteBuilder;
import org.apacheextras.camel.component.couchbase.CouchbaseConstants;

public class CleanupRoute extends RouteBuilder {

	@Override
	public void configure() throws Exception {
		
	     from("direct:cleanup")	
		.setHeader(CouchbaseConstants.HEADER_ID,constant("6"))
		.to("couchbase:http://localhost:11210/idug-sample?operation=" + CouchbaseConstants.COUCHBASE_DELETE)
		.end();
	     
	}

}
