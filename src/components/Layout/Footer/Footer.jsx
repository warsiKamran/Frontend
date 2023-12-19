import { Box, HStack, Heading, Stack, VStack } from "@chakra-ui/react";
import React from "react";
import {TiSocialLinkedinCircular, TiSocialInstagramCircular} from "react-icons/ti"
import {DiGithub} from "react-icons/di"

const Footer = () =>{

    return <Box padding={"4"} bg='blackAlpha.900' minH={"10vh"}>
        <Stack direction={["column", 'row']}>
            <VStack alignItems={["center", "flex-start"]} width="full">
                <Heading children="All Rights Reserved" color={'white'}/>
                <Heading fontFamily={'body'} size="sm" children="@Mohammad Kamran" color={'yellow'}/>
            </VStack>
            <HStack 
                spacing={["2","10"]} 
                justifyContent="center" 
                color={'white'} 
                fontSize="50"
            >
                <a href="https://linkedin.com/in/mohammad-kamran" target={'blank'}>
                    <TiSocialLinkedinCircular/>
                </a>
                <a href="https://instagram.com/kamranwarsi.kw" target={'blank'}>
                    <TiSocialInstagramCircular/>
                </a>
                <a href="https://github.com/warsiKamran" target={'blank'}>
                    <DiGithub/>
                </a>
            </HStack>
        </Stack>
    </Box>
}

export default Footer;