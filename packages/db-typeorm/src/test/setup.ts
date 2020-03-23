import fs from 'fs'
import { getDbFile } from '../config'

const DB_NAME_TEST = 'test'

if (!process.env.DB_NAME) {
  process.env.DB_NAME = 'test-temp'
}

fs.copyFileSync(getDbFile(DB_NAME_TEST), getDbFile(process.env.DB_NAME))
