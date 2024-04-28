# React project

## Plan

1. Start with layout and the git setup
   - Also setup Netlify host right away
2. Plan and setup a ganttchart
3. XD on each use-case with a persona expectation
4. code and code!
5. this time I want to be done before last minute...

## Why social_media_client

Added the React app to /social_media_client
As npx create-react-app did not want to accept capital letters (used in my name in the given Noroff Repo)
Therefore I added a .gitignore file in this directory

## Models and limitations from the documentation

### Social Posts

title maxLength: 280
body maxLength: 280

### Login and Registration

name: ^[\w]+$
maxLength: 20

email: ^[\w\-.]+@(stud\.)?noroff\.no$
password: minLength 8

## Use-Cases

Profile follow and unfollow on any of the pages.
Same with a set of given emosjis (for posts)

### Main landing page?

### Registration Page

confirm email
login
logout
update avatar and banner

### logged in - list of posts

List of posts (pagination or continus scoll) - need to learn this?

- Link to individual posts for more information?
- Add a new post? - popup or same page "widget"

List of Profiles ?

- Follow
- UnFollow

## Single POST

get the post by ID

- if owner:
  1. update
  2. delete
- ANY
  1. comment
  2. React with emoji

## Single Profile

get the profile by NAME

"name": "A0CBjV0VzXm7acFsS62W",
"email": "user@example.com",
"banner": "string",
"avatar": "string",

- See followers
- See who they follow
- See all posts

9. A registered user may create a `Post`
10. A registered user may update a `Post` they own
11. A registered user may delete a `Post` they own
12. A registered user may create a `Comment` on any `Post`
13. A registered user may `react` to any `Post` with an emoji
14. A registered user may `follow` and `unfollow` another `Profile`
