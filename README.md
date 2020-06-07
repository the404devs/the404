# the404
http://the404.nl/

The404 is my personal site, where I speak my mind and host all sorts of things I've created over the years.

The current iteration of The404 was created on January 18th, 2018. The404 originally belonged to my good friend Zeeshan, who sold me the site for a whopping 1 cent. He now has a new site called The403. 404 is **clearly** better.


### *4.0.0 (06/07/20)*
----------------------
- Archived 3.X version, found under the `old3` directory.
- Moved blog and software entries to Firebase.
    - Removed old blog and software JSON files.
- Replaced PHP code that reads data from JSON files to generate site with JS/jQuery code that reads from Firebase.
    - Firebase code found within `js/firebase.js`
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
