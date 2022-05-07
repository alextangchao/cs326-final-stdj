# Title
Team YYDS

# Subtitle
Food and UMass

# Semester
Spring 2022

# Overview
Food & UMass is a website that students could share their thoughts on the food at dining halls everyday. Users can score the food, leave comments, add pictures, and tag the dining hall location. Based on their peer's ratings, students could choose the best dining common to go each day. Currently we have Yelp on the market as a competitor but our website will be UMass oriented and tailored to the campus dining commons for students.

# Team Members:
Chaolong Tang (alextangchao) \
RuiLong Jiang (AMOOOMA) \
Xuming Deng (Silvennnn) \
Hongwei Shu ()


# User Interface //TODO Upload Image
- Home 
    - Home is the first page when user enter our website. It will list a few latest reviews from each dining hall. Also, it contians the navigation bar to help user navigate our website.

- Dining Hall Pages
    - Each page contain the reviews for specific dining hall and reviews are sorted by date (Latest First)
        - Berkshire
        - Hampshire
        - Franklin
        - Worcester

- Post Review
    -  Page where user could create and post their review for each dining hall.

- Sign up
    - Page where user could create an account

- Login
    - Page where user could login to our website.

- User Home
    - Page where user could manage(edit/delete) all their posted reviews.

# APIs

## User API
/users - a view endpoint that returns all of the existing users \
/user/login - which allow users to login \
/user/register - which allow users to register \
/user?id= - a view endpoint which return the user's information by uuid \
/user/reviews?id - which return all the reviews post by a user by user uuid \
/user/update - which allow users to update personal information such as pfp, name, password \
/user/delete - which allow users to delete their account and reviews accordingly

## Review API
/review/location?name= - which returns all of the reviews of a specific dining hall \
/review/create - which allow users to create a review \
/review?id= - a view endpoint which return a specific review base on review id \
/review/update - which allow users to update their review \
/review/delete - which allow users to delete their review 


## Image API
/image?id= - which allow client to get the image from server by id \
/image/create - which allow client to upload the image \
/image/delete - which allow client to delete the image 


# Database
#### user document
```
{
	_id: <ObjectId1>,
	username: String,  // The username of the user
	password: String,  // The sha256 encrypted password of the user
}
```

#### review document
```
{
	_id: <ObjectId1>,
	user_id: String,  // User id for referencing user data
	rating: Integer,  // User rating
	location: String, // Dining hall location
	review_text: String, // User review
	visited_date: String, // Visited date submitted by the user, YYYY-MM-DD
	review_img_id: String[Optional] // Uploaded image id
}
```

### image GridFS
#### image.files
```
{
	_id: <ObjectId1>,
    	length: Integer, // file length
    	chunkSize: Integer, // chunk count in image.chunks
    	uploadDate: Date, // image uploaded date
	filename: String,  // filename of the image
	contentType: String,  // image type
}
```

#### image.chunks
```
{
	_id: <ObjectId1>,
    	files_id: <ObjectId2>, // Reference id for image.files 
	n: Integer,  // Sequence number of the chunk
	data: Binary // Actual file data
}
```



# URL Routes
| URL routes        | description                                |
| ----------        | -----------                                |
| index.html        | Home page for our website              |
| berkshire.html    | Page includes all the reviews for Berkshire dining |
| hampshire.html    | Page includes all the reviews for Hampshire dining |
| franklin.html     | Page includes all the reviews for Franklin dining  |
| worcester.html    | Page includes all the reviews for Worcester dining |
| login.html        | Page where users can login          |
| signup.html       | Page where users can sign up          |          |
| user-home.html    | Page where users can view all reviews post by themselves        |
| edit-review.html  | Page where users edit their review          |          |
| edit-user.html    | Page where users edit personal information          |          |

# Authentication
Authentication is done using passport's local strategy for login and password is encrypted using sha256 on the backend and stored in db collection user. Persistent login and crediential verification is done with issuing jwt token with expiration date and is encrypted with salt set by the environmental variable. All secure routes, such as /user/delete, are protected using passport's jwt strategy.

# Division of Labor
### RuiLong Jiang
- Init express server and serve static client files. 
- Setup backend endpoint user/update, delete, review/update, delete with const faker_review and faker_user. 
- Frontend crud js for sending the corresponding PUT/DELETE request. 
- Post review page's frontend js for review form submission with image. 
- Add edit-user.html for user to make changes to account details.

### Chaolong Tang
- Created backend API end-points for the image parts, including get image by id, upload image and delete image by id.
- Config backend CORS setting.
- Create frontend js function on fetching image, including upload, get, and delete image.
- Create user's home page for showing all the reviews post by this user. Also support user to edit and delete its reviews.
- Create Edit Review Page (html and js) for user to edit its review.
- Deploy project on Heroku.

### Xuming Deng
Assigned: Review Parts
- Implemented end-points for reviews. 
    - /review/location?name=
    - /review/create
    - /review?id=
- Implemented database function for reviews.
    - addReview
    - deleteReview
    - getReview
    - getReviewByLocation
    - getReviewByUserID
- Front-end UI design for reviews.
- Implemented DiningHall.js
    - Fetching all the reviews from the server (For specific dining hall)
    - Generating review and render on each dining hall page

### Hongwei Shu
- Created end-points for user/loign, user/register, user/get
- Created edit_user.js for update user profile
- Created loginsing_user.js for login and register
- Updated user profile edit (HTML) and delete(request in js)


# Conclusion
### Xuming Deng
This is my first time building a website. It was a really valuable expeirence for me. I learned a lot about how to UI design and back-end implementation, such as configuring server and database. I do encountered many difficulties, but thanks to my teammates, they gave me lots of idea and fix all those problems.  












