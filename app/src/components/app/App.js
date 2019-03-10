import React, {Component} from 'react';
import IsAuthenticated from "../auth/IsAuthenticated";
import AppPrivate from "./AppPrivate";
import AppPublic from "./AppPublic";

class App extends Component {
    render() {
        return (
            <IsAuthenticated
                componentForUser={AppPrivate}
                componentForGuest={AppPublic}
            />
        );
    }
}

export default App;
