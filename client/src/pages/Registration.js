import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios"; 

function Registration() {

    const initialValues = {
        username: "1st username",
        password: "1st password",
    }
    
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data)
        })
    }

    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <br/>
                    <label>Username :</label> 
                    <Field 
                        autoComplete="off"
                        id="inputCreateRegistration" 
                        name="username"
                        placeholder="Username"
                    />
                    <ErrorMessage name="username" component="span" />
                    <br/>
                    <br/>
                    <label>Password :</label> 
                    <Field 
                        autoComplete="off"
                        type="password"
                        id="inputCreateRegistration" 
                        name="password" 
                        placeholder="Password"
                    />
                    <ErrorMessage name="password" component="span" />
                    <br/>
                    <br/>
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration
