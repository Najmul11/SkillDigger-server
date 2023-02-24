import express from "express";
import { contact, courseRequest } from "../controllers/contactController.js";



const router = express.Router();

// contact form
router.route("/contact").post(contact);

// Request form
router.route("/courserequest").post(courseRequest);

// // Get Admin Dashboard Stats
// router
//   .route("/admin/stats")
//   .get(isAuthenticated, authorizeAdmin, getDashboardStats);

export default router;
