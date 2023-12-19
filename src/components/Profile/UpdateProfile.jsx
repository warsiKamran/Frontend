import React, { useState } from 'react'
import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../Redux/actions/profile';
import { loadUser } from '../../Redux/actions/user';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({user}) => {

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
    navigate('/profile');
  }

  const {loading} = useSelector(state => state.profile);

  return <Container py={"16"} minH={"90vh"}>
    <form onSubmit={submitHandler}>
      <Heading
        children="Update Profile"
        my={"16"}
        textAlign={["center","left"]}
        textTransform={"uppercase"}
      />
      <VStack spacing={"8"}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Your name'
          type="text"
          focusBorderColor="yellow.500"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your email'
          type="email"
          focusBorderColor="yellow.500"
        />
        <Button
          isLoading = {loading}
          w={"full"}
          colorScheme="yellow"
          type="submit"
        >Update</Button>
      </VStack>
    </form>
  </Container>
}

export default UpdateProfile