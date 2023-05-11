import { Router } from 'express';
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const affirmationRoutes = Router();

const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const config = new Configuration({
    apiKey: process.env.AFFIRMATIONS_OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

// OpenAPI handler for main page
affirmationRoutes.get('/mood/:moodString', (req, res) => {
    const { moodString } = req.params

    const runPrompt = async () => {
        const affirmationPrompt = `Today, I am feeling ${moodString}. Can you send me 5 affirmations I can repeat to myself, based on my mood? (Do not include special characters)`

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: affirmationPrompt,
            max_tokens: 2048,
            temperature: 1,
        })
        const affirmationsArray = response.data.choices[0].text.split(/\d+\. /).filter((str: string) => str !== '').map((str: string) => str.trim());
        affirmationsArray.shift()
        affirmationsArray.forEach(function(element: string, index: number) {
            affirmationsArray[index] = element.replace(",", "");
          })
        res.send(affirmationsArray)
    }

    runPrompt();
})

//OpenAPI handler for interactive page
affirmationRoutes.get('/:correctAffirmation', (req, res) => {
    const { correctAffirmation } = req.params



    const runPrompt = async () => {
        const affirmationPrompt = `Send a gentle, encouraging one-sentence reward response after a user repeats this affirmation correctly: ${correctAffirmation}`

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: affirmationPrompt,
            max_tokens: 2048,
            temperature: 1,
        })


        const openaiText = response.data.choices[0].text
        const finalString = openaiText.replace(/\n/g, '');
        res.send(finalString);
    }

    runPrompt();
})




// Adding affirmations to DB
affirmationRoutes.post('/save/', async (req, res) => {
   const { affirmations, title, googleId, favorite } = req.body

    try {
        const user = await prisma.user.findFirst({ where: { googleId: googleId } })

        const affirmation = await prisma.affirmations.create({
            data: {
                affirmationList: affirmations.join('/n'),
                title: title,
                user: {
                    connect: { id: user.id }
                  },
                  favorite: favorite
            }
        });
        res.send('Success: Affirmation saved.')
    } catch (err) {
        res.send('Error: Affirmation was not saved.')
        console.log(err);
    }
});

// Retrieving affirmations from DB
affirmationRoutes.get('/retrieve/:googleId', async (req, res) => {
    const { googleId } = req.params

    try {
        const user = await prisma.user.findFirst({ where: { googleId: googleId } })

        const affirmationEntries = await prisma.affirmations.findMany({
            where: {user_id: user.id}
        })
        res.send(affirmationEntries);

    } catch (err) {
        console.log(err);
        res.send('Error: Affirmations were not found.')
    }

})

// Retrieving specific affirmations from DB in use for interactive read-along
affirmationRoutes.get('/retrieve/:userId/:entryId', async (req, res) => {
    const { userId, entryId } = req.params

    try {

        const affirmationEntries = await prisma.affirmations.findFirst({
            where: {
                user_id: Number(userId),
                id: Number(entryId)
            }
        })
        res.send(affirmationEntries);

    } catch (err) {
        console.log(err);
        res.send('Error: Affirmations were not found.')
    }

})

//Retrieving favorited affirmations from DB
affirmationRoutes.get('/retrieve-favorites/:googleId', async (req, res) => {
    const { googleId } = req.params;


    try {
        const user = await prisma.user.findFirst({ where: { googleId: googleId } })

        const favoritedAffirmations = await prisma.affirmations.findMany({
            where: {
                user_id: user.id,
                favorite: 'true'
            }
        })
        res.send(favoritedAffirmations)
    } catch {
        res.send('Error: Could not retrieve favorited affirmations')
    }


})

// Deleting affirmations
affirmationRoutes.delete('/remove/:entryId', async (req, res) => {
    const { entryId } = req.params;

    try {
    const deleteAffirmation = await prisma.affirmations.delete({
        where: {
          id: Number(entryId)
        },
      })
      res.send('Success: Affirmation entry was deleted.')
    } catch (err) {
    console.log(err);
    res.send('Error: Affirmation entry was not deleted.')
    }

})

// Updating favorites
affirmationRoutes.put('/favorite', async (req, res) => {
    const { entryId, favorite, user_id} = req.body;

    console.log(req.body)
    try {
            const affirmationEntry = await prisma.affirmations.updateMany({
                where: {
                    id: entryId,
                    user_id: user_id
                },
                data: {
                    favorite: favorite
                },
            })
            res.send('Success: Affirmations favorited')
        }
        catch {
            res.send('Error: Affirmations not favorited')
        }

})

// Updating title of affirmation
affirmationRoutes.put('/updateTitle', async (req, res) => {
    const { entryId, title, user_id} = req.body;

    try {
            const affirmationEntry = await prisma.affirmations.updateMany({
                where: {
                    id: entryId,
                    user_id: user_id
                },
                data: {
                    title: title
                },
            })
            res.send('Success: Affirmation title changed')
        }
        catch {
            res.send('Error: Affirmation title not changed')
        }

})


export default affirmationRoutes