function blog() {
var cont = ` 
        <h2>Blog</h4>
        
        <img src="dota_heroes.png" alt="heroes" 
        style="width:17%;margin-right:32px;border-radius:9px;">
        
        Now I will talk about the database I will be using for this project. The following will be the attributes I will use for my table:

        <ul><li>ID</li>
            <li>Team Name</li>
            <li>Hero Names</li>
            <li>Team Goals</li>
            <li>Description</li>
            <li>Team Items</li>
        </ul>

        <p>
        I have previously taken a digital art and design class (before I transferred to Temple) that went over mostly Photoshop, but at the end of the semester we did some HTML/CSS work.
        But other than that I have no experience really.
        <br>
        <br>
        
        HW 1 Discussion:
        I found this assignment to be a little tricky, but that was mostly my own fault. I had been confused on where the sample code was for a while and tried to
        just start this project from scratch and ran into a lot of problems. However, once I was able to finish my internship on Sept. 4th, I have had a lot
        more time to focus on this work. Once I got through all the material, I found this project to be very fair. 
        <br>
        <br>
    
        HW 2 Discussion:
        I found this assignment to be pretty tricky. Mostly the routing and forwarding sections.
        The dropdown material was very easy to follow and I think I understood what I needed to do
        the entire time. Overall I thought this project was more difficult than the first weeks assignment,
        but it was still managable once I got through all the material.
        <br>
        <br>
    
        Database Design:
        <a href="database_design.pdf">Click here for pdf document</a>
        <br>
        <br>
    
        HW 8 Discussion:
        I had a lot to catch up on for homework 8, so most of my trouble felt like it was getting some of the features from our recent homeworks working.
        Other than that, though, I did find the amount of routing a bit difficult to keep working cohesively. I also really had to do a lot of thinking into
        the API's we needed to create and work with, since I had not been able to get them working up until this homework.'
        <br>
        <br>
        
        HW 9 Discussion:
        I found this homework to be fairly straightforward compared to the past few homeworks I needed to complete. I think it was a mix of me finally
        coming to get a good understanding of how our web applications work, and also this homework being a bit heavy on copying code from the sample
        project.
        <br>
        <br>
        
        FINAL PROJECT EDITS (I had no feedback to improve from for homeworks not listed):
        HW3a:
        I took the advice I got from a Canvas message from Matt to properly fix my SlideShow formatting, and applied his advice to fix the layout. I think I
        made the fix by addint the slide show to the class list for invoking the public method (my other feedback).
        <br>
        <br>
    
        HW3b:
        I added an extra non-character, nullable field to my other table, and have a fully filled out web record in web_user, and cleaned up the SQL.
        <br>
        <br>
        
        HW4:
        I added the base code for HW4 (missed assignment)
        <br>
        <br>
        
        HW5:
        I added the base code for HW5 (missed assignment)
        <br>
        <br>
    
        HW6:
        I added the base code for HW6 (missed assignment)
        <br>
        <br>
        
        HW7:
        I added the base code for HW7 (missed assignment)
        <br>
        <br>
        
        HW8:
        I edited my other database to show that my update other code can handle nullable non-character fields (added nullable field date_relevant). 
        I also added a pick list for web users in my update other page, as my comments asked.
        <br>
        <br>
    
        HW9:
        I am a little confused here on what situation can occur where a user cannot be deleted. 
        </p>
    `;
        var elem = document.createElement("div");
        elem.innerHTML = cont;
        return elem;
        }