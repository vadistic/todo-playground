import { routes } from '../routes'
import { templateHtml } from './template'

export const demoBodyHtml = /* html */ `
  <h1>@todo/demo</h1>
  <nav>
    <h3>UI</h3>
    <ul>
      <li><a href="${routes.uiReactBasic}">@todo/ui-react-basic</a></li>
    </ul>
    <h3>API</h3>
    <ul>
      <li><a href="${routes.apiApolloGraphql}">@todo/api-apollo-graphql</a></li>
    </ul>
  </nav>
`

export const demoHtml = templateHtml({ title: '@todo/demo', body: demoBodyHtml })
