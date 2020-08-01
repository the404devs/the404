# the404
https://the404.nl/

The404 is my personal site, where I speak my mind and host all sorts of things I've created over the years.

The current iteration of The404 was created on January 18th, 2018. The404 originally belonged to my good friend Zeeshan, who sold me the site for a whopping 1 cent. He now has a new site called The403. 404 is **clearly** better.

### *4.0.7 (07/29/20)*
----------------------
- Nav tabs won't show up until page content is retrieved from Firebase.
    - This stops the user from getting sent back to the home tab once stuff actually loads.
- Removed some unnecessary debug output.
- Fixed text alignment in tabs.
- Buttons are 31px tall again. I guess it was just a bug in Chrome's renderer.
- Better-looking error messages when logging into the admin zone.
- All projects have an *xxxx.the404.nl* subdomain, some links have been changed accordingly.
- Removed CPS530 stuff, since that has its own repo now. https://cps530.the404.nl

### *4.0.6 (07/14/20)*
----------------------
- Buttons are now 30px tall, instead of 31px. The text was slightly off-centre, which was destroying my soul.
- Both Blog and Software panes can be switched between ascending and descending date sort, whereas it used to be ascending (oldest first) on Software, and descending (newest first) on Blog.

### *4.0.5 (06/19/20)*
----------------------
- Sadly, all good things must come to an end, even v4.0.4.
- Inactive panes are now set to `display: none`, primarily for CTRL+F reasons.
    - The content of inactive panes no longer interferes with CTRL+F searches.
    - This will probably prove to be convenient for other reasons as well.
    - I was worried this would interfere with the animations and scroll-position-saving, but it just works.
- Feedback on Admin page is now sorted by date, for my sanity.
    - Fixed bug where feedback submitted on the same day overwrites older feedback from that day.
- Grammar tweaks on Museum page, and general spelling fixes throughout the site.
- Added v4.0.4 commemoration to Museum.
- Dots in image galleries are now dynamically generated, so I don't have to keep copy-pasting them.
- Adjusted hover animation for circular image gallery arrow buttons.
- Changed input placeholder text colour to be more readable.
- CSS tweaks to 404 (the error) page.
- Removed SM64TT site, since that has now been properly preserved at https://the404devs.github.io/sm64tt/
- Adjusted CSS to accommodate software entires with 3 buttons.
- Fixed CSS, so that webpage content fills the whole screen width on screens larger than the one I'm currently using.
- Updating blog posts and such from the Admin page now invalidates the cache, so changes will be reflected on the main site immediately.
- Minecraft server now runs 1.16.1, text changed accordingly.

### *4.0.4 (06/17/20)*
----------------------
- #### This version number will only happen once, enjoy it while it lasts!
- Fixed bug where nav menus from inactive panes would interfere with interacting with active pane
    - Inactive panes are now set to z-index -1
- Plenty of admin page polish, not that you'll ever see it
    - Moved "Sign out" button to header, alongside new "Refresh" button that, well, refreshes the page with the up-to-date db contents.
    - Styling changes to email feedback viewer.
- Feedback submitted through the site now has a date appended to it, for my own convenience.
- Adjusted 404 (the error) page to include a home button at the top, as well as fixed up the styling to be more consistent with the main site.
- Background of text inputs are now ever so slightly darker than before on hover.
- Styling tweaks for the About pane.
- Removed underline from post-head and post-date. Might revert later.

### *4.0.3 (06/16/20)*
----------------------
- Added feedback viewer to admin page.
- Added link to 404 repo on museum page.
- Tweaked css background-transparent colour to be more transparent.
- Gave pages unique titles.
- Adjusted text shadows.
- Moved fonts to separate directory.
- Replaced Overpass font with Gilroy.

### *4.0.2 (06/12/20)*
----------------------
- Added filter to Software pane, as promised.
    - Specifying a tag (eg: "Games") shows only entries with that tag.
    - Works the same with languages (eg: "C#").
    - If both a tag and language are selected, only entries with that tag and language combo are displayed.
        - eg: all "Games" written in "C#"
- Added the 404 Museum, a showcase of the404's history.
- Slapped a tab on each non-index page that takes you back to the homepage, if clicking the logo wasn't obvious enough.
- Created custom checkbox images for use in the Software filter menu.

### *4.0.1 (06/08/20)*
----------------------
- Content now served over HTTPS
- Fixed up 404 page (the error)
- Added things left behind during the Github migration
    - Toad's Terror
    - Mario Quiz
    - Unfinished Waluigi Game
- Removed 404-Editor, I don't know how it snuck in here
- Added super-secret, super-secure admin page
    - Accessed via version number on index
    - Requires logging into the DB
    - Allows me to edit and create blog posts and software entries.
    - Relatively Zeeshan-proof
- Added simple image gallery for logo renders
- Added link to this repo
- Slight changes to the 'About' pane.

### *4.0.0 (06/07/20)*
----------------------
- Archived 3.X version, found under the `old3` directory.
- Moved blog and software entries to Firebase.
    - Removed old blog and software JSON files.
- Replaced PHP code that reads data from JSON files to generate site with JS/jQuery code that reads from Firebase.
    - Firebase code found within `js/firebase.js`
    - In order to reduce the amount of read requests sent to Firebase (there's a limit of 50k per day), the DB is cached, and we use a cookie to validate the age of the cache. We only update the cache DB if the current cache is over an hour old, or if the cookie magically disappears.
- Altered archives that use PHP to simply use a snapshot of a generated index. These include `old2`, `old3`, `birthday`
- Separated Birthday archive from the main site, cleaning the place up a bit.
- New feedback system. Instead of directly emailing me, feedback is saved in the Firebase DB.
- Bottom of the "About" pane got a clean-up.
- Migrated site from 000webhost to GitHub Pages.
    - RIP scottmsenior777, brutally murdered in his sleep.
- Minor CSS changes because weird shit was happening?

### *3.7.2 (06/06/20)*
----------------------
- Added navigation menu to blog pane, allowing for easy finding of the different articles.
- Added framework for tag-based filter on software pane.
- Chucked onto Github due to hosting troubles. Will likely migrate to Github Pages in the coming days.

### *Legacy Changelog (pre-Github)*
-----------------------------------
*Some versions may be missing, I didn't keep detailed changelogs for the site back then.*
#### *3.7.1 (06/01/20)*
-----------------------
- Added lore.
- Added logo renders.
- Migrated all projects to Github, links changed accordingly.
#### *3.7.0 (05/07/20)*
-----------------------
- New green/purple colour scheme
#### *3.6.0 (02/14/20)*
-----------------------
- New sunset-like colour scheme.
#### *3.5.1 (01/10/20)*
-----------------------
- Added retro-style birthday page.
#### *3.5.0 (12/07/19)*
-----------------------
- Overhauled site to make it more colourful.
- Added index page for CPS530 stuff.
#### *3.4.1 (09/08/19)*
-----------------------
- Software entries given the JSON treatment as well.
#### *3.4.0 (09/07/19)*
-----------------------
- Removed hardcoded blog posts from index.
- Blog posts are stored as JSON files, and page content is dynamically generated via some PHP code.
#### *3.3.0 (08/04/19)*
-----------------------
- Added status thing for Minecraft server (mc.the404.nl)
- Cleaned up the site, added some purple and some new fonts.
#### *3.2.0 (06/06/19)*
-----------------------
- New blue/red colourscheme.
#### *3.1.0 (04/04/19)*
-----------------------
- New font, and new colours.
#### *3.0.0 (03/10/19)*
-----------------------
- Site completely rewritten.
- Added navigation tabs in top-right.
#### *2.2.0 (01/31/19)*
-----------------------
- Added social media buttons to Contact tab.
- Removed old Main tab, added first blog post.
#### *2.1.0 (09/16/18)*
-----------------------
- Added link to Waluigi's Quest for Smash to main tab.
- Updated Contact tab.
#### *2.0.0 (08/27/18)*
-----------------------
- Rewritten and redesigned site.
- Introducing: purple!
- All content is within index.html, and different tabs divide up the content.
#### *1.2.0 (06/28/18)*
-----------------------
- Updated index.
- Added links to CS projects on index.
- Changed header font to Camaraderie.
- Changed accent colour to purple.
#### *1.1.1 (03/16/18)*
-----------------------
- Added more things to Software page, split into categories.
#### *1.1.0 (02/16/18)*
-----------------------
- Added fun things to main page.
#### *1.0.0 (01/26/18)*
-----------------------
- Added proper main page, as well as Software and Development pages.
- New navigation menu.
#### *0.0.1 (01/18/18)*
-----------------------
- Initial version.
- Beta homepage.