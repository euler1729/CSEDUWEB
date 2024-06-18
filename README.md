# CSEDU WebServer

## Overview

This project is a web application built with FastAPI that provides a set of RESTful APIs for managing users, news, events, research, students, teachers, staff and alumni. It is designed to be easily deployable, manageable.

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

Certainly! Here's the markdown table with serial numbers added:
| S.No | Endpoint                           | Method | Tags    | Summary                   | Request Body Schema          |
|------|------------------------------------|--------|---------|---------------------------|------------------------------|
| 1    | `/user/add`                        | POST   | User    | Add User Data             | `UserSchema`                 |
| 2    | `/user/all`                        | GET    | User    | Get Users                 | N/A                          |
| 3    | `/user/{user_id}`                  | GET    | User    | Get User                  | N/A                          |
| 4    | `/user/update/{user_id}`           | PUT    | User    | Update User Data          | `UserSchema`                 |
| 5    | `/user/delete/{user_id}`           | DELETE | User    | Delete User Data          | N/A                          |
| 6    | `/auth/login`                      | POST   | Auth    | Login User                | `UserLogin`                  |
| 7    | `/auth/reset-password-init`        | POST   | Auth    | Reset Password Init       | `ResetInit`                  |
| 8    | `/auth/reset-password-confirm`     | POST   | Auth    | Reset Password Confirm    | `ResetPassword`              |
| 9    | `/news/update/{news_id}`           | PUT    | News    | Update News               | `UpdateNewsBaseModel`        |
| 10   | `/news/add`                        | POST   | News    | Create News               | `NewsBaseModel`              |
| 11   | `/news/all`                        | GET    | News    | Get News                  | N/A                          |
| 12   | `/news/{news_id}`                  | GET    | News    | Get News Id               | N/A                          |
| 13   | `/event/all`                       | GET    | Event   | Get Event                 | N/A                          |
| 14   | `/event/add`                       | POST   | Event   | Create Event              | `EventsBaseModel`            |
| 15   | `/event/{event_id}`                | GET    | Event   | Get Event Id              | N/A                          |
| 16   | `/event/update/{event_id}`         | PUT    | Event   | Update Event              | `UpdateEventsBaseModel`      |
| 17   | `/event/register/private/{event_id}`| POST   | Event   | Register Event            | `UserFormModel`              |
| 18   | `/event/register/update/{event_id}/{user_id}`| PUT    | Event   | Update Registration      | `UpdateUserFormModel`        |
| 19   | `/event/register/list/{event_id}`  | GET    | Event   | Get Registration List     | N/A                          |
| 20   | `/event/delete/{event_id}`         | DELETE | Event   | Delete Event              | N/A                          |
| 21   | `/research/update/{research_id}`   | PUT    | Research| Update Research           | `UpdateResearchBaseModel`    |
| 22   | `/research/add`                    | POST   | Research| Create Research           | `ResearchBaseModel`          |
| 23   | `/research/all`                    | GET    | Research| Get All Research          | N/A                          |
| 24   | `/research/{research_id}`          | GET    | Research| Get Research Id           | N/A                          |
| 25   | `/research/delete/{research_id}`   | DELETE | Research| Delete One Research       | N/A                          |
| 26   | `/research/delete-all`             | DELETE | Research| Delete All Research       | N/A                          |
| 27   | `/alumni/add`                      | POST   | Alumni  | Add Alumni Data           | `AlumniSchema`               |
| 28   | `/alumni/all`                      | GET    | Alumni  | Get Alumni                | N/A                          |
| 29   | `/alumni/{alumni_id}`              | GET    | Alumni  | Get Alumni Id             | N/A                          |
| 30   | `/alumni/update/{alumni_id}`       | PUT    | Alumni  | Update Alumni Data        | `UpdateAlumniSchema`         |
| 31   | `/alumni/delete/{alumni_id}`       | DELETE | Alumni  | Delete One Alumni         | N/A                          |
| 32   | `/alumni/delete-all`               | DELETE | Alumni  | Delete All Alumni         | N/A                          |
| 33   | `/student/add`                     | POST   | Student | Add Student Data          | `StudentSchema`              |
| 34   | `/student/all`                     | GET    | Student | Get Students              | N/A                          |
| 35   | `/student/{student_id}`            | GET    | Student | Get Student               | N/A                          |
| 36   | `/student/update/{student_id}`     | PUT    | Student | Update Student Data       | `UpdateStudentSchema`        |
| 37   | `/student/delete/{student_id}`     | DELETE | Student | Delete One Student        | N/A                          |
| 38   | `/student/delete-all`              | DELETE | Student | Delete All Students       | N/A                          |
| 39   | `/teacher/add`                     | POST   | Teacher | Add Teacher Data          | `TeacherUserSchema`          |
| 40   | `/teacher/all`                     | GET    | Teacher | Get Teachers              | N/A                          |
| 41   | `/teacher/{teacher_id}`            | GET    | Teacher | Get Teacher               | N/A                          |
| 42   | `/teacher/update/{teacher_id}`     | PUT    | Teacher | Update Teacher Data       | `UpdateTeacherUserSchema`    |
| 43   | `/teacher/delete/{teacher_id}`     | DELETE | Teacher | Delete One Teacher        | N/A                          |
| 44   | `/teacher/delete-all`              | DELETE | Teacher | Delete All Teachers       | N/A                          |
| 45   | `/stats/all`                       | GET    | Stats   | Stats All                 | N/A                          |
| 46   | `/message/add`                     | POST   | Message | Create Message            | `MessageBaseModel`           |
| 47   | `/message/all`                     | GET    | Message | Get Messages              | N/A                          |
| 48   | `/message/{id}`                    | GET    | Message | Get Message               | N/A                          |
| 49   | `/staff/add`                       | POST   | Staff   | Add Staff Data            | `StaffUserSchema`            |
| 50   | `/staff/all`                       | GET    | Staff   | Get Staffs                | N/A                          |
| 51   | `/staff/{staff_id}`                | GET    | Staff   | Get Staff                 | N/A                          |
| 52   | `/staff/update/{staff_id}`         | PUT    | Staff   | Update Staff Data         | `UpdateStaffUserSchema`      |
| 53   | `/staff/delete/{staff_id}`         | DELETE | Staff   | Delete One Staff          | N/A                          |
| 54   | `/staff/delete-all`                | DELETE | Staff   | Delete All Staffs         | N/A                          |


## Contributing
To contribute to this project, please fork the repository, create a new branch, and submit a pull request.