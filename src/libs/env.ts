import { z } from "zod";

const schema = z.object({
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().email(),
  GOOGLE_PRIVATE_KEY: z.string().min(1),
  GOOGLE_SHEET_ID: z.string().min(1)
})

const _env = schema.safeParse(process.env)

if(!_env.success) {
  throw new Error('Variables wrong')
}

export const env = _env.data