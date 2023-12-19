import React from 'react'
import { Container, Heading, VStack, Button } from '@chakra-ui/react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return <Container h={"90vh"}>
      <VStack justifyContent={"center"} h={"full"} spacing={"4"}>
          <RiErrorWarningFill size={"5rem"}/>
          <Heading>
            Oops !! Page Not Found
          </Heading>
          <Link to="/">
            <Button variant={"ghost"}>
              Go to home
            </Button>
          </Link>
      </VStack>
  </Container>
}

export default NotFound