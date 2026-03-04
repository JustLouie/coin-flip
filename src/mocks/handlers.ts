import { http, HttpResponse, delay } from 'msw';
import { db } from './db';

export const handlers = [
    http.get('/api/user', async () => {
        await delay(1000);
        const userData = db.getUserData();
        return HttpResponse.json(userData);
    })
]