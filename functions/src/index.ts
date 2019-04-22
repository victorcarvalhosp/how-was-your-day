import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {IMood} from '../../src/app/moods/models/mood';
import {MoodIconEnum} from '../../src/app/moods/enums/mood-icon';
import {IActivity} from '../../src/app/activities/models/activity';
import {ActivityIconEnum} from '../../src/app/activities/enums/activity-icon';

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

        createDefaultMoods(context, batch);
        createDefaultActivities(context, batch);

        return batch.commit();
    });


function createDefaultMoods(context: any, batch: any) {
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
}


function createDefaultActivities(context: any, batch: any) {
    const userId = context.params.userId;
    const defaultActivities: IActivity[] = [
        {
            id: shortid.generate(),
            name: 'Relax',
            icon: ActivityIconEnum.UMBRELLA,
        },
        {
            id: shortid.generate(),
            name: 'Date',
            icon: ActivityIconEnum.DATE,
        },
        {
            id: shortid.generate(),
            name: 'Exercises',
            icon: ActivityIconEnum.DUMBBELL,
        },
        {
            id: shortid.generate(),
            name: 'Work',
            icon: ActivityIconEnum.BRIEFCASE,
        },
        {
            id: shortid.generate(),
            name: 'Gaming',
            icon: ActivityIconEnum.GAMEPAD,
        },
        {
            id: shortid.generate(),
            name: 'Good Meal',
            icon: ActivityIconEnum.COOKING,
        },
        {
            id: shortid.generate(),
            name: 'Junk Food',
            icon: ActivityIconEnum.BURGUER,
        },
        {
            id: shortid.generate(),
            name: 'Friends',
            icon: ActivityIconEnum.FRIENDSHIP,
        },
        {
            id: shortid.generate(),
            name: 'Movies',
            icon: ActivityIconEnum.WORKING,
        },
        {
            id: shortid.generate(),
            name: 'Party',
            icon: ActivityIconEnum.PARTY,
        },
        {
            id: shortid.generate(),
            name: 'Study',
            icon: ActivityIconEnum.STUDY,
        },
        {
            id: shortid.generate(),
            name: 'Travel',
            icon: ActivityIconEnum.CAR,
        },
        {
            id: shortid.generate(),
            name: 'Cleaning',
            icon: ActivityIconEnum.CLEANING,
        },
        {
            id: shortid.generate(),
            name: 'Sleep Well',
            icon: ActivityIconEnum.SLEEP,
        },
    ];
    defaultActivities.forEach(activity => {
        const transactionRef = admin.firestore().doc(`users/${userId}/activities/${activity.id}`);
        batch.set(transactionRef, activity);
    });
}
