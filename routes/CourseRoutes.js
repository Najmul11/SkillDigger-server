import express from "express";
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from "../controllers/CourseController.js";
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router =express.Router()

// get all courses without lectures
router.route('/courses').get(getAllCourses)

//  create new course only admin
router.route('/createcourse').post(isAuthenticated, authorizeAdmin,singleUpload,createCourse)



// get course lecture, add lecture, delete course
router.route('/course/:id')
    .get(isAuthenticated,authorizeSubscribers,getCourseLectures)
    .post(isAuthenticated,authorizeAdmin, singleUpload,addLecture)
    .delete(isAuthenticated,authorizeAdmin, deleteCourse)


// get course detail

// delete lecture
router.route('/lecture').delete(deleteLecture)



export default router