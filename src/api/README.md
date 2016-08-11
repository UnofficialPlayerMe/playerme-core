playerme-core: API
==============================

# Developer Checklist
Checklist based on [official docs](http://docs.playerme.apiary.io).

##  General
### ~~General / OAuth Stuff~~
*   ~~General / OAuth Stuff / Get the tokens from login~~
*   ~~General / OAuth Stuff / Refresh the tokens~~

### ~~General / Regular Login~~
*   ~~General / Regular Login / Login~~

### General / Pre-login
*   General / Pre-login / Prelogin

##  Auth related

### Auth related / Register
*   Auth related / Register / Register

### Auth related / Forgot Password
*   Auth related / Forgot Password / Forgot Password

### Auth related / Reset Password
*   Auth related / Reset Password / Reset

### Auth related / Get Invite Link
*   Auth related / Get Invite Link / Get Invite Link

##  Users
### Users / Users Collection
*   Users / Users Collection / List/Query all users

### ~~Users / User Entity~~
*   ~~Users / User Entity / Get user~~

### Users / Online users
*   Users / Online users / List online users

### Users / Change user's attributes
*   Users / Change user's attributes / Change user bio
*   Users / Change user's attributes / Change username
*   Users / Change user's attributes / Change email
*   Users / Change user's attributes / Change account type
*   Users / Change user's attributes / Change account privacy
*   Users / Change user's attributes / Allow everyone to message me
*   Users / Change user's attributes / Allow everyone to see me online
*   Users / Change user's attributes / Change password
*   Users / Change user's attributes / Delete account request

##  User's Avatars
### User's Avatars / Avatars Collection 
*   User's Avatars / Avatars Collection / List
*   User's Avatars / Avatars Collection / Upload
*   User's Avatars / Avatars Collection / Set as active

### User's Avatars / Avatar Entity
*   User's Avatars / Avatar Entity / Get Active
*   User's Avatars / Avatar Entity / Delete

##  User's Covers
### User's Covers / Covers Collection
*   User's Covers / Covers Collection / List
*   User's Covers / Covers Collection / Upload
*   User's Covers / Covers Collection / Set as active
### User's Covers / Cover Entity
*   User's Covers / Cover Entity / Get Active
*   User's Covers / Cover Entity / Delete

##  User's Groups
### User's Groups / Groups Collection
*   User's Groups / Groups Collection / Index

##  User's Activities
### User's Activities / Activities Collections
*   User's Activities / Activities Collections / Index

##  User's Social Profiles
### User's Social Profiles / Profiles Collection
*   User's Social Profiles / Profiles Collection / Index
*   User's Social Profiles / Profiles Collection / Save/Modify Social accounts

##  User's Videos
### User's Videos / Videos Collection
*   User's Videos / Videos Collection / Index

### User's Videos / Video Entity
*   User's Videos / Video Entity / Delete

##  User's Notifications
### User's Notifications / Notifications Collection
*   User's Notifications / Notifications Collection / Index
*   User's Notifications / Notifications Collection / Get Unread Count
*   User's Notifications / Notifications Collection / Mark as read
*   User's Notifications / Notifications Collection / Mark as unread
*   User's Notifications / Notifications Collection / Mark all notifications as read
*   User's Notifications / Notifications Collection / Clear unread flag

##  User's Photos
### User's Photos / Photos Collection
*   User's Photos / Photos Collection / Index
*   User's Photos / Photos Collection / Upload

### User's Photos / Photo Entity
*   User's Photos / Photo Entity / Update photo description
*   User's Photos / Photo Entity / Delete

##  Groups
### Groups / Groups Collection
*   Groups / Groups Collection / List/Query

##  Group's Members
### Group's Members / Members Collection
*   Group's Members / Members Collection / List
*   Group's Members / Members Collection / Group Owner: Invite user to join
*   Group's Members / Members Collection / User: Request to join group

### Group's Members / Members Entity 
*   Group's Members / Members Entity / Accept request / Cancel request 
*   Group's Members / Members Entity / Remove membership

##  Follow
### Follow / Followers
*   Follow / Followers / List user's followers

### Follow / Following
*   Follow / Following / List user's following
*   Follow / Following / Follow someone

### Follow / Following Entity
*   Follow / Following Entity / Unfollow someone

##  Games
### Games / Games Collection
*   Games / Games Collection / List/Query all games
*   Games / Games Collection / Suggest a missing game

### Games / Game Entity
*   Games / Game Entity / Get Game

### Games / Game Attributes
*   Games / Game Attributes / Suggest

### Games / Game videos
*   Games / Game videos / List
*   Games / Game videos / Add

### Games / Game videos Entity
*   Games / Game videos Entity / Remove

### Games / Game images
*   Games / Game images / List

### Games / Game activities
*   Games / Game activities / List

### Games / Game tags
*   Games / Game tags / List

### Games / Game players
*   Games / Game players / List

##  Games Platforms
### Games Platforms / Platforms
*   Games Platforms / Platforms / Index

##  Feed
### Feed / Post Collections
*   Feed / Post Collections / Browse the feed
*   Feed / Post Collections / Add a post
*   Feed / Post Collections / Subscribe to an activity

### Feed / Post Entity
*   Feed / Post Entity / Get a post
*   Feed / Post Entity / Edit a post
*   Feed / Post Entity / Delete a post

### Feed / Comments Collection
*   Feed / Comments Collection / List comments for a post
*   Feed / Comments Collection / Add a comment

### Feed / Comment Entity
*   Feed / Comment Entity / Get a comment
*   Feed / Comment Entity / Edit a comment
*   Feed / Comment Entity / Delete a comment

### Feed / Activity Likes
*   Feed / Activity Likes / View users who liked this entity
*   Feed / Activity Likes / Like

### Feed / Activity Pins
*   Feed / Activity Pins / View users who pinned this entity
*   Feed / Activity Pins / Pin

### Feed / Activity Share
*   Feed / Activity Share / View users who shared this entity
*   Feed / Activity Share / Share

### Feed / Comment Likes
*   Feed / Comment Likes / View users who liked this entity
*   Feed / Comment Likes / Like

### Feed / Blocking a user
*   Feed / Blocking a user / List users on the current user's blocklist
*   Feed / Blocking a user / Add a user to the blocklist
*   Feed / Blocking a user / Remove user from the blocklist

### Feed / Hiding a user 
*   Feed / Hiding a user / List users on the current user's hidelist 
*   Feed / Hiding a user / Add a user to the hidelist
*   Feed / Hiding a user / Remove user from the hidelist

### Feed / Streams
*   Feed / Streams / Index

### Feed / Report a post/comment
*   Feed / Report a post/comment / Add

##  Messaging
### Messaging / Message Groups Collection
*   Messaging / Message Groups Collection / List
*   Messaging / Message Groups Collection / Find private groups with user
*   Messaging / Message Groups Collection / Create a group
*   Messaging / Message Groups Collection / Send a message

### Messaging / Message Groups Search
*   Messaging / Message Groups Search / Search
*   Messaging / Message Groups Entity / Add user to group
*   Messaging / Message Groups Entity / Change chat group name

### Messaging / Messages collection
*   Messaging / Messages collection / List messages

### Messaging / Messaging notifications
*   Messaging / Messaging notifications / Mark as read
*   Messaging / Messaging notifications / Mark all as read
*   Messaging / Messaging notifications / Clear unread flag

##  Search and Browse
### Search and Browse / Global Search
*   Search and Browse / Global Search / Global Search

##  Game Library
### Game Library / Game Tags Collection
*   Game Library / Game Tags Collection / Index
*   Game Library / Game Tags Collection / Create a new tag

### Game Library / Game Tags Entity
*   Game Library / Game Tags Entity / Delete a tag

### Game Library / Game Tags' Game Collection
*   Game Library / Game Tags' Game Collection / Index
*   Game Library / Game Tags' Game Collection / Add a game

### Game Library / Game Tags' Game Entity
*   Game Library / Game Tags' Game Entity / Remove a game from a tag

### Game Library / Current User tags for a specific game
*   Game Library / Current User tags for a specific game / Index

##  Social Connections
### Social Connections / Facebook
*   Social Connections / Facebook / Store/Update
*   Social Connections / Facebook / Disconnect

##  Misc.
### Misc. / Support
*   Misc. / Support / Send feedback/support email to devs
