import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EduDashboard from '../components/eduComponents.js/EduDashboard';
import EduSchedule from '../components/eduComponents.js/Schedule';
import EduCourses from '../components/eduComponents.js/Courses';
import EduMessages from '../components/eduComponents.js/Messages';
import EduSettings from '../components/eduComponents.js/Settings';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="educator/:id/dashboard" component={EduDashboard} />
        <Route path="educator/:id/schedule" component={EduSchedule} />
        <Route path="educator/:id/courses" component={EduCourses} />
        <Route path="educator/:id/messages" component={EduMessages} />
        <Route path="educator/:id/settings" component={EduSettings} />
      </Switch>
    </Router>
  );
};

export default Routes;
