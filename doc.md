# FastAPI OpenAPI Documentation

## Overview
This document provides the OpenAPI documentation for the FastAPI application. It includes the available endpoints, request parameters, request body schemas, and responses.

### Version
- **OpenAPI Version**: 3.1.0
- **API Version**: 0.1.0

### Paths

#### Add User Data
- **Endpoint**: `/user/add`
- **Method**: `POST`
- **Tags**: `User`
- **Summary**: Add User Data
- **Operation ID**: `add_user_data_user_add_post`
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `UserSchema`
- **Responses**:
  - **200**: 
    - **Description**: User data added into the database
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Get Users
- **Endpoint**: `/user/all`
- **Method**: `GET`
- **Tags**: `User`
- **Summary**: Get Users
- **Operation ID**: `get_users_user_all_get`
- **Responses**:
  - **200**: 
    - **Description**: Users retrieved
    - **Content Type**: `application/json`

#### Get User
- **Endpoint**: `/user/{user_id}`
- **Method**: `GET`
- **Tags**: `User`
- **Summary**: Get User
- **Operation ID**: `get_user_user__user_id__get`
- **Parameters**:
  - **Path Parameter**: `user_id` (string, required)
    - **Title**: User Id
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Update User Data
- **Endpoint**: `/user/update/{user_id}`
- **Method**: `PUT`
- **Tags**: `User`
- **Summary**: Update User Data
- **Operation ID**: `update_user_data_user_update__user_id__put`
- **Parameters**:
  - **Path Parameter**: `user_id` (string, required)
    - **Title**: User Id
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `UserSchema`
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Login User
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Tags**: `Auth`
- **Summary**: Login User
- **Operation ID**: `login_user_auth_login_post`
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `UserLogin`
- **Responses**:
  - **200**: 
    - **Description**: Access token generated
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Update News
- **Endpoint**: `/news/update/{news_id}`
- **Method**: `PUT`
- **Tags**: `News`
- **Summary**: Update News
- **Operation ID**: `update_news__news_update__news_id__put`
- **Parameters**:
  - **Path Parameter**: `news_id` (string, required)
    - **Title**: News Id
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `UpdateNewsBaseModel`
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Create News
- **Endpoint**: `/news/add`
- **Method**: `POST`
- **Tags**: `News`
- **Summary**: Create News
- **Operation ID**: `create_news_news_add_post`
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `NewsBaseModel`
- **Responses**:
  - **200**: 
    - **Description**: News has been added
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Get News
- **Endpoint**: `/news/all`
- **Method**: `GET`
- **Tags**: `News`
- **Summary**: Get News
- **Operation ID**: `get_news__news_all_get`
- **Responses**:
  - **200**: 
    - **Description**: News viewed
    - **Content Type**: `application/json`

#### Get News By Id
- **Endpoint**: `/news/{news_id}`
- **Method**: `GET`
- **Tags**: `News`
- **Summary**: Get News By Id
- **Operation ID**: `get_news_id_news__news_id__get`
- **Parameters**:
  - **Path Parameter**: `news_id` (string, required)
    - **Title**: News Id
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Create Event
- **Endpoint**: `/event/add`
- **Method**: `POST`
- **Tags**: `Event`
- **Summary**: Create Event
- **Operation ID**: `create_event_event_add_post`
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `EventsBaseModel`
- **Responses**:
  - **200**: 
    - **Description**: Event has been added
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Get Event By Id
- **Endpoint**: `/event/{event_id}`
- **Method**: `GET`
- **Tags**: `Event`
- **Summary**: Get Event By Id
- **Operation ID**: `get_event_id_event__event_id__get`
- **Parameters**:
  - **Path Parameter**: `event_id` (string, required)
    - **Title**: Event Id
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Get Events
- **Endpoint**: `/event/all`
- **Method**: `GET`
- **Tags**: `Event`
- **Summary**: Get Events
- **Operation ID**: `get_event__event_all_get`
- **Responses**:
  - **200**: 
    - **Description**: Events viewed
    - **Content Type**: `application/json`

#### Update Event
- **Endpoint**: `/event/update/{event_id}`
- **Method**: `PUT`
- **Tags**: `Event`
- **Summary**: Update Event
- **Operation ID**: `update_event__event_update__event_id__put`
- **Parameters**:
  - **Path Parameter**: `event_id` (string, required)
    - **Title**: Event Id
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `UpdateEventsBaseModel`
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Update Research
- **Endpoint**: `/research/update/{research_id}`
- **Method**: `PUT`
- **Tags**: `Research`
-

 **Summary**: Update Research
- **Operation ID**: `update_research__research_update__research_id__put`
- **Parameters**:
  - **Path Parameter**: `research_id` (string, required)
    - **Title**: Research Id
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `UpdateResearchBaseModel`
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Create Research
- **Endpoint**: `/research/add`
- **Method**: `POST`
- **Tags**: `Research`
- **Summary**: Create Research
- **Operation ID**: `create_research_research_add_post`
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `ResearchBaseModel`
- **Responses**:
  - **200**: 
    - **Description**: Research has been added
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Get All Research
- **Endpoint**: `/research/all`
- **Method**: `GET`
- **Tags**: `Research`
- **Summary**: Get All Research
- **Operation ID**: `get_all_research__research_all_get`
- **Responses**:
  - **200**: 
    - **Description**: Research viewed
    - **Content Type**: `application/json`

#### Get Research By Id
- **Endpoint**: `/research/{research_id}`
- **Method**: `GET`
- **Tags**: `Research`
- **Summary**: Get Research By Id
- **Operation ID**: `get_research_id_research__research_id__get`
- **Parameters**:
  - **Path Parameter**: `research_id` (string, required)
    - **Title**: Research Id
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Add Alumni Data
- **Endpoint**: `/alumni/add`
- **Method**: `POST`
- **Tags**: `Alumni`
- **Summary**: Add Alumni Data
- **Operation ID**: `add_alumni_data_alumni_add_post`
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `AlumniSchema`
- **Responses**:
  - **200**: 
    - **Description**: Alumni data added into the database
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Get Alumni
- **Endpoint**: `/alumni/all`
- **Method**: `GET`
- **Tags**: `Alumni`
- **Summary**: Get Alumni
- **Operation ID**: `get_alumni_alumni_all_get`
- **Responses**:
  - **200**: 
    - **Description**: Alumni retrieved
    - **Content Type**: `application/json`

#### Get Alumni By Id
- **Endpoint**: `/alumni/{alumni_id}`
- **Method**: `GET`
- **Tags**: `Alumni`
- **Summary**: Get Alumni By Id
- **Operation ID**: `get_alumni_id_alumni__alumni_id__get`
- **Parameters**:
  - **Path Parameter**: `alumni_id` (string, required)
    - **Title**: Alumni Id
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Update Alumni Data
- **Endpoint**: `/alumni/update/{alumni_id}`
- **Method**: `PUT`
- **Tags**: `Alumni`
- **Summary**: Update Alumni Data
- **Operation ID**: `update_alumni_data_alumni_update__alumni_id__put`
- **Parameters**:
  - **Path Parameter**: `alumni_id` (string, required)
    - **Title**: Alumni Id
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `UpdateAlumniSchema`
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Add Student Data
- **Endpoint**: `/student/add`
- **Method**: `POST`
- **Tags**: `Student`
- **Summary**: Add Student Data
- **Operation ID**: `add_student_data_student_add_post`
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `StudentSchema`
- **Responses**:
  - **200**: 
    - **Description**: Student data added into the database
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Get Students
- **Endpoint**: `/student/all`
- **Method**: `GET`
- **Tags**: `Student`
- **Summary**: Get Students
- **Operation ID**: `get_students_student_all_get`
- **Responses**:
  - **200**: 
    - **Description**: Students retrieved
    - **Content Type**: `application/json`

#### Get Student By Id
- **Endpoint**: `/student/{student_id}`
- **Method**: `GET`
- **Tags**: `Student`
- **Summary**: Get Student By Id
- **Operation ID**: `get_student_student__student_id__get`
- **Parameters**:
  - **Path Parameter**: `student_id` (string, required)
    - **Title**: Student Id
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Update Student Data
- **Endpoint**: `/student/update/{student_id}`
- **Method**: `PUT`
- **Tags**: `Student`
- **Summary**: Update Student Data
- **Operation ID**: `update_student_data_student_update__student_id__put`
- **Parameters**:
  - **Path Parameter**: `student_id` (string, required)
    - **Title**: Student Id
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `UpdateStudentSchema`
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Add Teacher Data
- **Endpoint**: `/teacher/add`
- **Method**: `POST`
- **Tags**: `Teacher`
- **Summary**: Add Teacher Data
- **Operation ID**: `add_teacher_data_teacher_add_post`
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `TeacherUserSchema`
- **Responses**:
  - **200**: 
    - **Description**: Teacher data added into the database
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Get Teachers
- **Endpoint**: `/teacher/all`
- **Method**: `GET`
- **Tags**: `Teacher`
- **Summary**: Get Teachers
- **Operation ID**: `get_teachers_teacher_all_get`
- **Responses**:
  - **200**: 
    - **Description**: Teachers retrieved
    - **Content Type**: `application/json`

#### Get Teacher By Id
-

 **Endpoint**: `/teacher/{teacher_id}`
- **Method**: `GET`
- **Tags**: `Teacher`
- **Summary**: Get Teacher By Id
- **Operation ID**: `get_teacher_teacher__teacher_id__get`
- **Parameters**:
  - **Path Parameter**: `teacher_id` (string, required)
    - **Title**: Teacher Id
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

#### Update Teacher Data
- **Endpoint**: `/teacher/update/{teacher_id}`
- **Method**: `PUT`
- **Tags**: `Teacher`
- **Summary**: Update Teacher Data
- **Operation ID**: `update_teacher_data_teacher_update__teacher_id__put`
- **Parameters**:
  - **Path Parameter**: `teacher_id` (string, required)
    - **Title**: Teacher Id
- **Request Body**:
  - **Required**: Yes
  - **Content Type**: `application/json`
  - **Schema**: `UpdateTeacherUserSchema`
- **Responses**:
  - **200**: 
    - **Description**: Successful Response
    - **Content Type**: `application/json`
  - **422**: 
    - **Description**: Validation Error
    - **Content Type**: `application/json`
    - **Schema**: `HTTPValidationError`

### Components

#### Schemas

##### UserSchema
- **Type**: `object`
- **Title**: UserSchema
- **Required**:
  - `first_name`
  - `last_name`
  - `email`
  - `address`
  - `contact`
  - `city`
  - `state`
  - `password`
  - `role`
- **Properties**:
  - `first_name` (string)
  - `last_name` (string)
  - `email` (string, format: email)
  - `address` (string)
  - `contact` (string)
  - `city` (string)
  - `state` (string)
  - `password` (string)
  - `role` (string)

##### UserLogin
- **Type**: `object`
- **Title**: UserLogin
- **Required**:
  - `email`
  - `password`
- **Properties**:
  - `email` (string, format: email)
  - `password` (string)

##### AlumniSchema
- **Type**: `object`
- **Title**: AlumniSchema
- **Required**:
  - `student_id`
  - `industry`
  - `current_position`
  - `company`
- **Properties**:
  - `student_id` (string)
  - `industry` (string)
  - `current_position` (string)
  - `company` (string)
  - `experience` (integer)
  - `linkedin` (string)
  - `achievements` (array of strings)
  - `skills` (array of strings)

##### EventsBaseModel
- **Type**: `object`
- **Title**: EventsBaseModel
- **Required**:
  - `event_title`
  - `date`
  - `description`
  - `venue`
  - `date_and_time`
  - `photo`
- **Properties**:
  - `event_title` (string)
  - `date` (string)
  - `description` (string)
  - `venue` (string)
  - `date_and_time` (string)
  - `photo` (string)

##### NewsBaseModel
- **Type**: `object`
- **Title**: NewsBaseModel
- **Required**:
  - `news_title`
  - `date`
  - `description`
  - `photo`
- **Properties**:
  - `news_title` (string)
  - `date` (string)
  - `description` (string)
  - `photo` (string)

##### ResearchBaseModel
- **Type**: `object`
- **Title**: ResearchBaseModel
- **Required**:
  - `publication_type`
  - `paper_name`
  - `authors`
  - `publication_year`
- **Properties**:
  - `publication_type` (string)
  - `paper_name` (string)
  - `authors` (array of strings)
  - `publication_year` (integer)

##### StudentSchema
- **Type**: `object`
- **Title**: StudentSchema
- **Required**:
  - `user_id`
  - `student_id`
  - `enrollment_year`
  - `major`
  - `courses`
- **Properties**:
  - `user_id` (string)
  - `student_id` (string)
  - `enrollment_year` (integer)
  - `graduation_year` (integer)
  - `major` (string)
  - `minor` (string)
  - `courses` (array of strings)
  - `gpa` (number)
  - `advisor` (string)

##### TeacherUserSchema
- **Type**: `object`
- **Title**: TeacherUserSchema
- **Required**:
  - `user_id`
  - `about`
  - `designation`
  - `current_status`
  - `photo`
- **Properties**:
  - `user_id` (string)
  - `about` (string)
  - `designation` (string)
  - `current_status` (string)
  - `photo` (string)

##### UpdateAlumniSchema
- **Type**: `object`
- **Title**: UpdateAlumniSchema
- **Properties**:
  - `student_id` (string)
  - `industry` (string)
  - `current_position` (string)
  - `company` (string)
  - `experience` (integer)
  - `linkedin` (string)
  - `achievements` (array of strings)
  - `skills` (array of strings)

##### UpdateEventsBaseModel
- **Type**: `object`
- **Title**: UpdateEventsBaseModel
- **Properties**:
  - `event_title` (string)
  - `date` (string)
  - `description` (string)
  - `venue` (string)
  - `date_and_time` (string)
  - `photo` (string)

##### UpdateNewsBaseModel
- **Type**: `object`
- **Title**: UpdateNewsBaseModel
- **Properties**:
  - `news_title` (string)
  - `date` (string)
  - `description` (string)
  - `photo` (string)

##### UpdateResearchBaseModel
- **Type**: `object`
- **Title**: UpdateResearchBaseModel
- **Properties**:
  - `publication_type` (string)
  - `paper_name` (string)
  - `authors` (array of strings)
  - `publication_year` (integer)

##### UpdateStudentSchema
- **Type**: `object`
- **Title**: UpdateStudentSchema
- **Properties**:
  - `user_id` (string)
  - `student_id` (string)
  - `enrollment_year` (integer)
  - `graduation_year` (integer)
  - `major` (string)
  - `minor` (string)
  - `courses` (array of strings)
  - `gpa` (number)
  - `advisor` (string)

##### UpdateTeacherUserSchema
- **Type**: `object`
- **Title**: UpdateTeacherUserSchema
- **Properties**:
  - `user_id` (string)
  - `about` (string)
  - `designation` (string)
  - `current_status` (string)
  - `photo` (string)

##### HTTPValidationError
- **Type**: `object`
- **Title**: HTTPValidationError
- **Properties**:
  - `detail` (array of `ValidationError`)

##### ValidationError
- **Type**: `object`
- **Title**: ValidationError
- **Required**:
  - `loc`
  - `msg`
  - `type`
- **Properties**:
  - `loc` (array of strings or integers)
  - `msg` (string)
  - `type` (string)