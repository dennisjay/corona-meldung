import * as React from "react"
import { Formik, FormikActions, FormikProps, Form } from "formik"
import * as Yup from "yup"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import {
  ContactWrapper,
  ContactPageTitle,
  ContactFromWrapper,
  InputGroup,
} from "./style"
import { AuthenticationService } from "../../services/authentication.service"

interface MyFormValues {
  email: string
  emailConfirm: string
  password: string
  passwordConfirm: string
}

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  emailConfirm: Yup.string().required("Required").oneOf([Yup.ref("email"), null], "Emails missmatch"),
  password: Yup.string().required("Required"),
  passwordConfirm: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Passwords missmatch"),
})

function handleSubmit(values: MyFormValues, formikActions: FormikActions<MyFormValues>) {
  AuthenticationService.register(values.email, values.password)
    .then(
      success => {
        console.log(" Registered ");
        //event.preventDefault();
      },
      error => {
        console.log(" Error ");
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
      initialValues={{ email: "", emailConfirm: "", password: "", passwordConfirm: "" }}
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
                      type="emailConfirm"
                      name="emailConfirm"
                      value={`${values.emailConfirm}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Email confirm"
                      notification={
                        errors.emailConfirm && touched.emailConfirm ? errors.emailConfirm : ""
                      }
                    />
                  </InputGroup>

                  <InputGroup>
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
                    <Input
                      type="passwordConfirm"
                      name="passwordConfirm"
                      value={`${values.passwordConfirm}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Password confirm"
                      notification={
                        errors.passwordConfirm && touched.passwordConfirm ? errors.passwordConfirm : ""
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
