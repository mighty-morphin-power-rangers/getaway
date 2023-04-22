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

// OpenAPI handler
affirmationRoutes.get('/mood/:moodString', (req, res) => {
    const { moodString } = req.params

    const runPrompt = async () => {
        const affirmationPrompt = `Today, I am feeling ${moodString}. Can you send me 5 affirmations, based on my mood?`

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: affirmationPrompt,
            max_tokens: 2048,
            temperature: 1,
        })
        const affirmationsArray = response.data.choices[0].text.split(/\d+\. /).filter((str: string) => str !== '').map((str: string) => str.trim());
        affirmationsArray.shift()
        res.send(affirmationsArray);
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

//Retrieving affirmations to DB
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

//Retrieving favorited affirmations to DB
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

export default affirmationRoutes