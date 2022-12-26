import React, { useContext, useEffect } from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios"; 
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function CreatePost() {
    
    const { authState } = useContext(AuthContext)
    
    let navigate = useNavigate();

    const initialValues = {
        title: "",
        postText: "",
    }

    // useEffect(() => {
    //     if (!authState.status) {
    //         navigate("/login")
    //     } 
    // }, [])
    
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Please fill in the title field'),
        postText: Yup.string().required(),
    })

    const onSubmit = (data) => {

        axios
        .post("http://localhost:3001/posts",
            data,
            { headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
        .then((response) => {
            navigate("/")                                                                  // redirect to home page after create new post
            console.log(data)
        })

        console.log({Url: "http://localhost:3001/posts", Response: "Data successfully stored in Database"})
    }

    
    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <h1> Create A Post</h1>
                    <br/>
                    <label>Title :</label> 
                    <Field 
                        autoComplete="off"
                        id="inputCreatePost1" 
                        name="title"
                        placeholder="(Eg: Title...)"
                        
                    ></Field>
                    <ErrorMessage name="title" component="span" />
                    <br/>
                    <br/>
                    <label>Post :</label> 
                    <Field 
                        autoComplete="off"
                        id="inputCreatePost2" 
                        name="postText" 
                        placeholder="(Eg: Post...)"
                    ></Field>
                    <ErrorMessage name="postText" component="span" />
                    <br/>
                    <br/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost
