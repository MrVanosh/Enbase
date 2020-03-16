import React from 'react'
import { Link } from 'react-router-dom'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Heading } from 'react-bulma-components/dist'
import Navbar from 'react-bulma-components/lib/components/navbar'
import styled from 'styled-components'

const StyledNavbar = styled(Navbar)`
  height: 80px;
  border-bottom: 1px solid #eee;
`

const StyledBrand = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
`

const Appbar = () => (
  <Container>
    <StyledNavbar>
      <StyledBrand>
        <Link to="/"><Heading size={4}>Enbase</Heading></Link>
      </StyledBrand>
      <Navbar.Menu>
        <Navbar.Container position="end">
          <Navbar.Item>
            <Navbar.Link arrowless>
              Dokumentacja
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link arrowless>
              Węzły
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link arrowless>
              Statystyki użycia
            </Navbar.Link>
          </Navbar.Item>
          <Navbar.Item>
            <Navbar.Link arrowless>
              Ustawienia
            </Navbar.Link>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </StyledNavbar>
  </Container>
)

export default Appbar