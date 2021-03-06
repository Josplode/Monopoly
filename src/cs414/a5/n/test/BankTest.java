package cs414.a5.n.test;

import static org.junit.Assert.*;

/*************************************************************************************
 *                                      MONOPOLY									 *
 *************************************************************************************
 *                               CREATED ON: (C)10/28/2016							 *
 *                                   UPDATED ON: 10/28/2016						     *
 *                                   VERSION: 0.0.1									 *
 *                                     WRITTEN BY:									 *
 * 	    								Joey Bzdek	                                 *
 * 								    Dylan Crescibene 								 *
 * 									 Chris Geohring 								 *
 * 									Aaron Barczewski								 *
 * 																					 *
 *************************************************************************************/

/*************************************************************************************
 * 										BANK TEST									 *
 *************************************************************************************/

import org.junit.Before;
import org.junit.Test;

import cs414.a5.n.Bank;
import cs414.a5.n.Player;
import cs414.a5.n.TokenType;

public class BankTest {
	Bank bank;
	Player playa;
	
	@Before
	public void setUp() throws Exception {
		bank = new Bank();
		playa = new Player("Dilan", TokenType.CAR);
	}

	@Test
	public void testBank() {
		assert(bank.getMoney() == 2000000);
		assert(bank.getName().equals("Bank"));
	}
	
	@Test
	public void testGetFreeParking() {
		assert(bank.getFreeParkingPool() == 100);
	}
	
	@Test
	public void testAwardFreeParking() {
		bank.awardFreeParking(playa);
		assertEquals(1600, playa.getMoney(), 0);
	}

}
