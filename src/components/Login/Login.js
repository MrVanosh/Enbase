import React, { useState } from 'react'
import Card from 'react-bulma-components/lib/components/card'
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  margin-top: 1rem;
`

const Login = ({login, register}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <StyledCard>
      <Card.Content>
      <Field>
          <Label>E-mail</Label>
          <Control>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </Control>
        </Field>
        <Field>
          <Label>Nazwa użytkownika</Label>
          <Control>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </Control>
        </Field>
        <Field>
          <Label>Hasło</Label>
          <Control>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </Control>
        </Field>
      </Card.Content>
      <Card.Footer>
        <Card.Footer.Item onClick={() => login(email, name, password)}>Zaloguj</Card.Footer.Item>
        <Card.Footer.Item onClick={() => register(email, name, password)}>Zarejestruj</Card.Footer.Item>
      </Card.Footer>
    </StyledCard>
  )
}

export default Login;