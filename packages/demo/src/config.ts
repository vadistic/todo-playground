import { Config as Base } from '@todo/api-apollo-graphql'
import path from 'path'

export class Config extends Base {}

export const config = new Config()

export const dirs = {
  uiReactBasic: path.join(__dirname, '../../ui-react-basic/dist'),
}

export const routes = {
  uiReactBasic: '/ui-react-basic',
}
