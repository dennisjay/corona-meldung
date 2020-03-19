import * as React from "react"
import { Formik, FormikActions, FormikProps, Form } from "formik"
import * as Yup from "yup"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import { AuthenticationService } from "../../services/authentication.service"
import {
  ContactWrapper,
  ContactPageTitle,
  ContactFromWrapper,
  InputGroup,
} from "./style"

interface MyFormValues {
  email: string
  password: string
}

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required"),
})

function handleSubmit(values: MyFormValues, formikActions: FormikActions<MyFormValues>) {
  AuthenticationService.login(values.email, values.password)
    .then(
      success => {
        console.log(" Login OK ");
        //event.preventDefault();
      },
      error => {
        console.log(" Login Error ");
        console.log(error);
      }
    )
  /* (
        values: MyFormValues,
        actions: FormikActions<MyFormValues>
      ) => {
        setTimeout(() => {
          console.log({ values, actions })
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 700)
      } */
}

const Login: React.SFC<{}> = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={SignupSchema}
      render={({
        handleChange,
        values,
        errors,
        handleBlur,
        touched,
        isSubmitting,
      }: FormikProps<MyFormValues>) => (
          <>
            <Form>
              <ContactWrapper>
                <ContactPageTitle>
                  <h2>Login</h2>
                </ContactPageTitle>
                <ContactFromWrapper>
                  <InputGroup>
                    <Input
                      type="email"
                      name="email"
                      value={`${values.email}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Email"
                      notification={`${
                        errors.email && touched.email ? errors.email : ""
                        }`}
                    />
                    <Input
                      type="password"
                      name="password"
                      value={`${values.password}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Password"
                      notification={
                        errors.password && touched.password ? errors.password : ""
                      }
                    />
                  </InputGroup>

                  <Button
                    title="Submit"
                    type="submit"
                    isLoading={isSubmitting ? true : false}
                    loader="Submitting.."
                  />
                </ContactFromWrapper>
              </ContactWrapper>
            </Form>
          </>
        )}
    />
  )
}

export default Login
