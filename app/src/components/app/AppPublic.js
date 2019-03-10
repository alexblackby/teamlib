import React from 'react';
import map from 'lodash.map';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import publicRoutes from "../../routes/publicRoutes";
import GuestLayout from "../layout/GuestLayout";

const AppPublic = (props) => (
    <GuestLayout>
        <TransitionGroup>
            <CSSTransition classNames="fade" timeout={300} key={props.location.key}>
                <Switch location={props.location}>
                    {map(publicRoutes, (route, key) => {
                        const {component, path} = route;
                        return (
                            <Route exact path={path} key={key} component={component}/>
                        );
                    })
                    }
                    <Route><Redirect to="/login"/></Route>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    </GuestLayout>
);

export default withRouter(AppPublic);
