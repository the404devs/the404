/*Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
Item class, used for those items the player gets on their quest. 
Items were scrapped, so this is only used twice*/
package toad;

/*The Item class has a name. That's basically it, really*/
public class Item{
	private String name = null;//To hold the item's name

	/********************
	Constructors for Item
	********************/
	Item(String newName){//Needs a name. Just like a person
		this.name = newName;//Set that name
	}

	/***************
    Methods for Item
    ***************/
	//Access method for the name
	String getName(){
		return this.name;
	}
}