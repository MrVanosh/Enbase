import React from 'react'
import { Input } from 'react-bulma-components/lib/components/form'
import Switch from 'react-bulma-switch/lib'
import { Button, Table } from 'react-bulma-components'
import styled from 'styled-components'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'

const StyledButton = styled(Button)`
  margin: 5px;
`

class Schema extends React.Component {
  state = {
    fields: []
  }

  componentDidMount = () => {
    const {match, schema} = this.props

    const { collections } = schema
    const indexOfCollection = collections.findIndex(({name}) => name === match.params.name)
    const { fields } = collections[indexOfCollection];

    this.setState({fields})
  }

  nameChangeHandler = (e, index) => {
    const { fields } = this.state
    fields[index].name = e.target.value
    this.setState({fields})
  }

  requiredChangeHandler = (index) => {
    const { fields } = this.state
    fields[index].required = !fields[index].required
    this.setState({fields})
  }

  writeAccessChangeHandler = (index) => {
    const { fields } = this.state
    fields[index].publicWriteAccess = !fields[index].publicWriteAccess
    this.setState({fields})
  }

  render() {
    const { fields } = this.state;
  
    const tableFields = fields.map((field, index) => <tr key={index}>
      <td><Input value={field.name} onChange={e => this.nameChangeHandler(e, index)} /></td>
      <td><Switch value={field.required} rounded onChange={() => this.requiredChangeHandler(index)} /></td>
      <td><Switch value={field.publicWriteAccess} rounded onChange={() => this.writeAccessChangeHandler(index)} /></td>
      <td><Button color="danger"> Usuń</Button></td>
    </tr>)
  
    return (
      <>
        <StyledButton color="primary">Dodaj nowe pole</StyledButton>
        <StyledButton color="warning">Zapisz</StyledButton>
        <Table>
          <tr>
            <th>Nazwa</th>
            <th>Wymagane</th>
            <th>Publiczny zapis</th>
            <th>Akcje</th>
          </tr>
          {tableFields}
        </Table>
      </>
    )
  }
}

export default Schema