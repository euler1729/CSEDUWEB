# CSEDU WebServer

## Overview

This project is a web application built with FastAPI that provides a set of RESTful APIs for managing users, news, events, research, students, teachers, and alumni. It is designed to be easily deployable, manageable.

## Requirements

- Python 3.8+
- FastAPI
- MongoDB

## Installation and Running the Server

### For macOS

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>/backend
2. Create a virtual environment and activate it:

```bash
python3 -m venv .venv
source .venv/bin/activat
```
3. Install the dependencies:


```bash
pip install -r requirements.txt

```
4. Run the server:

```bash
python3 app/main.py

```
### For Ubuntu
1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-directory>/backend
```

2. Create a virtual environment and activate it:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

3. Install the dependencies:

```bash
pip install -r requirements.txt
```
4. Run the server:
```bash
python3 app/main.py
```

# API Summary

### User APIs

- **Add User Data**
  - **Endpoint:** `/user/add`
  - **Method:** POST
  - **Request Body:** UserSchema
  - **Response:** User data added into the database

- **Get Users**
  - **Endpoint:** `/user/all`
  - **Method:** GET
  - **Response:** Users retrieved

- **Get User**
  - **Endpoint:** `/user/{user_id}`
  - **Method:** GET
  - **Parameters:** user_id (path)
  - **Response:** User data retrieved successfully

- **Update User Data**
  - **Endpoint:** `/user/update/{user_id}`
  - **Method:** PUT
  - **Parameters:** user_id (path)
  - **Request Body:** UserSchema
  - **Response:** User data updated successfully

### Auth APIs

- **Login User**
  - **Endpoint:** `/auth/login`
  - **Method:** POST
  - **Request Body:** UserLogin
  - **Response:** Access token generated

### News APIs

- **Create News**
  - **Endpoint:** `/news/add`
  - **Method:** POST
  - **Request Body:** NewsBaseModel
  - **Response:** News has been added

- **Get News**
  - **Endpoint:** `/news/all`
  - **Method:** GET
  - **Response:** News viewed

- **Get News by ID**
  - **Endpoint:** `/news/{news_id}`
  - **Method:** GET
  - **Parameters:** news_id (path)
  - **Response:** News data retrieved successfully

- **Update News**
  - **Endpoint:** `/news/update/{news_id}`
  - **Method:** PUT
  - **Parameters:** news_id (path)
  - **Request Body:** UpdateNewsBaseModel
  - **Response:** News updated successfully

### Event APIs

- **Create Event**
  - **Endpoint:** `/event/add`
  - **Method:** POST
  - **Request Body:** EventsBaseModel
  - **Response:** Event has been added

- **Get Events**
  - **Endpoint:** `/event/all`
  - **Method:** GET
  - **Response:** Events viewed

- **Get Event by ID**
  - **Endpoint:** `/event/{event_id}`
  - **Method:** GET
  - **Parameters:** event_id (path)
  - **Response:** Event data retrieved successfully

- **Update Event**
  - **Endpoint:** `/event/update/{event_id}`
  - **Method:** PUT
  - **Parameters:** event_id (path)
  - **Request Body:** UpdateEventsBaseModel
  - **Response:** Event updated successfully

- **Delete Event**
  - **Endpoint:** `/event/delete/{event_id}`
  - **Method:** DELETE
  - **Parameters:** event_id (path)
  - **Response:** Event deleted successfully

### Research APIs

- **Create Research**
  - **Endpoint:** `/research/add`
  - **Method:** POST
  - **Request Body:** ResearchBaseModel
  - **Response:** Research has been added

- **Get All Research**
  - **Endpoint:** `/research/all`
  - **Method:** GET
  - **Response:** Research viewed

- **Get Research by ID**
  - **Endpoint:** `/research/{research_id}`
  - **Method:** GET
  - **Parameters:** research_id (path)
  - **Response:** Research data retrieved successfully

- **Update Research**
  - **Endpoint:** `/research/update/{research_id}`
  - **Method:** PUT
  - **Parameters:** research_id (path)
  - **Request Body:** UpdateResearchBaseModel
  - **Response:** Research updated successfully

- **Delete One Research**
  - **Endpoint:** `/research/delete/{research_id}`
  - **Method:** DELETE
  - **Parameters:** research_id (path)
  - **Response:** Research deleted successfully

- **Delete All Research**
  - **Endpoint:** `/research/delete-all`
  - **Method:** DELETE
  - **Response:** All research publications deleted successfully

### Alumni APIs

- **Add Alumni Data**
  - **Endpoint:** `/alumni/add`
  - **Method:** POST
  - **Request Body:** AlumniSchema
  - **Response:** Alumni data added into the database

- **Get Alumni**
  - **Endpoint:** `/alumni/all`
  - **Method:** GET
  - **Response:** Alumni retrieved

- **Get Alumni by ID**
  - **Endpoint:** `/alumni/{alumni_id}`
  - **Method:** GET
  - **Parameters:** alumni_id (path)
  - **Response:** Alumni data retrieved successfully

- **Update Alumni Data**
  - **Endpoint:** `/alumni/update/{alumni_id}`
  - **Method:** PUT
  - **Parameters:** alumni_id (path)
  - **Request Body:** UpdateAlumniSchema
  - **Response:** Alumni updated successfully

- **Delete One Alumni**
  - **Endpoint:** `/alumni/delete/{alumni_id}`
  - **Method:** DELETE
  - **Parameters:** alumni_id (path)
  - **Response:** Alumni deleted successfully

- **Delete All Alumni**
  - **Endpoint:** `/alumni/delete-all`
  - **Method:** DELETE
  - **Response:** All alumni deleted successfully

### Student APIs

- **Add Student Data**
  - **Endpoint:** `/student/add`
  - **Method:** POST
  - **Request Body:** StudentSchema
  - **Response:** Student data added into the database

- **Get Students**
  - **Endpoint:** `/student/all`
  - **Method:** GET
  - **Response:** Students retrieved

- **Get Student by ID**
  - **Endpoint:** `/student/{student_id}`
  - **Method:** GET
  - **Parameters:** student_id (path)
  - **Response:** Student data retrieved successfully

- **Update Student Data**
  - **Endpoint:** `/student/update/{student_id}`
  - **Method:** PUT
  - **Parameters:** student_id (path)
  - **Request Body:** UpdateStudentSchema
  - **Response:** Student data updated successfully

- **Delete One Student**
  - **Endpoint:** `/student/delete/{student_id}`
  - **Method:** DELETE
  - **Parameters:** student_id (path)
  - **Response:** Student deleted successfully

- **Delete All Students**
  - **Endpoint:** `/student/delete-all`
  - **Method:** DELETE
  - **Response:** All students deleted successfully

### Teacher APIs

- **Add Teacher Data**
  - **Endpoint:** `/teacher/add`
  - **Method:** POST
  - **Request Body:** TeacherUserSchema
  - **Response:** Teacher data added into the database

- **Get Teachers**
  - **Endpoint:** `/teacher/all`
  - **Method:** GET
  - **Response:** Teachers retrieved

- **Get Teacher by ID**
  - **Endpoint:** `/teacher/{teacher_id}`
  - **Method:** GET
  - **Parameters:** teacher_id (path)
  - **Response:** Teacher data retrieved successfully

- **Update Teacher Data**
  - **Endpoint:** `/teacher/update/{teacher_id}`
  - **Method:** PUT
  - **Parameters:** teacher_id (path)
  - **Request Body:** UpdateTeacherUserSchema
  - **Response:** Teacher data updated successfully

- **Delete One Teacher**
  - **Endpoint:** `/teacher/delete/{teacher_id}`
  - **Method:** DELETE
  - **Parameters:** teacher_id (path)
  - **Response:** Teacher deleted successfully

- **Delete All Teachers**
  - **Endpoint:** `/teacher/delete-all`
  - **Method:** DELETE
  - **Response:** All teachers deleted successfully

## Contributing
To contribute to this project, please fork the repository, create a new branch, and submit a pull request.