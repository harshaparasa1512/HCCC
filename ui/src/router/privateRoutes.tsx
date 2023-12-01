import { authService, checkUserRoles } from 'infrastructure/backendService';
import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {
  roles: string[];
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps & RouteProps> = ({ children, roles, ...rest }) => {
  const isAuthenticated = authService.isAuthenticated();
  const userRoles = authService.getUserRoles();

  // Check if the user is authenticated and roles are defined and not empty
  const shouldRender =
    isAuthenticated && checkUserRoles() && roles.every(role => userRoles?.includes(role));

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
