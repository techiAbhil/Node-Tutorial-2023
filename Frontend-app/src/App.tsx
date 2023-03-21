import { ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import PreLoginLayout from './components/pre-login-layout/pre-login-layout';
import AllPosts from './pages/allposts/all-posts';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Theme from './theme';
import './utils/interceptor';

function App() {
	return (
		<ThemeProvider theme={Theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/auth" element={<PreLoginLayout />}>
						<Route path="login" index element={<Login />} />
						<Route path="register" index element={<Register />} />
					</Route>
					<Route path="/" element={<Layout />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="posts" element={<AllPosts />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
