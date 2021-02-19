import React from 'react'
import Signup from './components/Authcomponents/Signup'
import {AuthProvider} from './contexts/Authcontexts'
import {BrowserRouter as Router , Route ,Switch} from 'react-router-dom'
import Mainpage from './components/Mainpagecomponents/Mainpage'
import Login from './components/Authcomponents/Login'
import UpdateProfile from './components/Authcomponents/UpdateProfile'
import ForgotPassword from './components/Authcomponents/ForgotPassword'


function App() {
  return ( 
        <Router>
         <AuthProvider>
          <Switch>
            <Route exact path="/" component={Mainpage} />
            <Route  path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
         </AuthProvider>
        </Router>
  )
}

export default App
