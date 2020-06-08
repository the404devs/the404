/*Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
Scream class
AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
play the game, you'll see what it's used for*/
package toad;

import toad.*;
import java.io.*;
import java.util.*;
import javax.sound.sampled.*;

/*It plays a toad screaming sound. That's it.*/
public class Scream{

	private static final long serialVersionUID = 1234567890L; 
    private static final String path = "aud/ahh.wav";//Static and constant, look at that!
    private File file = null;//To hold the file data and audio clip
    private Clip clip = null;

    /**********************
    Constructors for Scream
    **********************/
    Scream(){
        file = new File(path);//Make a file object with the path we came up with
    }

    /*****************
    Methods for Scream
    *****************/
    //Play the sound
    void scream(){        
        try {
            this.unscream();//Stop any sound
            AudioInputStream inputStream = AudioSystem.getAudioInputStream(this.file);//Find our file
            this.clip = AudioSystem.getClip();//turn it into a clip object
            this.clip.open(inputStream);//open it
            this.clip.start();//start it
        } catch (Exception e) {
            this.unscream();//If it breaks, stop the sound
        }
    }

    //To stop the sound
    void unscream(){
        if (this.clip != null) {//If there is any track running...
            this.clip.stop();//stop it
            this.clip.close();//close it
            this.clip = null;//reset our clip object
        }
    }
}