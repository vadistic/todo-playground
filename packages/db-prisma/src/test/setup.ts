import fs from 'fs'
import { config } from '../config'

fs.copyFileSync(config.get('db_test.file'), config.get('db_test.file'))
