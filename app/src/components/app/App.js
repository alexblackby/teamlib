import React from 'react';
import map from 'lodash.map';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import routes from "../../routes";
import Auth from "../auth/Auth";

const App = (props) => (
    <Switch location={props.location}>
        {map(routes, (route, key) => {
            const {path, needAuth} = route;
            const RouteLayout = route.layout;
            const RouteComponent = route.component;
            return (
                <Route exact path={path} key={key} render={(props) => (
                    <Auth needAuth={needAuth}>
                        <RouteLayout {...props}>
                            <RouteComponent {...props} />
                        </RouteLayout>
                    </Auth>
                )}/>
            );
        })
        }
        <Route><Redirect to="/login"/></Route>
    </Switch>
);

export default withRouter(App);