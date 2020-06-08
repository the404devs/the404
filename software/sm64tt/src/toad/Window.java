/*Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
Window class, this is what makes the pretty pictures on the screen*/
package toad;

import toad.*;
import java.io.*;
import java.awt.*;
import java.util.*;
import javax.swing.*;
import java.awt.event.*;
import javax.swing.border.Border;

/*Window extends JFrame, so we override some JFrame methods*/
/*This is the main window the player interacts with*/

public class Window extends JFrame implements ActionListener{
    //Our window class contains static members that aren't found in the objects created from the class
	private static final long serialVersionUID = 1234567890L;
    //These two objects, stream and roboto, are used to load our font file when creating the window
    //and aren't needed in the Window object once created.
	private static InputStream stream = null;
	private static Font roboto = null;
    public static DiaryView diaryBox = new DiaryView("Toad's Diary");//The diary window. It's static cause it doesn't change. Also public because we access it in the game class

    //The window components
	private JPanel container = null;
	private JTextField inputBox = null;
	private JLabel speaker = null;
	private JLabel name = null;
	private JLabel text = null;
	private JLabel image = null;
    private JButton diaryBtn = null;

    private String input = "";//To hold the user input
    private Boolean inputted = false;//Was there a valid input?

    /**********************
    Constructors for Window
    **********************/

	Window(String title){
		super(title);//Calling parent constructor here

        /*To load the font file*/
		try{
			stream = new FileInputStream("font/Roboto-Medium.ttf");
			roboto =  Font.createFont(Font.TRUETYPE_FONT, stream);
			GraphicsEnvironment.getLocalGraphicsEnvironment().registerFont(roboto);
		}
		catch(FileNotFoundException e){}//Catch all the possible errors		
		catch(FontFormatException e){}
		catch(IOException e){}	

        /*Window settings*/
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);//Close when they hit close
        this.setIconImage(new ImageIcon("img/wallpaper2.jpg").getImage());//set an icon to show in the taskbar, etc
        this.setPreferredSize(new Dimension(325, 560));//set window size
        this.setLocation(new Point(300, 5));//Set the location
        this.setResizable(false);//Can't change size

        Border redBorder = BorderFactory.createLineBorder(Color.red, 6);//Border object we apply to components later

        //Container to hold the other components
        container = new JPanel();
        container.setBackground(Color.black);//Black background
        container.setLayout(null);//No preset layouts
        this.getContentPane().add(container);//add it to the frame

        //This is where the user types stuff
        inputBox = new JTextField();
        inputBox.addActionListener(this);//Add an action listener (see methods below)
        inputBox.setFocusable(true);//Can focus
        inputBox.setSize(new Dimension(320, 50));//set size
        inputBox.setLocation(new Point(0, 480));//Set the location
        inputBox.setOpaque(true);//solid color
        inputBox.setBackground(Color.black);//black background
        inputBox.setForeground(Color.white);//white text
        inputBox.setFont(roboto.deriveFont(15f));//set the font 
        inputBox.setBorder(redBorder);//apply red border
        inputBox.setCaretColor(Color.red);//set caret color
        inputBox.setCaret(new PointyCaret());//use that special caret we made
        container.add(inputBox);//add it to the container

        //label for the image of the guy whos talking
        speaker = new JLabel("", SwingConstants.CENTER);
        speaker.setSize(new Dimension(105, 155));//set size
        speaker.setLocation(new Point(0, 290));//Set the location
        speaker.setOpaque(true);//solid background
        speaker.setBackground(Color.black);//black background
        speaker.setBorder(redBorder);//red border
        container.add(speaker);//add it to the panel

        //Label to show the name of the image above
        name = new JLabel("NPC Name", SwingConstants.CENTER);
        name.setSize(new Dimension(105, 45));//set size
        name.setLocation(new Point(0, 440));//Set the location
        name.setOpaque(true);//solid background
        name.setBorder(redBorder);//red border
        name.setBackground(Color.black);//black background
        name.setForeground(Color.white);//white text
        name.setFont(roboto.deriveFont(15f));//set the font
        container.add(name);//add it to the panel

        //Label to hold the story text
        text = new JLabel("This is the text box", SwingConstants.LEFT);
        text.setVerticalAlignment(SwingConstants.TOP);
        text.setSize(new Dimension(220, 195));//set size
        text.setLocation(new Point(100, 290));//Set the location
        text.setOpaque(true);//solid background
        text.setBackground(Color.black);//black background
        text.setForeground(Color.white);//white text
        text.setBorder(redBorder);//red border
        text.setFont(roboto.deriveFont(15f));//set the font
        text.setFocusable(true);//can focus
        container.add(text);//add it to the panel

        //To hold the big image for the story event
        image = new JLabel("", SwingConstants.CENTER);
        image.setSize(new Dimension(320, 240));//set size
        image.setLocation(new Point(0, 0));//Set the location
        image.setOpaque(true);//solid background
        image.setBorder(redBorder);//red border
        image.setBackground(Color.black);//black background
        container.add(image);//add it to the panel

        //Button to open the diary window
        diaryBtn = new JButton("Open Diary...");//set the text
        diaryBtn.setSize(new Dimension(320,50));//set the size
        diaryBtn.setLocation(new Point(0,240));//set location
        diaryBtn.setBackground(Color.black);//black background
        diaryBtn.setForeground(Color.black);//white text to start
        diaryBtn.setBorder(redBorder);//red border
        diaryBtn.setFont(roboto.deriveFont(15f)); //set font 
        diaryBtn.setFocusPainted(false);//no special effects
        diaryBtn.setContentAreaFilled(false);
        diaryBtn.setOpaque(false);//solid background
        diaryBtn.addActionListener(this);//add an action listener(see below)
        diaryBtn.setEnabled(false);//disabled until they get their first dairy page
        container.add(diaryBtn);//add it to the panel        

        /*Look and feel stuff*/
        try {
            // Set System L&F
	        UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
	        // UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());
	    }
	    catch (UnsupportedLookAndFeelException e) {}//Catch all those pesky errors, which really should never show up anyways but it won't let me run the program if it doesn't have them
	    catch (ClassNotFoundException e) {}
	    catch (InstantiationException e) {}
	    catch (IllegalAccessException e) {}      

        /*Make it visible*/	    
        this.pack();       
        this.setVisible(true);
        inputBox.requestFocusInWindow();//Give focus to the input area
	}

    /*****************
    Methods for Window
    *****************/
    //The next 4 are access methods to set the contents of the various components
	void setDialog(String content){
		this.text.setText(content);
	}

	void setImage(String path){
		this.image.setIcon(new StretchIcon(path));
	}

	void setSprite(String path){
		this.speaker.setIcon(new StretchIcon(path));
	}

	void setNPCName(String name){
		this.name.setText(name);
	}

    /*This clears the input area*/
    void clearInput(){
        this.inputBox.setText("");
        this.inputted = false;
        this.input = "";
    }

    /*Stuff when an action happens from one of those action listeners*/
    public void actionPerformed(ActionEvent evt) {
        if (evt.getSource()==this.inputBox) {//If it's from the input box
            this.input = inputBox.getText();//Get the input
            this.inputted = true;//Yay they inputted
        }
        else if (evt.getSource()==this.diaryBtn){//Else if its the open diary button
            Window.diaryBox.showDiary();//open the diary
        }        
    }

    /*Used to get the input from the textbox*/
    String getInput(){
        if (!this.input.equals(null)) {//As long as there is text in the textbox,,
            if (!this.input.equals("n/a")) {//Make sure some smartass can't put in "n/a" as input, because we use that to represent an option that doesn't exist in story.txt
                this.inputted = false;
                return this.input.toLowerCase();//return the input in lowercase so we can compare easily
            }
            else{//somebody typed n/a
                this.inputted = false;
                return "no input";//return "no input" instead, so it won't affect anything             
            }            
        }       
        else{//They didn't type anything
            this.inputted = false;
            return "no input";//return "no input" so nothing happens
        }
    }

    /*To enable the diary button*/
    void enableDiary(){
        this.diaryBtn.setEnabled(true);//enable it
        this.diaryBtn.setForeground(Color.white); //make the text white
    }

    /*Access method (static) to get the diary window*/
    static DiaryView getDiaryBox(){
        return Window.diaryBox;
    }

}