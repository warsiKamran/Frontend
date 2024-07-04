import React from 'react';
import { Avatar, Container, Heading, Stack, VStack, Text, Button, Box, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/testing.mp4';
import {RiSecurePaymentFill} from "react-icons/ri";
import termsAndCondition from "../../assets/docs/termsAndCondition"


const Founder = ()=>(
    <Stack 
        direction={["column", "row"]} 
        spacing={['4','16']} 
        padding={'8'}
    >
        <VStack>
            <Avatar src='https://avatars.githubusercontent.com/u/110245850?v=4' boxSize={['40','48']}/>
            <Text children="Co-Founder" opacity={0.7}/>
        </VStack>

        <VStack justifyContent={"center"} textAlign={["center","flex-start"]}>
            <Heading children="Mohammad Kamran" size={["md","xl"]}/>
            <Text textAlign={['center','left']}
                children={`Hello, I'm a backend developer and coder. Gain access to all my high-quality content at an affordable price.`}
            />
        </VStack>
    </Stack>
)

const VideoPlayer = () =>(
    <Box display="flex" justifyContent="center">
        <video 
            autoPlay
            controls 
            loop
            controlsList="nodownload nofullscreen noremoteplayback" 
            disablePictureInPicture 
            disableRemotePlayback 
            src={introVideo}
        ></video>
    </Box>
);


const TandC = ({termsAndCondition}) =>(
    <Box>
        <Heading 
            size={"md"} 
            children="Terms & Conditions" 
            textAlign={["center","left"]} 
            my="4"
        />

        <Box h="sm" p="4" overflowY={"scroll"}>
            <Text letterSpacing={"widest"} fontFamily={"heading"} textAlign={["center","left"]}>{termsAndCondition}</Text>
            <Heading my="4" size={"xs"} children="Refunds can be requested only for cancellations made within a 7-day window."/>
        </Box>
    </Box>

);

const About = () => {
  return <Container maxW={"container.lg"} padding={"16"} boxShadow={"lg"}>

    <Heading 
        children="About Us" 
        textAlign={["center", "left"]}
    />
    <Founder />

    <Stack m="8" direction={["column", "row"]} alignItems="center">
        <Text fontFamily={"cursive"} m={"8"} textAlign={["center","left"]}>
            Supercharge your learning with exclusive premium courses, join our premium membership for a world of knowledge and success.
        </Text>
        <Link to="/subscribe">
            <Button variant={"ghost"} colorScheme="yellow">
                Discover Our Amazing Plan
            </Button>
        </Link>
    </Stack>

    <VideoPlayer/>

    <TandC termsAndCondition={termsAndCondition}/>

    <HStack my="4" padding={'4'}>
        <RiSecurePaymentFill/>
        <Heading 
            size={"xs"} 
            fontFamily={"sans-serif"} 
            textTransform={"uppercase"} 
            children={"Paymnet is secured by Razorpay"}
        />
    </HStack>
  </Container>
}

export default About