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

# Division of Labor
### RuiLong Jiang
- database connection
- passport js local strategy
- jwt token signing
- example secure route GET /users with jwt strategy
- POST /user/login
- POST /user/register

### Chaolong Tang
- Implement back-end Image end-points and database crud functions
    - Add image
    - Get image by id
    - Delete image by id

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

### Hongwei Shu
- Implemented end-points for user.
  - user/register
  - user/update
  - user/delete
- Implemented the navigation bar after login
- Implemented login/signup html and js part
- Image part with user information
- Updated user profile edit (HTML) and delete(request in js)