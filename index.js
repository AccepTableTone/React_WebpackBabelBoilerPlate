import React from "react";
import ReactDOM from "react-dom";

import SupYo from "components/supyo";
import "./styles/site.css";

class App extends React.Component {
    render() {
        return <SupYo />;
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
