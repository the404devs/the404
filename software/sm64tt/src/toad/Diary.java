/*Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
Diary class, holds the DiaryPages*/
package toad;
import java.util.*;

/*The Diary class inheriets from Java's ArrayList in order to hold all of the DairyPages the user collects*/
public class Diary extends ArrayList<DiaryPage>{
	private static final long serialVersionUID = 1234567890L;//Not important

	/*********************
	Constructors for Diary
	*********************/
	Diary(){//No parameters
		super();//Parent constructor
	}

	/****************
    Methods for Diary
    ****************/

	/*Access method to add a DiaryPage to the Diary*/
	/*Overrides ArrayLists add() method*/
	@Override
	public boolean add(DiaryPage page){	
		return super.add(page);
	}

	/*Bubble sorting to put the pages in order by their page number*/
	void sortPages(){
		for (int x = 0; x<this.size()-1; x++) {
			for (int y = 0; y<this.size()-1; y++) {
				if (this.get(y).getPageNumber() > this.get(y+1).getPageNumber()) {
					DiaryPage temp = this.get(y);
					this.set(y, this.get(y+1));
					this.set(y+1, temp);
				}
			}
		}
	}

	/*Returns an array containing the paths to the image for each of the DiaryPages we've collected*/
	String[] returnPaths(){
		String[] paths = new String[this.size()];//New array same length of Diary
		for (int x = 0; x<paths.length; x++) {//Loop through each page
			paths[x] = this.get(x).getImagePath();//Get the image path, add it to the array
		}
		return paths;//return the array
	}

	/*Access method for the size/length of the Diary*/
	/*Overrides the size() method from arraylist*/
	@Override
	public int size(){
		return super.size();
	}
}