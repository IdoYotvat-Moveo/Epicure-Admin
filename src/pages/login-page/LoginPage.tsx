import { Alert, Button, TextField } from "@mui/material"
import { StyledLoginForm, StyledLoginTitle } from "./styles"
import { useState } from "react"
import * as utilService from '../../services/utils'
import * as userService from '../../services/user.service'
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    mail: "",
    password: ""
  })

  const [errors, setErrors] = useState({
    mail: false,
    password: false,
  })
  
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }))
    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: false
    }))
    setErrorMessage(null)
  }

  const validateForm = () => {
    const newErrors = {
      mail: formData.mail === "" || !utilService.validateEmail(formData.mail),
      password: formData.password === "",
    }
    setErrors(newErrors)
    return !Object.values(newErrors).includes(true)
  }

  const login = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (validateForm()) {
        const response = await userService.loginUser(formData)
        if (response) {
          const token = response.token
          sessionStorage.setItem('JWT', token)
          navigate('/home/chef')
        } else {
          setErrorMessage("Invalid email or password. Please try again.")
        }
      } else {
        console.log("Form has errors")
      }
    } catch (err) {
      console.log('Login page => could not submit the form', err)
      setErrorMessage("An unexpected error occurred. Please try again later.")
    }
  }

  return (
    <div>
      <StyledLoginForm onSubmit={login}>
        <StyledLoginTitle>Login</StyledLoginTitle>
        <TextField
          required
          id="mail"
          label="Mail"
          placeholder="Nedstark@winterfell.com"
          value={formData.mail}
          onChange={handleChange}
          error={errors.mail}
          helperText={errors.mail ? "Valid Email is required" : ""}
        />
        <TextField
          required
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helperText={errors.password ? "Password is required" : ""}
        />
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Button variant="contained" type="submit">Login</Button>
      </StyledLoginForm>
    </div>
  )
}

export default LoginPage
