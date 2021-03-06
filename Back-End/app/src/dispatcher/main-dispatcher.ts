import express = require("express");
import cors = require("cors");

import assigmentDispatcher from "./assigment-dispatcher";
import courseMaterialsDispatcher from "./course_materials-dispatcher";
import lectureDispatcher from "./lecture-dispatcher";
import newCourseDispatcher from "./new_course-dispatcher";
import studentDispatcher from "./student-dispatcher";
import studentAssigmentDispatcher from "./studentAssigment-dispatcher";
import courseRegistrationDispatcher from "./courseRegistration-dispatcher";
import loginDispatcher from "./login-dispatcher";
import log_sessionDispatcher from "./log_session-dispatcher";

const mainDespatcher = express.Router();
mainDespatcher.use(express.json());
mainDespatcher.use(cors());

mainDespatcher.use('/api/v1/assigments',assigmentDispatcher);
mainDespatcher.use('/api/v1/courseMaterials',courseMaterialsDispatcher);
mainDespatcher.use('/api/v1/lectures',lectureDispatcher);
mainDespatcher.use('/api/v1/newCourses',newCourseDispatcher);
mainDespatcher.use('/api/v1/courseRegistration',courseRegistrationDispatcher);
mainDespatcher.use('/api/v1/students',studentDispatcher);
mainDespatcher.use('/api/v1/login',loginDispatcher);
mainDespatcher.use('/api/v1/studentAssigments',studentAssigmentDispatcher);
mainDespatcher.use('/api/v1/Log_session',log_sessionDispatcher);

export default mainDespatcher;
