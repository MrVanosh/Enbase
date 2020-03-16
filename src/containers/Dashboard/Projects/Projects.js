import React from 'react'
import { Link } from 'react-router-dom'
import { Heading } from 'react-bulma-components/dist'
import Card from 'react-bulma-components/lib/components/card'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import enbase from '../../../enbase'
import theme from '../../../assets/styles/theme'

const Grid = styled.div`
  ${theme.mq.l} {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
  }
`

const StyledCard = styled(Card)`
  height: 100%;
`

const StyledIcon = styled(FontAwesomeIcon)`
  display: block;
  margin: 0 auto;
`

class Projects extends React.Component {
  state = {
    projects: []
  }

  componentDidMount = async () => {
    const { token } = this.props;
    try {
      const response = await enbase.get('/admin/projects', {
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTZmNGY3ZWZiZTYyODFiMTViNmZjYjYiLCJuYW1lIjoibXJ2YW5vc2giLCJlbWFpbCI6Im1ydmFub3NoQGdtYWlsLmNvbSIsInBhc3N3b3JkSGFzaCI6bnVsbCwiX192IjowLCJpYXQiOjE1ODQzNzU4OTF9.aFEaVVLZKPX1gNu4mJj7XWhqkXpRSl3ZPmhO16dSzp4`}
      });
      console.log(response.data)
      this.setState({projects: response.data})
    } catch (err){
      this.setState({error: true})
    }
  }

  render() {
    const { projects } = this.state;

    const projectsCards = projects.map(project => <Link key={project._id} to={`/project/${project._id}`}>
      <StyledCard>
        <Card.Content>
          <Heading size={4}>
            {project.name}
          </Heading>
        </Card.Content>
      </StyledCard>
    </Link>)

    return (
      <>
        <Heading size={3}>
          Wybierz projekt
        </Heading>
        <Grid>
          {projectsCards}
          <StyledCard>
            <Card.Content>
              <Heading size={4}>
                Dodaj projekt
              </Heading>
              <StyledIcon size="4x" icon={faPlus} />
            </Card.Content>
          </StyledCard>
        </Grid>
      </>
    )
  }
}

export default Projects