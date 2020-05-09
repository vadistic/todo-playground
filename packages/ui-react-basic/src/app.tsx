import * as React from 'react'

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>
          Hello World!
          <span role="img" aria-label="rocket emoji">
            🚀
          </span>
        </h1>
      </div>
    )
  }
}
