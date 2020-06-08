package toad;
import java.awt.*;
import javax.swing.text.*;

/*PoinyCaret inherits from Java's DefaultCaret*/

public class PointyCaret extends DefaultCaret {

	private static final long serialVersionUID = 1234567890L;
    private final String mark = "<";
    //I made this string constant. This character is used for the cursor in the textbox

    public PointyCaret() {
        setBlinkRate(0);
    }

    @Override
    protected synchronized void damage(Rectangle r) {
        if (r == null) {
            return;
        }

        JTextComponent comp = getComponent();
        FontMetrics fm = comp.getFontMetrics(comp.getFont());
        int textWidth = fm.stringWidth(">");
        int textHeight = fm.getHeight();
        x = r.x;
        y = r.y;
        width = textWidth;
        height = textHeight;
        repaint(); // calls getComponent().repaint(x, y, width, height)
    }

    @Override
    public void paint(Graphics g) {
        JTextComponent comp = getComponent();
        if (comp == null) {
            return;
        }

        int dot = getDot();
        Rectangle r = null;
        try {
            r = comp.modelToView(dot);
        } catch (BadLocationException e) {
            return;
        }
        if (r == null) {
            return;
        }

        if ((x != r.x) || (y != r.y)) {
            repaint(); // erase previous location of caret
            damage(r);
        }

        if (isVisible()) {
            FontMetrics fm = comp.getFontMetrics(comp.getFont());
            int textWidth = fm.stringWidth(">");
            int textHeight = fm.getHeight();

            g.setColor(comp.getCaretColor());
            g.drawString(mark, x, y + fm.getAscent());
        }
    }
}
