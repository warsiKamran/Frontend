import React from "react";
import { Link } from "react-router-dom";
import { Heading, Stack, VStack, Text, Button, Image} from "@chakra-ui/react";
import "./Home.css";
import vg from "../../assets/images/output-onlinejpgtools.jpg";

const Home = () => {
    return <section className="Home">
        <div className="container">
            <Stack
                direction={["column", "row"]}    // phone par automatically column ho jayegi
                height="100%"
                justifyContent={["center", "space-between"]}  // column = center, row = flex-end
                alignItems="center"
                spacing={["16", "56"]}
            >
                <VStack width={"full"} alignItems={["center","flex-end"]} spacing="8">
                    <Heading children="LEARN FROM THE EXPERTS" size={'2xl'}/>
                    <Text textAlign={["center","left"]} children="Best Content At Reasonable Price" fontSize={'2xl'} fontFamily="cursive"/>
                    <Link to="/courses">
                        <Button size={'lg'} colorScheme="yellow" objectFit={"contain"}>
                            Explore Now
                        </Button>
                    </Link>
                </VStack>
                <Image 
                    className="vector-graphics" 
                    boxSize={"md"} 
                    src={vg}   
                    objectFit="contain"
                />
            </Stack>
        </div>
    </section>
};

export default Home;