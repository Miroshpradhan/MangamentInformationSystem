import React from 'react';
// import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import CryptoJS from 'crypto-js';
import { Loader } from 'semantic-ui-react';
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {  useNavigate } from 'react-router-dom';
import apiClient from "@/config/axios";
const loginSchema = Yup.object().shape({
  identifier: Yup.string().required("Identifier (email/username) is required"),
  password: Yup.string()
    .min(4, "Password must be at least 8 characters long")
    .required("Password is required"),
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    // .matches(/[0-5]/, "Password must contain at least one number")
    // .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
    // .matches(/^\S*$/, "Password cannot contain spaces"),
  municipalityCode: Yup.string().required("Municipality code is required"),
});


type LoginValues = {
  identifier: string;
  password: string;
  municipalityCode: string;
};

const Login: React.FC = () => {
  const  navigate=useNavigate();
  const submit = async (values: LoginValues) => {
    try {
      const dataToEncrypt = JSON.stringify({
        username: values.identifier,
        password: values.password,
      });
      console.log(dataToEncrypt);
      const encryptedData = CryptoJS.AES.encrypt(
        dataToEncrypt,
      //  process.env.REACT_APP_CIPHER_SECRET || 'random'
      'random'
      ).toString();
      console.log(encryptedData);
  
      const response = await apiClient.post('/login', {
        data: encryptedData,
        municipalityCode: values.municipalityCode,
      });
  
      // Assuming your response includes a token on successful login
      
      if (response.status === 200 && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        toast.success('Login successful');
        navigate('/dashboard');
      } else {
        // Handle unexpected responses or login failure
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      toast.error(error as string);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <Formik<LoginValues>
          initialValues={{
            identifier: '',
            password: '',
            municipalityCode: '',
          }}
          validationSchema={loginSchema}
          onSubmit={submit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5 w-full">
              <div className="flex flex-col items-start">
                <Label className="text-left w-full mb-2 text-gray-700 font-semibold">
                  Please enter your username
                </Label>
                <Field
                  as={Input}
                  type="text"
                  name="identifier"
                  placeholder="Enter username"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage
                  name="identifier"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex flex-col items-start">
                <Label className="text-left w-full mb-2 text-gray-700 font-semibold">
                  Enter your password
                </Label>
                <Field
                  as={Input}
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex flex-col items-start">
                <Label className="text-left w-full mb-2 text-gray-700 font-semibold">
                  Municipality code
                </Label>
                <Field
                  as={Input}
                  type="text"
                  name="municipalityCode"
                  placeholder="Municipality code"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <ErrorMessage
                  name="municipalityCode"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader active inverted inline /> : 'Login'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
