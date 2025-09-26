import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'TEAMLEAD' | 'EMPLOYEE';
}

interface ReviewCyclesProps {
  user: User;
}

export function ReviewCycles({ user }: ReviewCyclesProps) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Review Cycles</h1>
        <p className="text-gray-600">Manage review cycles and schedules</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Review Cycles functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}