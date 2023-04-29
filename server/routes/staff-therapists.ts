import { Router } from "express";
require('dotenv').config();
const router = Router()
import axios from "axios";
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


router.post('/create', (req:any, res: any) => {
const {name, licenseType, photoURL, aboutMe, profExp, yearsExp, licInfo, skills, reviews} = req.body.data
  prisma.staffTherapist.create({
    data: {
            name: name,
            licenseType: licenseType,
  photoURL: photoURL,
  aboutMe: aboutMe,
  profExp: profExp,
  yearsExp: yearsExp,
  licInfo: licInfo,
  skills: skills,
  TherapistReviews: {
    create: reviews.map((review:any) => ({
      date: review.date,
      text: review.text,
      rating: review.rating
    }))
  }
   },
  include: {
    TherapistReviews: true,
  }
      })
      .then((response:any)=>{
        res.status(201).json({ message: 'created a staff therapist', data: response });
      })
      .catch((err:any)=>{
        console.error('did not create staff',err);
        res.status(500).json({ error: 'Failed to create staff therapist' });
      });
    });


    router.get('/get', (req: any, res: any) => {
      prisma.staffTherapist.findMany({
        include: {
          TherapistReviews: true,
        },
      })
        .then((response: any) => {
          res.status(200).json({ message: 'retrieved all staff therapists', data: response });
        })
        .catch((err: any) => {
          console.error('failed to retrieve staff therapists', err);
          res.status(500).json({ error: 'Failed to retrieve staff therapists' });
        });
    });









export default router;