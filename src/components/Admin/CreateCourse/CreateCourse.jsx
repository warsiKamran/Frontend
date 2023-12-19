import React, { useState, useEffect } from 'react';
import { Grid, Container, Heading, VStack, Input, Select, Image, Button } from '@chakra-ui/react';
import cursor from "../../../assets/images/cursor.jpg";
import Sidebar from "../Users/Sidebar";
import { fileUploadCss } from '../../Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import {createCourse} from "../../../Redux/actions/admin.js";
import toast from "react-hot-toast";

const CreateCourse = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const categories = [
    "Frontend Development",
    "Backend Development",
    "Data Structures And Algorithms",
    "Android Development",
    "Machine Learning",
    "Git and Github",
  ]

  const changeImageHandler = e =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const dispatch = useDispatch();
  const {loading, error, message} = useSelector(state => state.admin);

  const submitHandler = (e) => {

    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title",title);
    myForm.append("description",description);
    myForm.append("category",category);
    myForm.append("createdBy",createdBy);
    myForm.append("file",image);

    dispatch(createCourse(myForm));
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
  }, [dispatch, error, message])
  

  return <Grid
    css={{ cursor: `url(${cursor}), default` }}
    minH={"100vh"}
    templateColumns={["1fr", "5fr 1fr"]}
  >
    <Container py={"16"}>
      <form onSubmit={submitHandler}>
        <Heading textTransform={"uppercase"} children="Create Course" my={"16"} textAlign={["center", "left"]}/>
        <VStack m={"auto"} spacing={"8"}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
            type="text"
            focusBorderColor="purple.300"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
            type="text"
            focusBorderColor="purple.300"
          />
          <Input
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            placeholder='Author'
            type="text"
            focusBorderColor="purple.300"
          />

          <Select 
            focusBorderColor="purple.300" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=""> Select Category</option>
            {categories.map(item=>(
              <option key={item} value={item}>{item}</option>
            ))}
          </Select>

          <Input 
            accept="image/*"
            required 
            type={"file"}
            focusBorderColor="purple.300"
            css={{"&::file-selector-button":{
              ...fileUploadCss, 
              color:"purple"
            }}}
            onChange={changeImageHandler}
          />

          {imagePrev && (
            <Image src={imagePrev} boxSize="64" objectFit={"contain"}/>
          )}

          <Button 
            w={"full"} 
            colorScheme="purple" 
            type="submit"
            isLoading={loading}
          > 
            Create
          </Button>
        </VStack>
      </form>
    </Container>

    <Sidebar />

  </Grid>
}

export default CreateCourse;

