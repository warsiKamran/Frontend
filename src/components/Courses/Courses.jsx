import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, HStack, Heading, Input, Stack, Text, VStack, Image} from '@chakra-ui/react';
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/actions/course";
import { toast } from "react-hot-toast";
import {addToPlaylist} from "../../Redux/actions/profile"
import {loadUser} from "../../Redux/actions/user"

const Course = ({ views, title, imageSrc, id, addToPlaylistHandler, creator, description, lecturesCount, loading }) => {
    return (
        <VStack className="course" alignItems={["center", "flex-start"]}>
            <Image src={imageSrc} boxSize="60" objectFit={"contain"} />
            <Heading
                textAlign={["center", "left"]}
                maxW="200px"
                fontFamily={"sans-serif"}
                noOfLines={3}
                children={title}
                size={'sm'}
            />

            <Text
                noOfLines={2}
                children={description}
            />

            <HStack>
                <Text
                    fontWeight={"bold"}
                    children={'creator'}
                    textTransform="uppercase"
                />
                <Text
                    fontFamily={'body'}
                    children={creator}
                    textTransform="uppercase"
                />
            </HStack>

            <Heading
                textAlign={"center"}
                size="xs"
                children={`Lectures- ${lecturesCount}`}
                textTransform="uppercase"
            />

            <Heading
                size="xs"
                children={`Views- ${views}`}
                textTransform="uppercase"
            />

            <Stack direction={["column", "row"]} alignItems="center">
                <Link to={`/course/${id}`}>
                    <Button colorScheme={"yellow"}>Watch Now</Button>
                </Link>
                <Button
                    isLoading={loading}
                    variant={"ghost"}
                    colorScheme={"yellow"}
                    onClick={() => addToPlaylistHandler(id)}>
                    Add to Playlist
                </Button>
            </Stack>
        </VStack>
    )
}

const Courses = () => {

    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const dispatch = useDispatch();

    const addToPlaylistHandler = async(courseId) => {
        await dispatch(addToPlaylist(courseId));
        dispatch(loadUser());
    }

    const categories = [
        "Frontend Development",
        "Backend Development",
        "Data Structures And Algorithms",
        "Android Development",
        "Machine Learning",
        "Git and Github",
    ]

    const{loading,courses,error,message} = useSelector(state=>state.course)

    useEffect(() => {
        dispatch(getAllCourses(category,keyword));

        if(error){
            toast.error(error);
            dispatch({type: 'clearError'});
        }

        if(message){
            toast.success(message);
            dispatch({type: 'clearMessage'})
        }

    }, [category,keyword,dispatch,error])
    
    return <Container minH={"95vh"} maxW="container.lg" paddingY={'8'}>

        <Heading children="All Courses" m={'8'} />

        <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search a course..."
            type={'text'}
            focusBorderColor="yellow.500"
        />

        <HStack
            overflowX={'auto'}
            paddingY="8"
            css={{
                '&::-webkit-scrollbar': {
                    display: "none",
                }
            }}>
            {
                categories.map((item, index) => (
                    <Button key={index} onClick={() => setCategory(item)} minW={'80'}>
                        <Text children={item} />
                    </Button>
                ))
            }
        </HStack>

        <Stack
            direction={["column", "row"]}
            flexWrap="wrap"
            justifyContent={["flex-start", "space-evenly"]}
            alignItems={["center", "flex-start"]}
        >

        {
            courses.length > 0 ? courses.map((item) => (
                <Course
                    key={item._id}
                    title={item.title}
                    description={item.description}
                    views={item.views}
                    imageSrc={item.poster.url}
                    id={item._id}
                    creator={item.createdBy}
                    lecturesCount={item.numOfVideos}
                    addToPlaylistHandler={addToPlaylistHandler}
                    loading={loading}
                />
            )) : <Heading mt={'4'} children="Course Not Found"/>
        }
        </Stack>
    </Container>
};

export default Courses;
