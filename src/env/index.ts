import 'dotenv/config'
import { z } from 'zod'

const envScehma = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
    JWT_SECRET: z.string(),
    PORT: z.coerce.number().default(3333),
})

const _env = envScehma.safeParse(process.env)

if (_env.success === false) {
    console.error('🔴 Invalid environment variables', _env.error.format())
    throw new Error('Invalid environment variables')
}

export const env = _env.data
