import React from 'react';
import map from 'lodash.map';
import {Redirect, Route, Switch} from 'react-router-dom';
import UserLayout from "../layout/UserLayout";
import privateRoutes from "../../routes/privateRoutes";

const AppPrivate = (props) => (
    <UserLayout>
        <Switch>
            {map(privateRoutes, (route, key) => {
                const {component, path} = route;
                return (
                    <Route exact path={path} key={key} component={component}/>
                );
            })
            }
            <Route key='no-match'><Redirect to="/"/></Route>
        </Switch>
    </UserLayout>
);

export default AppPrivate;
