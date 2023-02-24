import express from "express";
import {addToPlaylist, changepassword, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture, updateUserRole } from "../controllers/UserController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";


const router =express.Router()

// register
router.route('/registeraccount').post(singleUpload,register)

// login
router.route('/login').post(login)

// logout
router.route('/logout').get(logout)

// get my profile, delete my profile
router.route('/me')
.get(isAuthenticated,getMyProfile)
.delete(isAuthenticated,deleteMyProfile)


// change password
router.route('/changepassword').put(isAuthenticated,changepassword)


//update profile
router.route('/updateprofile').put(isAuthenticated,updateProfile)


//update profile picture
router.route('/updateprofilepicture').put(isAuthenticated,singleUpload, updateProfilePicture)


//forgetpassword
router.route('/forgetpassword').post(forgetPassword)



//reset password
router.route('/resetpassword/:token').put(resetPassword)



//add to playlist
router.route('/addtoplaylist').post(isAuthenticated,addToPlaylist)


//remove from playlist
router.route('/removefromplaylist').delete(isAuthenticated,removeFromPlaylist)


// get all users as admin
router.route('/admin/users').get( getAllUsers)


// update user role, delete user
router.route('/admin/users/:id')
.put(isAuthenticated, authorizeAdmin, updateUserRole)
.delete(isAuthenticated, authorizeAdmin, deleteUser)




export default router