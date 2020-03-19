import React, { useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import Input from "../Input/Input"
import Button from "../Button/Button"
import {
  NewsletterWrapper,
  NewsletterInnerWrapper,
  NewsletterTitle,
  NewsletterDescription,
  NewsletterInputWrapper,
  ErrorMessage,
  SuccessMessage,
} from "./Newsletter.style"

type NewsletterProps = {}

const Newsletter: React.FunctionComponent<NewsletterProps> = ({ ...props }) => {
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState()
  const [error, setError] = useState()
  const handleChange = (e: any) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    addToMailchimp(email) // listFields are optional if you are only capturing the email address.
      .then(({ msg, result }: any) => {
        if (result !== "success") {
          throw msg
        }
        setSuccess(msg)
        setError("")
        setEmail("")
      })
      .catch((err: any) => {
        setError(err)
        setSuccess("")
        setEmail("")
      })
  }
  return (
    <NewsletterWrapper {...props}>
      <NewsletterInnerWrapper>
        <NewsletterTitle>
          Bleiben Sie auf dem neusten Stand
        </NewsletterTitle>
        <NewsletterDescription>
          mit unserem Newsletter
        </NewsletterDescription>

        <NewsletterInputWrapper onSubmit={handleSubmit}>
          {success ? (
            <SuccessMessage>{success} 🙂</SuccessMessage>
          ) : (
            <>
              <Input
                type="email"
                name="email"
                placeholder="Mail-Adresse"
                onChange={handleChange}
                value={email}
                required
              />
              <Button title="anmelden" type="submit" />
            </>
          )}
        </NewsletterInputWrapper>
        {error && (
          <ErrorMessage
            dangerouslySetInnerHTML={{ __html: `<span>*</span>${error}` }}
          />
        )}
      </NewsletterInnerWrapper>
    </NewsletterWrapper>
  )
}

export default Newsletter
