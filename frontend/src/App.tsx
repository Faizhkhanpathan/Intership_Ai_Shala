import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthFlow } from './components/AuthFlow';
import { StudentDashboard } from './components/StudentDashboard';
import { CompanyDashboard } from './components/CompanyDashboard';
import { MentorDashboard } from './components/MentorDashboard';

type UserType = 'student' | 'company' | 'mentor';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  field?: string;
  skills?: string[];
  experience?: string;
  companyName?: string;
  designation?: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleGetStarted = () => {
    setCurrentView('auth');
  };

  const handleAuthSuccess = (userData: User, type: UserType) => {
    setUser(userData);
    setUserType(type);
    setCurrentView('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleLogout = () => {
    setUser(null);
    setUserType(null);
    setCurrentView('landing');
  };

  if (currentView === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentView === 'auth') {
    return (
      <AuthFlow 
        onAuthSuccess={handleAuthSuccess}
        onBack={handleBackToLanding}
      />
    );
  }

  if (currentView === 'dashboard' && user && userType) {
    switch (userType) {
      case 'student':
        return <StudentDashboard user={user} onLogout={handleLogout} />;
      case 'company':
        return <CompanyDashboard user={user} onLogout={handleLogout} />;
      case 'mentor':
        return <MentorDashboard user={user} onLogout={handleLogout} />;
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
}