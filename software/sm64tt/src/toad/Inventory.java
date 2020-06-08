/*Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
Inventory class, stores all of the players items.
Items were scrapped, so we only have 2 items to collect.*/
package toad;
import java.util.*;

/*Inventory inherits from ArrayList. Code is minimal, but it's made to hold all of the player's items.*/
public class Inventory extends ArrayList<Item>{
	private static final long serialVersionUID = 1234567890L;//Not important

	/*************************
	Constructors for Inventory
	************************/
	Inventory(){
		super();//Call the parent constructor
	}

	/********************
    Methods for Inventory
    ********************/

	//Access method to add an item
	//Overrides the ArrayList add() method
	@Override
	public boolean add(Item item){
		return super.add(item);
	}
}