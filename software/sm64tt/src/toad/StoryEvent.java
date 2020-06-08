/*Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
StoryEvent class, we use a Story event for each event in the story. There's 140 different StoryEvents.
Each story event contains info about whats happening in the story (dialog, an image, etc), as well as info about which StoryEvent should come next.*/
package toad;
import toad.*;

/*Most important part of the game right here. A storyEvent contains everything needed to progress the story*/
public class StoryEvent{

	private String diary = null;//We store the page number of the dairy page we pick up as a string, actually
	private int opt1chap = 0;//The destinations for the 4 options
	private int opt2chap = 0;
	private int opt3chap = 0;
	private int opt4chap = 0;
	private Boolean item = false;//Are we getting an item?
	private Boolean options = false;//Are there options for the player?
	private Boolean needItem = false;//Do we need an item?
	private String eventText = null;//To hold the text displayed in the window
	private String imagePath = null;//Path to this event's image
	private String npcPath = null;//Path to this event's sprite
	private String npcName = null;//Name that goes with the sprite (who is talking)
	private String opt1 = null;//Strings containing the 4 options the player has
	private String opt2 = null;
	private String opt3 = null;
	private String opt4 = null;	
	private String itemPickUp = null;//Name of the item we are picking up

	/**************************
	Constructors for StoryEvent
	**************************/
	
	/*Multiple constructors here for the StoryEvent class
	The StoryEvent class requires quite a few parameters, and to cut down on the complexity, we created a second one for a specific scenario that isn't true in most StoryEvents*/

	/*2nd constructor has an extra boolean for whether you pick up a diary page.
	Since most story events don't involve collecting a page, we say false by default*/
	StoryEvent(String story, String imgPath, String npcimgPath, String npcName, Boolean hasOptions, String opt1, String opt2, String opt3, String opt4, int opt1chap, int opt2chap, int opt3chap, int opt4chap){
		this.eventText = story;
		this.imagePath = imgPath;
		this.npcPath = npcimgPath;
		this.npcName = npcName;
		this.options = hasOptions;
		this.opt1 = opt1;
		this.opt2 = opt2;
		this.opt3 = opt3;
		this.opt4 = opt4;
		this.opt1chap = opt1chap;
		this.opt2chap = opt2chap;
		this.opt3chap = opt3chap;
		this.opt4chap = opt4chap;
		this.diary = null;//null by default, most StoryEvents don't involve picking up a DiaryPage
		this.item = false;
		this.itemPickUp = "";
		this.needItem = false;
	}

	StoryEvent(String story, String imgPath, String npcimgPath, String npcName, Boolean hasOptions, String opt1, String opt2, String opt3, String opt4, int opt1chap, int opt2chap, int opt3chap, int opt4chap, String diaryNum){
		this.eventText = story;
		this.imagePath = imgPath;
		this.npcPath = npcimgPath;
		this.npcName = npcName;
		this.options = hasOptions;
		this.opt1 = opt1;
		this.opt2 = opt2;
		this.opt3 = opt3;
		this.opt4 = opt4;
		this.opt1chap = opt1chap;
		this.opt2chap = opt2chap;
		this.opt3chap = opt3chap;
		this.opt4chap = opt4chap;
		this.diary = diaryNum;//Set it to what was specified (most likely true)
		//If a StoryEvent does involve picking up a page, an additional boolean argument will be passed to the constructor.
		this.item = false;
		this.itemPickUp = "";
		this.needItem = false;
	}

	StoryEvent(String story, String imgPath, String npcimgPath, String npcName, Boolean hasOptions, String opt1, String opt2, String opt3, String opt4, int opt1chap, int opt2chap, int opt3chap, int opt4chap, Boolean getItem, String item){
		this.eventText = story;
		this.imagePath = imgPath;
		this.npcPath = npcimgPath;
		this.npcName = npcName;
		this.options = hasOptions;
		this.opt1 = opt1;
		this.opt2 = opt2;
		this.opt3 = opt3;
		this.opt4 = opt4;
		this.opt1chap = opt1chap;
		this.opt2chap = opt2chap;
		this.opt3chap = opt3chap;
		this.opt4chap = opt4chap;
		this.diary = null;
		this.item = getItem;
		this.itemPickUp = item;
		if (!getItem) {
			this.needItem = true;
		}
		else{
			this.needItem = false;
		}
	}

	/*********************
	Methods for StoryEvent
	*********************/

	/*Here we have access methods for all of the state variables*/
	String writeStory(){
		return this.eventText;
	}

	String getImage(){
		return this.imagePath;
	}

	String getSprite(){
		return this.npcPath;
	}

	String getNPCName(){
		return this.npcName;
	}

	Boolean autoAdvance(){
		return !this.options;
	}	

	String addDiary(){
		return this.diary;
	}
	

	Boolean addItem(){
		return this.item;
	}

	String getItemName(){
		return this.itemPickUp;
	}

	/*The next two access methods take an int, representing which option we want
	This means we don't need 4 access methods, just 1*/
	//This one gets the text for an option
	String getOption(int option){
		if (option==1) {
			return this.opt1;
		}
		else if (option==2) {
			return this.opt2;
		}
		else if (option==3) {
			return this.opt3;
		}
		else if (option==4) {
			return this.opt4;
		}
		else{
			return null;
		}
	}

	//This one gets the number of an option
	int getNextChap(int option){
		if (option==1) {
			return this.opt1chap;
		}
		else if (option==2) {
			return this.opt2chap;
		}
		else if (option==3) {
			return this.opt3chap;
		}
		else if (option==4) {
			return this.opt4chap;
		}
		else{
			return 0;
		}
	}

	/*After we get a diarypage or an item, we set them back to null so we don't pick up the same item over and over again.*/
	void diaryCollected(){
		this.diary = null;
	}
	void itemCollected(){
		this.item = false;
	}
}