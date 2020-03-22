import path from 'path'
import fs from 'fs'

const TEMP_DB_NAME = 'test.temp.db'
const TEST_DB_PATH = path.join(__dirname, '../../temp/test.db')
const TEMP_DB_PATH = path.join(__dirname, '../../temp', TEMP_DB_NAME)

process.env.SQLITE_URL = 'file:../temp/' + TEMP_DB_NAME

fs.copyFileSync(TEST_DB_PATH, TEMP_DB_PATH)
