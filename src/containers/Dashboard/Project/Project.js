import React from 'react'
import { Route } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faDatabase, faTable, faPlus, faCode, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-relative-link-5'
import Menu from 'react-bulma-components/lib/components/menu'
import styled from 'styled-components'
import Schema from 'components/Schema/Schema'
import enbase from '../../../enbase'

const StyledDiv = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 20% 80%;
`

class Project extends React.Component {
  state = {
    projects: [],
    currentProject: {}
  }

  componentDidMount = async () => {
    const { token, props } = this.props
    try {
      const response = await enbase.get('/admin/projects', {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZmNGY3ZWZiZTYyODFiMTViNmZjYjYiLCJuYW1lIjoibXJ2YW5vc2giLCJlbWFpbCI6Im1ydmFub3NoQGdtYWlsLmNvbSIsInBhc3N3b3JkSGFzaCI6bnVsbCwiX192IjowLCJpYXQiOjE1ODQzNzU4OTF9.aFEaVVLZKPX1gNu4mJj7XWhqkXpRSl3ZPmhO16dSzp4`}
      })
      const projects = response.data
      const indexOfCurrentProject = projects.findIndex(project => project._id === props.match.params.id)
      const currentProject = projects.splice(indexOfCurrentProject, 1)
      this.setState({projects, currentProject})
    } catch (err){
      this.setState({error: true})
    }
  }

  componentWillReceiveProps = async newProps => {
    const { props } = this.props
    if(props.match.params.id !== newProps.props.match.params.id) {
      console.log('componentWillReceiveProps')
      const { token, props } = newProps
      try {
        const response = await enbase.get('/admin/projects', {
          headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZmNGY3ZWZiZTYyODFiMTViNmZjYjYiLCJuYW1lIjoibXJ2YW5vc2giLCJlbWFpbCI6Im1ydmFub3NoQGdtYWlsLmNvbSIsInBhc3N3b3JkSGFzaCI6bnVsbCwiX192IjowLCJpYXQiOjE1ODQzNzU4OTF9.aFEaVVLZKPX1gNu4mJj7XWhqkXpRSl3ZPmhO16dSzp4`}
        })
        const projects = response.data
        const indexOfCurrentProject = projects.findIndex(project => project._id === props.match.params.id)
        const currentProject = projects.splice(indexOfCurrentProject, 1)
        this.setState({projects, currentProject})
      } catch (err){
        this.setState({error: true})
      }
    }

  }

  render() {
    const { currentProject, projects } = this.state;
    if(!currentProject[0]) return null;

    let collections;

    if(currentProject[0].databaseSchema) {
      collections = currentProject[0].databaseSchema.collections.map(collection => <Menu.List.Item key={collection.name} renderAs={Link} to={`schema/${collection.name}`}>
      <FontAwesomeIcon icon={faTable} /> {collection.name}
    </Menu.List.Item>)
    }

    const otherProjects = projects.map(({_id, name}) => <Menu.List.Item key={_id} renderAs={Link} to={`/project/${_id}`}>
      {name}
    </Menu.List.Item>);

    return (
      <StyledDiv>
        <Menu>
          <Menu.List title="Ten projekt">
            <Menu.List.Item renderAs={Link} to="">
              <FontAwesomeIcon icon={faInfoCircle} /> Przegląd
            </Menu.List.Item>
            <Menu.List.Item>
              <Menu.List title={<><FontAwesomeIcon icon={faDatabase} /> Baza danych</>}>
                <Menu.List.Item>
                  Przeglądaj dane
                </Menu.List.Item>
                <Menu.List.Item>
                  <Menu.List title="Zarządzaj schematami">
                    {collections}
                  </Menu.List>
                </Menu.List.Item>
              </Menu.List>
            </Menu.List.Item>
            <Menu.List.Item>
              <FontAwesomeIcon icon={faCode} /> Kod chmurowy
            </Menu.List.Item>
            <Menu.List.Item>
              <FontAwesomeIcon icon={faCog} /> Ustawienia
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="Inne projekty">
            {otherProjects}
            <Menu.List.Item>
              <FontAwesomeIcon icon={faPlus} /> Utwórz
            </Menu.List.Item>
          </Menu.List>
          <Menu.List title="akcje">
            <Menu.List.Item>
              <FontAwesomeIcon icon={faSignOutAlt} /> Wyloguj
            </Menu.List.Item>
          </Menu.List>
        </Menu>
        <div>
          <Route path="/project/:id/schema/:name" exact component={({match}) => <Schema match={match} schema={currentProject[0].databaseSchema} />} />
        </div>
      </StyledDiv>
    )
  }
}

export default Project