import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Notification } from 'react-bulma-components/dist'
import { Route, Redirect } from 'react-router';
import enbase from '../../enbase'
import Appbar from '../../components/Appbar/Appbar'
import Login from '../../components/Login/Login'
import Projects from './Projects/Projects'
import Project from './Project/Project'

class Dashboard extends React.Component {
  state = {
    token: null,
    error: false,
    toProjects: false
  }

  loginHandler = async (email, name, password) => {
    try {
      const response = await enbase.post('/admin/auth/session', {
        name,
        email,
        password
      })
      console.log(response.data.token);
      this.setState({error: false, token: response.data.token, toProjects: true})
    } catch (err) {
      this.setState({error: true})
    }
  }

  render() {
    const { toProjects, token, error } = this.state;

    return (
      <>
        <Appbar />
        <Container>
          {error && <Notification color="danger">Wystąpił błąd</Notification>}
          <Route path="/" exact component={() => <Login login={this.loginHandler} />} />
          {toProjects && <Redirect to="/projects" />}
          <Route path="/projects" exact component={() => <Projects token={token} />} />
          <Route path="/project/:id" component={props => <Project props={props} token={token} />} />
        </Container>
      </>
    )
  }
}

export default Dashboard