// @jsx createElement
import { createElement, render, Component } from 'nervjs';

import objectToCss from '../'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "{backgroundColor: \"red\"}", selector: "" };
  }
  render() {
    let cssArray;

    try {
      cssArray = objectToCss(this.state.input, this.state.selector)
    } catch (e) {
      cssArray = "Input not a valid object"
    }
    return (
      <div>
        <a>Selector</a>
        <input type="text" value={this.state.selector} onChange={e => { this.setState({ selector: e.target.value }) }} />
        <div style={{ display: "flex", flexDirection: "row", height: "50vh" }}>
          <textarea value={this.state.input} onChange={(e) => { this.setState({ input: e.target.value }) }} style={{ flex: "1 1 0" }} />
          <textarea style={{ flex: "1 1 0" }} value={cssArray.replace(/\\n/g, "\n")} readOnly />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
