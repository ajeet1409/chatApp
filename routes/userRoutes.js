import express from 'express'

import {signup,login,getUserInfo,logout} from '../contoller/userController.js';

import  protectRoutes  from '../middleware/protectRoutes.js';

const router = express.Router();



router.post('/user/signup',signup)
router.post('/user/login',login)
router.post('/user/logout',logout)
router.get('/getUserInfo', protectRoutes,getUserInfo)





export  default router; 