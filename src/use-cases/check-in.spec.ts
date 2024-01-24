import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOsCheckInsError } from './errors.ts/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors.ts/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)
        await gymsRepository.create({
            id: 'gym-01',
            title: 'JavaScript Gym',
            description: 'The brand new academy',
            phone: '999-8888-7777',
            latitude: -25.4353305,
            longitude: -49.314579,
        })
        vi.useFakeTimers()
    })
    afterEach(() => {
        vi.useRealTimers()
    })
    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -25.4353305,
            userLongitude: -49.314579,
        })
        expect(checkIn.id).toEqual(expect.any(String))
    })
    it('should NOT be able to check in twice a day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -25.4353305,
            userLongitude: -49.314579,
        })
        await expect(() =>
            sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: -25.4353305,
                userLongitude: -49.314579,
            }),
        ).rejects.toBeInstanceOf(MaxNumberOsCheckInsError)
    })
    it('should be able to check in twice BUT in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -25.4353305,
            userLongitude: -49.314579,
        })
        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -25.4353305,
            userLongitude: -49.314579,
        })
        expect(checkIn.id).toEqual(expect.any(String))
    })
    it('should NOT be able to check in on a distant gym', async () => {
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'JavaScript Gym',
            description: 'The brand new academy',
            phone: '999-8888-7777',
            latitude: new Decimal(-25.4159596),
            longitude: new Decimal(-49.2320397),
        })
        await expect(() =>
            sut.execute({
                gymId: 'gym-02',
                userId: 'user-01',
                userLatitude: -25.4159596,
                userLongitude: -49.314579,
            }),
        ).rejects.toBeInstanceOf(MaxDistanceError)
    })
})
