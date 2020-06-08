/*Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
DiaryView class, this is what allows the user to browse the diary*/
package toad;

import toad.*;
import java.io.*;
import java.awt.*;
import java.util.*;
import javax.swing.*;
import java.awt.event.*;
import javax.swing.border.Border;

/*DiaryView extends JFrame, so we override some JFrame methods*/
/*DiaryView is the window that allows the player to scroll through all the DiaryPages stored in the Diary*/
/*We also IMPLEMENT ActionListener, so that we can tell the program to do stuff when an action happens*/
public class DiaryView extends JFrame implements ActionListener{    
	private static final long serialVersionUID = 1234567890L;//not important

    /*HEY LOOK STATIC MEMBERS*/
    /*These two objects, stream and roboto, are used to load our font file when creating the window
    and aren't needed in the Window object once created.*/
	private static InputStream stream = null;
	private static Font roboto = null;

    //Here are the window components
    private JPanel container = null;//Container (holds all the rest)
    private JButton next = null;//"Next page" button
    private JLabel image = null;//Image (will display the image)

    //Variables used when displaying the images
    /*LOOK MR. KRNIC ITS A CONSTANT WOOHOO*/
    private final int minIndex = 1;//The lowest number page we want to see is the first one, so this won't ever change
    private int maxIndex = 0;//Maximum index. This changes depending on how many pages we have
    private int index = 0;//Will represent which page we are viewing
    private String[] paths = null;//The array of all the image paths (comes from Diary)


    /*************************
    Constructors for DiaryView
    *************************/
	DiaryView(String title){//Just needs a string for the window title
		super(title);//Calling parent constructor here

        /*Here we load in our font file*/
		try{
			stream = new FileInputStream("font/Roboto-Medium.ttf");
			roboto =  Font.createFont(Font.TRUETYPE_FONT, stream);
			GraphicsEnvironment.getLocalGraphicsEnvironment().registerFont(roboto);
		}
		catch(FileNotFoundException e){}//Catch all the possible errors		
		catch(FontFormatException e){}
		catch(IOException e){}

        /*Setting some basic settings for the window*/
		this.setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);//Close when they hit close
        this.setIconImage(new ImageIcon("img/wallpaper2.jpg").getImage());//set an icon to show in the taskbar, etc
        this.setPreferredSize(new Dimension(605, 730));//set window size
        this.setLocation(new Point(300, 5));//Set the location
        this.setResizable(false);//Can't change the size

        //A border object we will reuse when creating components
        Border redBorder = BorderFactory.createLineBorder(Color.red, 6);

        //Create our container panel
        container = new JPanel();
        container.setBackground(Color.black);//Black background
        container.setLayout(null);//No stupid preset layouts
        this.getContentPane().add(container);//Add it to the frame

        /*Creating the image label*/
        image = new JLabel("", SwingConstants.CENTER);//No text in the label
        image.setSize(new Dimension(600, 600));//set the size
        image.setLocation(new Point(0, 0));//Set the location
        image.setOpaque(true);//Solid color
        image.setBorder(redBorder);//Add that red border
        image.setBackground(Color.black);//Black background
        container.add(image);//Add it to the container

        /*Creating the "next" button*/
        next = new JButton("Next page ->");//Set the text in the button
        next.setSize(new Dimension(600, 100));//Set the size
        next.setLocation(new Point(0, 600));//Set the location
        next.setBackground(Color.black);//Black background
        next.setForeground(Color.white);//White text
        next.setBorder(redBorder);//Add our red border
        next.setFont(roboto.deriveFont(30f));//Use that font we imported
        next.addActionListener(this);//Add an action listener(see methods below)
        container.add(next);//Add it to the panel        

        /*For the overall look of the window*/
        try {
            // Set System L&F
	        UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
	        //UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());
	    }
	    catch (UnsupportedLookAndFeelException e) {}//Catch all those pesky errors, which really should never show up anyways but it won't let me run the program if it doesn't have them
	    catch (ClassNotFoundException e) {}
	    catch (InstantiationException e) {}
	    catch (IllegalAccessException e) {}

	    /*and now we show the window*/
        this.pack();       
        this.setVisible(false);
	}

    /********************
    Methods for DiaryView
    ********************/
    /*This is for the action listener on the next button*/
    public void actionPerformed(ActionEvent evt) {
        this.index++;//Increase the index value, cause we're viewing the next image
        if (this.index>this.maxIndex) {//Little check to make sure we're not going past the last image
            this.index = this.minIndex;//If we are set us back to #1
        }
        this.image.setIcon(new StretchIcon(this.paths[this.index-1]));//Update the image in the window
    }

    /*This function is called to update the paths and maxIndex whenever we get a new diarypage, 
    and when the window opens. This way it is always up to date*/ 
    void refresh(String[] paths, int newMax){//Needs a new array with paths and a new maxIndex
        this.paths = paths;//Set our values to the new ones
        this.maxIndex = newMax;
        this.image.setIcon(new StretchIcon(this.paths[0]));//Set the image back to the first one
    }    

    /*This is to show the window. Basically an access method*/
    void showDiary(){
        this.setVisible(true);//We're visible!
    }
}