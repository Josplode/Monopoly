package cs414.a4.n;

import java.util.*;

public abstract class Owner {

	public String name;
	
	private double money;
	
	private ArrayList<Integer> deedIndices;
	
	private int numRailRoadsOwned;
	
	public Owner(String id, double initialMoney) {
		this.name = id;
		money = initialMoney;
		deedIndices = new ArrayList<Integer>();
	}
	
	public String getName() {
		return name;
	}

	public double getMoney() {
		return money;
	}
	
	public ArrayList<Integer> getDeeds() {
		return deedIndices;
	}
	
	public boolean hasDeed(int tileIndex){
		
		return deedIndices.contains(tileIndex);
		
	}

	public boolean transfer(Owner recipient, Double amount) {
		if (money >= amount) {
			this.money -= amount;
			recipient.money += amount;
			return true;
		}
		return false;
	}

	public int getNumRailRoadsOwned() {
		return numRailRoadsOwned;
	}

	public void setNumRailRoadsOwned(int numRailRoadsOwned) {
		this.numRailRoadsOwned = numRailRoadsOwned;
	}

}