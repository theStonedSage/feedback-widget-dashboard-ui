import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import FeedbackSection from '../components/feedback/FeedbackSection';
import { useAuth } from '../contexts/authContext';
import { useRedirectIfNotLoggedIn } from '../hooks/useRedirectIfNotLoggedIn';

interface IDashboard {}

const Dashboard: React.FC<IDashboard> = ({}) => {
    useRedirectIfNotLoggedIn();
    const { isAuthLoading } = useAuth();
    
    if(isAuthLoading) return <div>Loading....</div>

   return (
    <DashboardLayout>
        <FeedbackSection />
    </DashboardLayout>
   )
}

export default Dashboard;
