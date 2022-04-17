# Team Name
CS326-27-yyds

# API Endpoint & Description:

## User API
/user/login - which allow users to login \
/user/register - which allow users to register \
/user?id= - a view endpoint which return the user uuid \
/user/update - which allow users to update personal information such as pfp, name, password \
/user/delete - which allow users to delete their account and reviews accordingly

## Review API
/review/location?name= - which returns all of the reviews of a specific dining hall \
/review/create - which allow users to create a review \
/review?id= - a view endpoint which return a specific review base on review id \
/review/update - which allow users to update their review \
/review/delete - which allow users to delete their review 


## Image API
/img?id= - which allow client to get the image from server by id \
/img/upload - which allow client to upload the image \
/img/delete - which allow client to delete the image 


# Client Interface:
This is where we GET the list of reviews for a specific dining halls and retrieve review imgs accordingly
![Reviews](./img/faker-reviews.png)

This is where we can POST a new review into the database
![Review](./img/postReview.png)

This is where we can PUT or DELETE a review
![Review-edit-delete](./img/edit-delete-review.png)

Here is the login page to send a POST request to verify the user credentials
![Login](./img/login.png)

Here is the signup page where we can send a POST request to add a new user
![Signup](./img/signup.png)

# Heroku Application:

# Division of Labor:
### RuiLong Jiang
Init express server and serve static client files. Setup backend endpoint user/update, delete, review/update, delete with const faker_review and faker_user. Frontend crud js for sending the corresponding PUT/DELETE request.
### Chaolong Tang
img/id, upload, delete
### Xuming Deng
review/location, create, get
### Hongwei Shu
user/loign, register, get
