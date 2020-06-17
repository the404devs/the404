# the404
https://the404.nl/

The404 is my personal site, where I speak my mind and host all sorts of things I've created over the years.

The current iteration of The404 was created on January 18th, 2018. The404 originally belonged to my good friend Zeeshan, who sold me the site for a whopping 1 cent. He now has a new site called The403. 404 is **clearly** better.

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
    - Specifing a tag (eg: "Games") shows only entries with that tag.
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
