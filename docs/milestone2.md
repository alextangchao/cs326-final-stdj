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

# Heroku Application:

# Division of Labor:
### RuiLong Jiang
user/update, delete, review/update, delete
### Chaolong Tang
img/id, upload, delete
### Xuming Deng
Assigned: review/location, create, get
- Create end-points for review/location, review/create, review/id
- Create Fake Reviews

### Hongwei Shu
user/loign, register, get
