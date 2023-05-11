import { Router } from "express";
require('dotenv').config();
const router = Router()
import axios from "axios";
const GOOGLE_PLACES_API = process.env.GOOGLE_PLACES_API
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

//this function gets the first 20 therapists near you

router.get('/search',(req:any,res:any)=>{
  console.log(req.query.lat)
  axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
  params: {
    key: GOOGLE_PLACES_API,
    radius: '4000',
    location: `${req.query.lat},${req.query.long}`,
    keyword: 'therapist',


  }
})
.then((response:any)=>{
  console.log(response.data)
res.send(response.data).status(200)
})
.catch((err:any)=>{
  res.status(500)
  console.error("failed to get therapists", err)
})
})

//this function gets the next 20 and can only be used to give you a total of 60 therapists aka 2 times
router.get('/next20',(req:any,res:any)=>{
  axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
  params: {
    key: GOOGLE_PLACES_API,
    radius: '4000',
    location: `${req.query.lat},${req.query.long}`,
    keyword: 'therapist',
    pagetoken: req.query.pagetoken,

  }
})
.then((response:any)=>{
res.send(response.data).status(200)
})
.catch((err:any)=>{
  res.status(500)
  console.error("failed to get therapists", err)
})
})


//this function will be used to get the specific details about each therapist
router.get('/details', (req:any, res:any)=>{
  axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
    params:{
      place_id: req.query.place_id,
      key: GOOGLE_PLACES_API
    }
  })
  .then((response:any)=>{
    res.send(response.data).status(200)
  })
  .catch((err:any)=>{
    console.error("failed to get the details of therpaists", err);
    res.status(500)
  })
})

router.get('/photo', (req:any, res:any)=>{
  console.log(req.query)
  axios.get('https://maps.googleapis.com/maps/api/place/photo', {
    params:{
      maxwidth:2500,
      photoreference: req.query.photoreference,
      key: GOOGLE_PLACES_API
    }
  })
  .then((response)=>{
    console.log(response.data, "yehaw")
    res.status(200).send(response.data)
  })
  .catch((err)=>{
    console.error('error', err)
  })
})


router.post('/save-therapist', (req:any, res: any) => {
  const{ googleId } = req.body.data
  const therapist = req.body.data
  console.log('name',therapist.name)
   prisma.user.findFirst({ where: { googleId: googleId } })
   .then((user:any)=>{

  prisma.therapists
    .create({
      data: {
        name: therapist.name,
        hours: therapist.hours,
        formatted_address: therapist.formatted_address,
        formatted_phone_number: therapist.formatted_phone_number,
        rating: therapist.rating,
        user: {
          connect: { id: user.id }
        }
      },
      })
      .then((createdTherapist:any) => {
        return prisma.user.update({
          where: { id: user.id },
          data: {
            therapists: {
              connect: { id: createdTherapist.id }
            }
          }
        })
      })
    .then(() => {
      res.status(201).send("successfully saved therapist");
    })
    .catch((err: Error) => {
      res.status(500);
      console.error("could not save a therapist", err);
    })
   })
   .catch((err:Error)=>{
    res.status(500);
    console.error("could not find user")
   })


});



router.get("/get-therapist", (req:any, res:any)=>{
  const { googleId } = req.query
  prisma.user.findFirst({ where: { googleId: googleId }, include: { therapists: true } })
  .then((user:any)=>{
    res.status(200).send(user.therapists)
  })
  .catch((err:Error)=>{
    console.error("couldnt fetch user saved therapists", err)
  })
})






// module.exports = router
export default router;