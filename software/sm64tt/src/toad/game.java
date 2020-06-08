/*Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
Our final project, containing everything we've learned this year
Game class, where the code that runs the game lives*/
package toad;

import toad.*;
import java.io.*;
import java.awt.*;
import java.util.*;
import javax.swing.*;

public class game{	

	private static void delay(){
        /*The delay function returns! At this point I don't really need to comment it.*/    
        try{
            Thread.sleep(6500);//6.5 seconds
        }
        catch (InterruptedException e)
        {           
            System.out.println("oh no the program broke. fix the delay function");
        }
    }

	public static void main(String[] args){	
		Scream scream = new Scream();//Yes I made a whole object for this
		scream.scream();//AHHHHHHHHHHHHHHHHHHH
		Window window = new Window("Super Mario 64: Toad's Terror");//Create our window
		//Here we set the initial values for the window components
		window.setImage("img/story/bupspook.gif");
		window.setDialog("<html>Enter your name below to begin.<br><br>Horrors await.</html>");
		window.setSprite("img/sprites/TDemon.png");
		window.setNPCName("Toad's Terror");
		Boolean setup = true;//Setup means we're waiting on the first screen
		String name = null;//To hold the player's name
		while(setup){//Go until we're not waiting
			if(!window.getInput().equals(null)&&!window.getInput().equals("")){
				//If their input isn't null or empty, they've given us a name
				name = window.getInput();//So get their name
				setup = false;//No longer waiting
			}
		}
		Player player = new Player(name);//Create a player object with that name
		window.setDialog("<html>Welcome, "+name+"!</hmtl>");//Welcome message
		window.clearInput();//Clear the input
		delay();//delay
		window.setDialog("<html>Before you begin, remember that <u>underlined</u> words are the options you have, enter one of those words in the textbox to make your decision.<br>If there are no options, it is either a yes or no question, or the story will advance on its own. The game starts in 5 seconds!</hmtl>");//Welcome message
		window.clearInput();//Clear the input
		delay();//delay
		delay();


		player.setStartTime();//Get the time they started playing. We compare this later to the time they ended to determine how long it took to win

		
		ArrayList<String> allStory = new ArrayList<String>();//Arraylist to hold all the story details from the file
		int currentChap = 1;//Current chapter of the story. Starts at 1, cause thats the first chapter
		Boolean gameOn = true;//Are they playing?

		/*File io, we load data from story.txt*/
		try{
			/*Use bufferedreader to get the contents of the story.txt file
			and put each line into that arraylist
			I'm sure this is simple enough to not comment, right?*/

			int x = 0;//Counter
			String line = null;//To hold the line
			FileReader fr = new FileReader("story.txt");
			BufferedReader br = new BufferedReader(fr);

			while ((line = br.readLine()) != null)
	        {
	            allStory.add(x, line);
	            x++;
	        }
	        br.close();//Close the buffered reader
		}catch (IOException e){}
		
		//Loop that will go until the game is done
		while(gameOn){
			//The current chapter variable goes as high as 140. At that point, the game is done.
			if (currentChap==140) {
				break;
			}
			/*We have formatted our story data in a text file where the data for each event is on its own line, and the individual parts of data are separated by ,,
			 The reason we used ,, instead of , is because our story narration might use a single comma*/
			String[] currentStoryData = allStory.get(currentChap).split(",,");
			StoryEvent story = null;
			//Create a story event from the data we got from the file
			/*Here we take advantage of StoryEvent's multiple constructors*/
			if(currentStoryData.length==14)//Checking for that extra int meaning we need to add a diary
			{
				story = new StoryEvent(currentStoryData[0], currentStoryData[1], currentStoryData[2], currentStoryData[3], Boolean.parseBoolean(currentStoryData[4]), currentStoryData[5], currentStoryData[6], currentStoryData[7], currentStoryData[8], Integer.parseInt(currentStoryData[9]),Integer.parseInt(currentStoryData[10]),Integer.parseInt(currentStoryData[11]),Integer.parseInt(currentStoryData[12]), currentStoryData[13]);
			}
			else if(currentStoryData.length==15){//Checking for a boolean and sting, meaning something with an item is happening
				story = new StoryEvent(currentStoryData[0], currentStoryData[1], currentStoryData[2], currentStoryData[3], Boolean.parseBoolean(currentStoryData[4]), currentStoryData[5], currentStoryData[6], currentStoryData[7], currentStoryData[8], Integer.parseInt(currentStoryData[9]),Integer.parseInt(currentStoryData[10]),Integer.parseInt(currentStoryData[11]),Integer.parseInt(currentStoryData[12]), Boolean.parseBoolean(currentStoryData[13]), currentStoryData[14]);
			}
			else{
				story = new StoryEvent(currentStoryData[0], currentStoryData[1], currentStoryData[2], currentStoryData[3], Boolean.parseBoolean(currentStoryData[4]), currentStoryData[5], currentStoryData[6], currentStoryData[7], currentStoryData[8], Integer.parseInt(currentStoryData[9]),Integer.parseInt(currentStoryData[10]),Integer.parseInt(currentStoryData[11]),Integer.parseInt(currentStoryData[12]));
			}
			
			//Assign the values we got for the current story event to the various window components
			window.setDialog(story.writeStory());  
			window.setImage(story.getImage());
			window.setSprite(story.getSprite());
			window.setNPCName(story.getNPCName());

			/*Stuff that happens if we're getting a new diary page*/
			if (story.addDiary()!=null) {
				window.enableDiary();//Unlock the diary, if it isn't already
				player.addDiaryPage(story.addDiary());//Add the page
				player.orderDiaryPages();//Sort the pages
				Window.getDiaryBox().refresh(player.getDiary().returnPaths(), player.getDiary().size());//Here we call the refresh values to update the values in the DiaryView window
			}

			/*Code for getting a new item*/
			if (story.addItem()){
				player.addItem(story.getItemName());//Add that item to the player's inventory
			}

			/*Code for when we need to use an item to progress*/
			if (!story.addItem()&&!story.getItemName().equals("")){//we must need to use an item
				if(player.checkForItem(story.getItemName())){//Check if the player has that item
					delay();//Delay
					currentChap = story.getNextChap(1);//Go to the event for having the item
					window.clearInput();//Clear any text in the input textbox
				}
				else{//Else they don't have it
					delay();//Delay
					currentChap = story.getNextChap(2);//go to the event for not having the item
					window.clearInput();//Clear any text in the input textbox
				}
			}
			/*Code for normal event (no items or diary pages)*/
			else{
				//If the current story event is just text and does not present any options to the player, advance to the next one after a while
				if (story.autoAdvance()) {	
					delay();//Delay
					currentChap = story.getNextChap(1);//Find out which event is next
					window.clearInput();//Clear any text in the input textbox
				}
				else{
					String input = window.getInput();//Get the user's input
					if (input.equals(story.getOption(1))) {//If the user's input is equal to the first option...
						System.out.println("you said "+window.getInput());//debug
						currentChap = story.getNextChap(1);//get the destination for the first option
						window.clearInput();//Clear the input box
					}
					else if (input.equals(story.getOption(2))) {//Same thing, but for option 2
						System.out.println("you said "+window.getInput());
						currentChap = story.getNextChap(2);
						window.clearInput();
					}
					else if (input.equals(story.getOption(3))) {//Same thing, but for option 3	
						System.out.println("you said "+window.getInput());
						currentChap = story.getNextChap(3);
						window.clearInput();
					}
					else if (input.equals(story.getOption(4))) {//Same thing, but for option 4
						System.out.println("you said "+window.getInput());
						currentChap = story.getNextChap(4);
						window.clearInput();
					}
					input = null;//Reset our input variable for the next time					
				}	
			}		
		}		
		/*Once the loop is done, this stuff happens*/
		player.setEndTime();//Get the time they finished
		scream.scream();//AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
		//Set the window components to the stuff they should show at the end
		window.setImage("img/story/end.png");
		//In this message, we get the playTime value, which is calculated from the start and end times. This is the "time code" for the website
		window.setDialog("<html>Congratulations.<br><br>You have conquered your worst fear.<br><br>Your <u>time code</u> is: "+player.getPlayTime()+"<br><br>Enter this code <a href='http://sdsscomputers.com/OwenGoodwin/'>online</a> to claim your spot on the leaderboard.</html>");
		window.setSprite("img/sprites/TDemon.png");
		window.setNPCName("Toad's Terror");
	}
}