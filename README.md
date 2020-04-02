# The Peer Rewards and Recognition System 

Peerly is peer-rewarding system! Every employee gets a 'star' and a 'high-5' every week that they can use. 
You use it or lose it i.e. if you don't use it to appreciate someone, you lose it.

A 'star' is what you give to someone who you want to appreciate. 
A 'high-5' is an add-on to another person's appreciation i.e. if Person-1 gives a 'star' to Person-2 for an action, Person-3 can give a 'high-5' for that action. 
Since you have only 1 star and 1 high-5 a week, you need to use it prudently! 

# Giving a 'star'

A star can be given to anyone in the company if you want to appreciate his/her actions.
The action must be one of the Core Values of the company. 
Obviously, you must choose a person.
There must be a reason for the peer reward

# Giving a 'high-5'

You can give your high-5 on any other rewards given. 
You have only 1 high-5 a week and once you give a high-5, you cannot take it back or change it!
Any reward can receive **at most 3** high-5's. 

# Core Values 

Each company has it's core values! 

* Technical Excellence
	* Mentoring - Investing time and effort to mentor others. 
	* Collboration - Helping others in their work.
	* Unsung Hero - Working behind the scenes to provide critical work.
	* Training - Conduct a good training to educate others!
	* Quality - Actions that imporove the quality of a product, beyond work expectations
* Initiatives and Creativity
	* Good Citizen - Doing the right thing for another person or a group.
	* Making it happen - Delivering the work by putting in extra efforts.
	* Sharing is Caring - Sharing valuable information, pro-tips, resources to help others. 
	* Happy Customer - Getting appreciation from someone outside Josh! (client, vendor, guests, etc.)
	* Above and Beyond - Doing something that helps others, without being asked to do so.
	* Planner - Planning a party, activity that involves a lot of peolpe at Josh.
* Public Profile
	* Blogger - Publish a blog post 
	* Organizer - Organize or volunteer for meetups / trainings / conferences which will benefit everyone
	* Speaker - Speak at meetups / conferences for Josh!

All these "Core Values" are configurable! 

# Moderation

Periodically, a moderator can review the rewards given and flag them as "Fraud", "Not Relevant", "Incorrect".
These can be reviewed later via reports. 

# Reports

Collection of data is critical. This tells us the pulse of the company! 

* Number of stars received over a period
* Number of stars given over a period
* Number of high-5's received for rewards over a period
* How many people have only given stars but have received very few?
* How many people have received a lot of stars but given very few?
* Which day of the week are stars and high-5s given the most? 
* Flagged Rewards report (Later, we can add some machine-learning flow to auto-flag rewards or prevent fraud)

...

# Leaderboard 

You get an overall leaderboard i.e. till date and this months leader board. This will be the landing page along with important notices.

# Microservice Architecture

### RewardsManager 

The core service that decides who plays and how to play!

### ReportsManager 

 The analysis manager that generates different types of reports and the leader board.

### Common
* All communication between services would be via gRPC
* The services share a common database.
* Front-end will be API drive with API versioning.
* Authentication will be via Google Auth and JWT

