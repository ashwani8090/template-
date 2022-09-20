import React, { useCallback } from 'react';
import { Switch } from 'react-router-dom';
import { TemplateList, CreateTemplate } from '../screens'
import PublicRoute from './publicRoute';

const Routes = () => {
    const isAuthenticated = useCallback(() => {
        return false;
    }, [])
    return (
        <Switch>

            <PublicRoute
                exact
                path="/"
                isAuthenticated={isAuthenticated}
            >
                <TemplateList />
            </PublicRoute>
            <PublicRoute
                exact
                isAuthenticated={isAuthenticated}
                path="/create-template"
            >
                <CreateTemplate />
            </PublicRoute>

        </Switch>
    );
};

export default Routes;