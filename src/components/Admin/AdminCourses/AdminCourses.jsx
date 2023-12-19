import { Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Image, useDisclosure } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import cursor from "../../../assets/images/cursor.jpg"
import Sidebar from "../../Admin/Users/Sidebar"
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import {getAllCourses, getCourseLectures} from "../../../Redux/actions/course"
import {addLecture, deleteCourse, deleteLecture} from "../../../Redux/actions/admin"
import { toast } from 'react-hot-toast'

const AdminCourses = () => {

    const {courses, lectures} = useSelector(state => state.course);
    const {loading, error, message} = useSelector(state => state.admin);

    const {isOpen,onClose,onOpen} = useDisclosure();
    const dispatch = useDispatch();

    const [courseId, setCourseId] = useState("");
    const [courseTitle, setCourseTitle] = useState("");

    const courseDetailsHandler = (courseId, title) => {
        dispatch(getCourseLectures(courseId));
        onOpen();
        setCourseId(courseId);
        setCourseTitle(title);
    };

    const deleteButtonHandler = (courseId) => {
        console.log(courseId);
        dispatch(deleteCourse(courseId));
    };

    const deleteLectureButtonHandler = async(courseId,lectureId) => {
        await dispatch(deleteLecture(courseId, lectureId));
        dispatch(deleteCourse(courseId));
    };

    const addLectureHandler = async(e,courseId,title,description,video) =>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("title",title);
        myForm.append("description",description);
        myForm.append("file",video);

        await dispatch(addLecture(courseId, myForm));
        dispatch(getCourseLectures(courseId));
    };

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch({type: 'clearError'});
        }
        if(message){
            toast.success(message);
            dispatch({type: 'clearMessage'});
        }
        dispatch(getAllCourses());
    }, [dispatch, error, message, onClose]);

    return <Grid
        css={{ cursor: `url(${cursor}), default` }}
        minH={"100vh"}
        templateColumns={["1fr", "5fr 1fr"]}
    >
        <Box p={["0", "8"]} overflowX={"auto"}>
            <Heading
                textTransform={"uppercase"}
                children="All Users"
                my={"16"}
                textAlign={["center", "left"]}
            />

            <TableContainer w={["100vw", "full"]} >
                <Table variant={"simple"} size={"lg"}>
                    <TableCaption>All available courses in the database</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Poster</Th>
                            <Th>Title</Th>
                            <Th>Category</Th>
                            <Th>Author</Th>
                            <Th isNumeric>Views</Th>
                            <Th isNumeric>Lectures</Th>
                            <Th isNumeric>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            courses.map(item => (
                                <Row
                                    courseDetailsHandler={courseDetailsHandler}
                                    deleteButtonHandler={deleteButtonHandler}
                                    key={item._id}
                                    item={item}
                                    loading={loading}
                                />
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <CourseModal 
                isOpen={isOpen} 
                onClose={onClose} 
                id={courseId}
                courseTitle={courseTitle}
                deleteButtonhandler={deleteLectureButtonHandler}
                addLectureHandler={addLectureHandler}
                lectures={lectures}
                loading={loading}
            />
        </Box>
        <Sidebar />
    </Grid>
}


export default AdminCourses;

function Row({ item, courseDetailsHandler, deleteButtonHandler, loading}) {
    return (
        <Tr>
            <Td>#{item._id}</Td>
            <Td>
                <Image src={item.poster.url}/>
            </Td>
            <Td>{item.title}</Td>
            <Td textTransform={"uppercase"}>{item.category}</Td>
            <Td>{item.createdBy}</Td>
            <Td isNumeric>{item.views}</Td>
            <Td isNumeric>{item.numOfVideos}</Td>
            <Td isNumeric>
                <HStack justifyContent={"flex-end"}>
                    <Button onClick={() => courseDetailsHandler(item._id, item.title)} variant={"outline"} color={"purple.500"} isLoading={loading}>
                        View Lectures
                    </Button>
                    <Button onClick={() => deleteButtonHandler(item._id)} color={"purple.600"} isLoading={loading}>
                        <RiDeleteBin7Fill />
                    </Button>
                </HStack>
            </Td>
        </Tr>
    )
}
