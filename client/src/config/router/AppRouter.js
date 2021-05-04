import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RouterConfig from '../constant/RouterConfig';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path={RouterConfig.HomeRouter.path}
                    component={RouterConfig.HomeRouter.components}
                />
                <Route
                    path={RouterConfig.QuanLyNhanVien.path}
                    component={RouterConfig.QuanLyNhanVien.components}
                />
                <Route
                    path={RouterConfig.QuanLyBoPhan.path}
                    component={RouterConfig.QuanLyBoPhan.components}
                />
            </Switch>
        </Router>
    );
};

export default AppRouter;
