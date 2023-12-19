import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {Box, Button, Container, FormLabel, Heading, Input, VStack} from "@chakra-ui/react"
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/actions/user';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()

    const submitHandler = (e) =>{

        e.preventDefault();
        dispatch(login(email, password))
    }

  return <Container h={'95vh'}>
    <VStack h={'full'} justifyContent={'center'} spacing='16'>
        <Heading children={"Welcome to Course-Bundler"}/>
        <form onSubmit={submitHandler} style={{width: '100%'}}>
            <Box marginY={'4'}>
                <FormLabel htmlFor='email' children="Email"/>
                <Input 
                    required 
                    id="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='Email'
                    type={"email"}
                    focusBorderColor="yellow.500"
                />
            </Box>

            <Box marginY={'4'}>
                <FormLabel htmlFor='password' children="Password"/>
                <Input 
                    required 
                    id="password" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder='Password'
                    type="password"
                    focusBorderColor="yellow.500"
                />
            </Box>

            <Box marginY={'4'}>
                <Link to="/forgetpassword">
                    <Button 
                        fontSize={'sm'} 
                        variant={'link'}
                    >Forget Password
                </Button>
                </Link>
            </Box>

            <Button 
                my="4" 
                colorScheme={"yellow"} 
                type={'submit'}
                >Login
            </Button>

            <Box marginY="4">
                New User ? {' '}
                <Link to="/register">
                    <Button colorScheme="yellow" variant="link">
                        Sign Up
                    </Button> {' '}
                    here
                </Link>
            </Box>
        </form>
    </VStack>
  </Container>
};

export default Login

