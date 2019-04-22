import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {IMood} from '../../src/app/moods/models/mood';
import {MoodIconEnum} from '../../src/app/moods/enums/mood-icon';

const shortid = require('shortid');
admin.initializeApp({projectId: 'how-was-your-day-98453'});
const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

export const createDefaultData = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
        const batch = db.batch();

        const userId = context.params.userId;
        const defaultMoods: IMood[] = [
            {
                id: shortid.generate(),
                name: 'Very Sad',
                icon: MoodIconEnum.SAD_TEAR,
                color: '#ce93d8',
                order: 0
            },
            {
                id: shortid.generate(),
                name: 'Sad',
                icon: MoodIconEnum.FROWN,
                color: '#ba68c8',
                order: 1
            },
            {
                id: shortid.generate(),
                name: 'Meh',
                icon: MoodIconEnum.MEH,
                color: '#ab47bc',
                order: 2
            },
            {
                id: shortid.generate(),
                name: 'Happy',
                icon: MoodIconEnum.SMILE,
                color: '#8e24aa',
                order: 3
            },
            {
                id: shortid.generate(),
                name: 'Very Happy',
                icon: MoodIconEnum.SMILE_BEAM,
                color: '#7b1fa2',
                order: 4
            }
        ];
        defaultMoods.forEach(mood => {
            const transactionRef = admin.firestore().doc(`users/${userId}/moods/${mood.id}`);
            batch.set(transactionRef, mood);
        });
        return batch.commit();
    });
