import { Button, TextField } from "@mui/material"
import { StyledLoginForm, StyledLoginTitle } from "./styles"
import { useState } from "react"
import * as utilService from '../../services/utils'
import * as userService from '../../services/user.service'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({

    email: false,
    password: false,
  })

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
  }

  const validateForm = () => {
    const newErrors = {
      email: formData.email === "" || !utilService.validateEmail(formData.email),
      password: formData.password === "",
    }
    setErrors(newErrors)
    return !Object.values(newErrors).includes(true)
  }

  const login = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (validateForm()) {
        console.log("Logged in!", formData)
        const response = await userService.loginUser(formData)
        console.log("Logged in!", response)
      } else {
        console.log("Form has errors")
      }
    } catch (err) {
      console.log('Login page => could not submit the form', err)
    }
  }

  return (
    <div>
      <StyledLoginForm onSubmit={login}>
        <StyledLoginTitle>Login</StyledLoginTitle>
        <TextField
          required
          id="email"
          label="Mail"
          placeholder="Nedstark@winterfell.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email ? "Valid Email is required" : ""}
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
        <Button variant="contained" type="submit">Login</Button>
      </StyledLoginForm>
    </div>
  )
}

export default LoginPage
