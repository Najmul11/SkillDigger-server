import express from "express";
import { getAllCourses } from "../controllers/CourseController.js";
import { cancelSubscribe, subscribe } from "../controllers/subscriptionController.js";
import { authorizeSubscribers, isAuthenticated } from "../middlewares/auth.js";


const router =express.Router()

router.route('/subscribe').post(isAuthenticated,subscribe)
router.route('/cancelsubscribe').post(isAuthenticated,cancelSubscribe)



export default router
