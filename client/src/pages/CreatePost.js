import React,{useHistory} from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios"; 

function CreatePost() {
    
    let history = useHistory();

    const initialValues = {
        title: "1st title",
        postText: "1st postText",
        username: "1st username",
    }
    
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Please fill in the title field'),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required()
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
            history.push("/")                                                                   // redirect to home page after create new post
            console.log(data)
        })

        console.log({Url: "http://localhost:3001/posts", Response: "Data successfully stored in Database"})
    }

    
    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
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
                    <label>Username :</label> 
                    <Field 
                        autoComplete="off"
                        id="inputCreatePost3" 
                        name="username" 
                        placeholder="(Eg: John123...)"
                    ></Field>
                    <ErrorMessage name="username" component="span" />
                    <br/>
                    <br/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost
