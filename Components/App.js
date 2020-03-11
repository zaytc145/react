import '../style/style.scss';
import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import history from './routes/history';
import auth from './auth';

import AppRouter from './routes/AppRouter';
import ClientRouter from './routes/ClientRouter';
import ForemanRouter from './routes/ForemanRouter';
import CompanyRouter from './routes/CompanyRouter';
import InspectionRouter from './routes/InspectionRouter';
import EmployeeRouter from './routes/EmployeeRouter';
import MainLayout from './layouts/MainLayout';
import SecondLayout from './layouts/SecondLayout';

import Main from './Main';
import Login from './Login';
import Registration from './Registration';

import CompanyCabinet from './Company/CompanyCabinet';
import ForemanCabinet from './Foreman/ForemanCabinet';
import EmployeeCabinet from './Employee/EmployeeCabinet';
import ClientCabinet from './Client/ClientCabinet';
import InspectionCabinet from './Inspection/InspectionCabinet';

class App extends React.Component{

  UNSAFE_componentWillMount = () => {
    if(!auth.getAuthStatus()){
      auth.tryAutoLogin()
    }
  }
  
  render(){
    return(
      <Router history={history}>
        <div>
        <Switch>
            <AppRouter path="/" exact component={Main} layout={MainLayout}/>
            <AppRouter path="/registration" component={Registration} layout={MainLayout}/>
            <AppRouter path="/login" component={Login} layout={MainLayout}/>
            <ClientRouter path="/client/cabinet" exact component={ClientCabinet} layout={SecondLayout}/>
            <InspectionRouter path="/inspection_company/cabinet" exact component={InspectionCabinet} layout={SecondLayout}/>
            <CompanyRouter path="/company/cabinet/" exact component={CompanyCabinet} layout={SecondLayout}/>
            <ForemanRouter path="/foreman/cabinet" exact component={ForemanCabinet} layout={SecondLayout}/>
            <EmployeeRouter path="/inspection_employee/cabinet" exact component={EmployeeCabinet} layout={SecondLayout}/>
            <Route path="*" component={() => "404 not found"} />
        </Switch>
        </div>
    </Router>
    )
  }
}

export default App;

