/*Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
DiaryPage class, these contain some insight into Toad's mind, and are kind of creepy.
The player collects these throughout the game.*/
package toad;

/*DiaryPage is basically a subclass of Item*/
public class DiaryPage extends Item{

	private String page = null;//This takes the place of Item's 'name'
	private int pageNumber = 0;//We keep the page number as a string and an int for simplicity's sake
	private String imagePath = null;//To hold the path to the image for this page

	/*************************
	Constructors for DiaryPage
	*************************/
	DiaryPage(String number){//Same parameters as Item's constructor
		super(number);//Call Item constructor
		this.page = number;//Store our page number as a string...
		this.pageNumber = Integer.parseInt(number);//and as an int
		this.imagePath = "img/diary/"+this.page+".png";//get our image path 
		//Diary page images are in the img/diary folder, and named 1.png, 2.png, etc
	}

	/********************
    Methods for DiaryPage
    ********************/
	//Access method for the page number
	int getPageNumber(){
		return this.pageNumber;
	}

	//Access method for the image path
	String getImagePath(){
		return this.imagePath;
	}
}