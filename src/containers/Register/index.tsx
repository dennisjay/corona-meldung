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
  RegisterResult,
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

const Register: React.SFC<{}> = () => {
  let registerStatus: [boolean, string];
  const [success, setSuccess] = React.useState()
  const [error, setError] = React.useState()

  const handleSubmit = (values: MyFormValues, formikActions: FormikActions<MyFormValues>) => {
    //function handleSubmit(values: MyFormValues, formikActions: FormikActions<MyFormValues>) {
    AuthenticationService.register(values.email, values.password)
      .then(
        success => {
          console.log(" Registered ");
          setError("");
          setSuccess("Thank you! Please check your inbox for email confirmation.");
        },
        error => {
          console.log(" Error ");
          console.log(error);
          registerStatus = [false, 'Something went wrong with the registration.'];
          setError("Something went wrong with the registration.");
          setSuccess("");
        }
      )
      .finally(() => {
        formikActions.setSubmitting(false);
      })
  }
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
        isSubmitting
      }: FormikProps<MyFormValues>) => (
          <>
            <Form>
              <ContactWrapper>
                <ContactPageTitle>
                  <h2>Register</h2>
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
                      type="email"
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
                      type="password"
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

                  {success && (
                    <div style={{ color: 'green' }}>{success} 🙂</div>
                  )}
                  {error && (
                    <div style={{ color: 'red' }}>{error}</div>
                  )}

                </ContactFromWrapper>
              </ContactWrapper>
            </Form>
          </>
        )}

    />

  )
}

export default Register
