import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
      <Button as={Link} to='/login' size='md' >login</Button>
      <Button as={Link} to='/register' size='md' >signup</Button>
    </div>
  )
}

export default Nav
