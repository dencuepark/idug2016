package com.ups.cra.icc.idugroute.idugdemo;

import java.util.Date;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.test.junit4.CamelTestSupport;
import org.apacheextras.camel.component.couchbase.CouchbaseConstants;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.ups.cra.icc.idugroute.pojo.DeviceInfo;


public class CRUDUnitTest {/*extends CamelTestSupport {
	
	static DeviceInfo device = new DeviceInfo(2, "Device 2", "30F");
	
	@Before
	public void populateValues() {
		
	}
	
	
	@Override
	protected RouteBuilder[] createRouteBuilders() throws Exception {
		//return new RouteBuilder[] { new InsertJsonRoute() , new ViewJsonRoute() };
		return new RouteBuilder[] { new ViewJsonRoute() };
	}
	
	
	@Test
	public void testInsert() throws Exception {
		
		template.sendBodyAndHeader("direct:deviceInsert", device, CouchbaseConstants.HEADER_ID, device.getId());
		assert(true);
	}
	
	@Test
	public void testViewAll() throws Exception {
		String result = (String) consumer.receive("seda:all_devices").getIn().getBody();
		assertNotNull(result);
		System.out.println("HEREEEEE ****** :" + result);
	}
	
	*/
}
