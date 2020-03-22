import fs from 'fs'

const TEMP_DB_NAME = 'test.temp.db'
const TEMP_DB_PATH = 'temp/' + TEMP_DB_NAME

process.env.SQLITE_URL = TEMP_DB_PATH

import { DB_PATH } from '../db'

// just delete it so typeorm will synchronise it clean
fs.existsSync(DB_PATH) && fs.unlinkSync(DB_PATH)
