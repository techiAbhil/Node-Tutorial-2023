import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, token }: { children: any; token: any }) => {
	console.log('token is = ', token);
	return !token ? <Navigate to="/auth/login" replace /> : children;
};

export default ProtectedRoute;
