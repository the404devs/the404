/*Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
Player class, contains stuff that is useful to the player, 
like their name, their inventory, etc.*/
package toad;
import java.util.*;

/*The Player class contains the player's name, Variables for the times they started and ended, as well as an inventory and diary*/
public class Player{

	private String name = null;//Player's name
	private Date startTime = null;//Times they started and ended
	private Date endTime = null;
	private Inventory inventory = null;//The player's inventory (to hold items)
	private Diary diary = null;//the player's diary (to hold diary pages)

	/**********************
	Constructors for Player
	**********************/
	Player(String id){//We need a name
		this.name = id;//Set their name
		this.inventory = new Inventory();//Create their inventory and diary
		this.diary = new Diary();
	}

	/*****************
    Methods for Player
    *****************/
	/*Access method to add a page. Calls the addPage method in the player's diary*/
	void addDiaryPage(String pageNumber){
		this.diary.add(new DiaryPage(pageNumber));
	}

	/*Access method for adding an item to the player's inventory*/
	void addItem(String itemName){
		Item newItem = new Item(itemName);//create item object with the given name
		this.inventory.add(newItem);//Add it to their inventory
	}

	//To set the start time
	void setStartTime(){
		this.startTime = new Date();
	}

	//To set the end time
	void setEndTime(){
		this.endTime = new Date();
	}

	//Returns an int representing the # of seconds to complete the game. Calculated from start and end times
	int getPlayTime(){
		return (int)((this.endTime.getTime() - this.startTime.getTime()) / 1000);//return our calculation
	}	

	/*To check if player has a certain item*/
	Boolean checkForItem(String itemName){//Needs the name of the item we are looking for
		Boolean hasItem = false;//Bool flag, set to true if we find it
		for (int x = 0; x<this.inventory.size(); x++) {//Loop through each item in inventory
			if (inventory.get(x).getName().equals(itemName)) {//Check if that item's name is equal to the name we are looking for
				hasItem = true;//set our flag to true
			}
		}
		return hasItem;//Return the bool representing if we found it or not
	}

	/*Access method to call the sortPages method of their diary*/
	void orderDiaryPages(){
		diary.sortPages();
	}

	/*Access method for the diary itself*/
	Diary getDiary(){
		return this.diary;
	}
}