import {Suspense} from 'react';
import Providers from './components/Providers';
import Home from './pages/home';
import Booking from './pages/booking';
import  LoadingComponent from './components/ui/Loader';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import ForgotPassword from './pages/forgot-password';
import ValidateCode from './pages/validate-code';
import ChangePassword from './pages/change-password';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ValidateAccount from './pages/validate-account';
import DashboardReserves from './pages/reserves';
import DashboardAccount from './pages/account';
import DashboardSettings from './pages/settings';


const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingComponent isLoading={true} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/booking" element={<Booking />} />

      <Route path="/validated-account" element={<ProtectedRoute redirectPath="/dashboard" isAllowed={user == null || user == undefined}><ValidateAccount /></ProtectedRoute>} />
      <Route path="/signin" element={<ProtectedRoute  redirectPath="/dashboard" isAllowed={user == null || user == undefined}><SignIn /></ProtectedRoute>} />
      <Route path="/signup" element={<ProtectedRoute redirectPath="/dashboard" isAllowed={user == null || user == undefined}><SignUp /></ProtectedRoute>} />
      <Route path="/forgot-password" element={<ProtectedRoute redirectPath="/dashboard" isAllowed={user == null || user == undefined}><ForgotPassword /></ProtectedRoute>} />
      <Route path="/validate-code" element={<ProtectedRoute redirectPath="/dashboard" isAllowed={user == null || user == undefined}><ValidateCode /></ProtectedRoute>} />
      <Route path="/change-password" element={<ProtectedRoute redirectPath="/dashboard" isAllowed={user == null || user == undefined}><ChangePassword /></ProtectedRoute>} />
      <Route path="/validated-account" element={<ProtectedRoute redirectPath="/dashboard" isAllowed={user == null || user == undefined}><ValidateAccount /></ProtectedRoute>} />

      <Route
        path="/dashboard/reserves"
        element={
          <ProtectedRoute
            isAllowed={!!user && user.role && user.role.includes('CLIENT')}
          >
            <DashboardReserves/>
          </ProtectedRoute>
        }
      />
      <Route path="/dashboard/account"
        element={
          <ProtectedRoute
            isAllowed={!!user && user.role && user.role.includes('CLIENT')}
          >
            <DashboardAccount/>
          </ProtectedRoute>
        }
      />

      <Route path="/dashboard/settings"
        element={
          <ProtectedRoute
            isAllowed={!!user && user.role && user.role.includes('CLIENT')}
          >
            <DashboardSettings/>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingComponent isLoading={true} />}>
      <AuthProvider>
        <Providers>
          <Router>
            <AppRoutes />
          </Router>
        </Providers>
      </AuthProvider>
    </Suspense>
  );
};

export default App
