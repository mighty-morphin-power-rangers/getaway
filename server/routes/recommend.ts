import { Router, response } from 'express';
const recommendRoutes = Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import axios from 'axios';
const GOOGLE_PLACES_API = process.env.GOOGLE_PLACES_API;
const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const ZACH_API_KEY = process.env.ZACH_API_KEY;

recommendRoutes.get('/', async (req: any, res: any) => {
  try {
    const user = await prisma.user.findFirst({
      where: { googleId: '117568678137566768509' },
    });
    // console.log(user);
    res.send('Success');
  } catch (error) {
    console.log('Error: ', error);
    res.send('Error');
  }
});

// route for scroll wall
recommendRoutes.post('/scroll', async (req: any, res: any) => {
  const searchTopics = [
    'Nature',
    'Cat',
    'Dog',
    'Insects',
    'Rain',
    'Ferns',
    'Flowers',
  ];
console.log(req.body.data.googleId)

  const fetchImages = async (topic: string) => {
    console.log(topic)
    console.log(req.body.data.name)
if (req.body.data.name === "Zachary"){
  console.log("hi")
   try {
      const response = await axios.get(
        'https://api.unsplash.com/photos/random?',
        {
          params: {
            client_id: ZACH_API_KEY,
            count: 10,
            query: topic,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log('Error fetching images: ', error);
      return [];
    }
} 
    try {
      const response = await axios.get(
        'https://api.unsplash.com/photos/random?',
        {
          params: {
            client_id: UNSPLASH_API_KEY,
            count: 10,
            query: topic,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log('Error fetching images: ', error);
      return [];
    }
  };

  const topic1 = getRandomSearchTopic(searchTopics);
  const topic2 = getRandomSearchTopic(searchTopics.filter((t) => t !== topic1));

  const [images1, images2] = await Promise.all([
    fetchImages(topic1),
    fetchImages(topic2),
  ]);


  const shuffled = shuffle([...images1, ...images2]);

  res.send(shuffled);
});

function getRandomSearchTopic(searchTopics: string[]) {
  const randomIndex = Math.floor(Math.random() * searchTopics.length);
  return searchTopics[randomIndex];
}

function shuffle(array: any[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

//  this route will be for getting the users recommend
recommendRoutes.post('/list', async (req: any, res: any) => {
  try {
    const { googleId } = req.body.data;
    // console.log(googleId)
    const recommend = await prisma.recommend.findMany({
      where: { user_id: googleId },
    });
    res.send(recommend);
  } catch (error) {
    console.log('Error: ', error);
    res.send('Error');
  }
});

// this route will be for posting a new recommend
recommendRoutes.post('/newRecommend', async (req: any, res: any) => {
  try {
    const { data } = req.body;
    const { recommend_name, googleId, recommend_type } = data;
    // console.log(data)
    const newObj = {
      recommend_name: recommend_name,
      recommend_type: recommend_type,
      user_id: googleId,
    };

    await prisma.recommend.create({ data: newObj });

    res.send('Success');
  } catch (error) {
    console.log('Error: ', error);
    res.send('Error');
  }
});
// this will before updating recommend completion
recommendRoutes.post('/completed', async (req: any, res: any) => {
  try {
    // console.log(req.body.data)
    const { recommend, user, date, completed } = req.body.data;
    const recommendLog = await prisma.recommendLog.create({
      data: {
        recommend: {
          connect: {
            id: recommend,
          },
        },
        user: {
          connect: {
            googleId: user,
          },
        },
      },
    });
    res.send('good job');
  } catch (error) {
    console.log('Error: ', error);
    res.send('Error');
  }
});

// this will get all the dates a recommend was updated
recommendRoutes.get('/updatedon/:id', async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // this is a goofy work around to the : being in the params
    // im sure there is a better way
    //  console.log(req.params)
    const recommend = await prisma.recommendLog.findMany({
      where: {
        recommend_id: Number(id.slice(1)),
      },
    });
    res.send(recommend);
  } catch (error) {
    console.log('Error: ', error);
    res.send('Error');
  }
});

// this will delete a recommend
recommendRoutes.delete('/delete', async (req: any, res: any) => {
  try {
    const { recommendId } = req.body;

    await prisma.recommendLog.deleteMany({
      where: {
        recommend_id: recommendId,
      },
    });

    await prisma.recommend.delete({
      where: {
        id: recommendId,
      },
    });

    res.send('Success');
  } catch (error) {
    console.log('Error: ', error);
    res.send('Error');
  }
});

recommendRoutes.post('/search', async (req: any, res: any) => {
  try {
    const keyword = req.body.data.keyword;
    // console.log(keyword);
    axios
      .get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          key: GOOGLE_PLACES_API,
          radius: '4000',
          location: ` 30.275195, -89.781175`,
          keyword: keyword,
        },
      })
      .then((response: any) => {
        const filteredResults = response.data.results.filter((result: any) =>
          result.hasOwnProperty('name')
        );
        res.status(200).send(filteredResults);
      })
      .catch((err: any) => {
        res.status(500);
        console.error('failed to get places', err);
      });
  } catch (error) {
    console.log('Error: ', error);
    res.send('Error');
  }
});

export default recommendRoutes;
