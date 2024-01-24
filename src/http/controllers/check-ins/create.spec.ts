import request from 'supertest'
import { app } from '@/app'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in E2E', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should check-in in a gym', async () => {
        const { token } = await createAndAuthenticateUser(app, true)
        const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                latitude: -25.4159596,
                longitude: -49.2320397,
            },
        })
        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -25.4159596,
                longitude: -49.2320397,
            })
        expect(response.statusCode).toEqual(201)
    })
})
