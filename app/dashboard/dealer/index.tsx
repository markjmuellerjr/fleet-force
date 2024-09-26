import React from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Layout from '../../../components/Layout/Layout';
import ServiceOrderList from '../../../components/Dashboard/ServiceOrderList';
import ScheduleService from '../../../components/Dashboard/ScheduleService';
const DealerDashboard: React.FC = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <h2 className="text-3xl font-semibold mb-6">Dealer Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ServiceOrderList />
          <ScheduleService />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default DealerDashboard;