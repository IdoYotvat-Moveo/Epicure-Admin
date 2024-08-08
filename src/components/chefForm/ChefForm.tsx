import { FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField } from "@mui/material"
import { Chef, Dish, Restaurant } from "../../data/types"
import { useState } from "react"
import { StyledForm, StyledSubmitBtn } from "./style"
interface ChefFormProps {
    restaurants: Restaurant[]
    handleSubmit: (data: Chef | Restaurant | Dish) => Promise<void>
    initialData?: Chef
    handleClose: () => void
}

const ChefForm = ({ restaurants, handleSubmit, initialData, handleClose }: ChefFormProps) => {
    const [formData, setFormData] = useState<Chef>(initialData || {
        name: '',
        bio: '',
        image: '',
        restaurants: [],
        isChefOfTheWeek: false,
    })
    const [errors, setErrors] = useState({
        name: false,
        bio: false,
    })


    const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = ev.target as (HTMLInputElement | HTMLTextAreaElement)
        const { name: field, value } = target
        if (field) {
            setFormData({
                ...formData,
                [field]: value
            })
            if (field === "name" && value) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    name: false
                }))
            }

            if (field === "bio" && value) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    bio: false
                }))
            }
        }
    }

    const handleSelectChange = (ev: SelectChangeEvent<Restaurant[] | string[]>) => {
        const { value } = ev.target
        setFormData({
            ...formData,
            restaurants: value as string[]
        })
    }

    const validateForm = () => {
        const newErrors = {
            name: !formData.name,
            bio: !formData.bio,
        }
        setErrors(newErrors)

        return !Object.values(newErrors).some(error => error)
    }


    const handleSwitchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = ev.target
        setFormData({
            ...formData,
            [name]: checked
        })
    }

    const submitHandler = async (ev: React.FormEvent) => {
        //todo bad practic
        // ev.preventDefault()
        if (!validateForm()) {
            return
        }
        try{
            await handleSubmit(formData)
        } catch(err){
            console.log('err!!!:',err) 
        }
    }

    return (
        <StyledForm onSubmit={submitHandler} onBlur={() => handleClose}>
            <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                label="Name"
                variant="outlined"
                autoComplete='off'
                error={errors.name}
                helperText={errors.name ? "Name is required" : ""}
            />
            <TextField
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                label="Bio"
                multiline
                rows={4}
                variant="outlined"
                error={errors.bio}
                helperText={errors.bio ? "Bio is required" : ""}
            />
            <TextField name="image" value={formData.image} onChange={handleChange} label="image" variant="outlined" autoComplete='off' />
            <InputLabel id="restaurant">Restaurant</InputLabel>
            <Select
                labelId="restaurant"
                multiple
                value={formData.restaurants}
                onChange={handleSelectChange}
                renderValue={(selected: any) => selected.join(', ')}
                variant="outlined"
            >
                {restaurants.map((res) => (
                    <MenuItem key={res._id} value={res.name}>
                        {res.name}
                    </MenuItem>
                ))}
            </Select>
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.isChefOfTheWeek}
                        onChange={handleSwitchChange}
                        name="isChefOfTheWeek"
                    />
                }
                label="Chef of the week?"
            />
            <StyledSubmitBtn type="submit">Submit</StyledSubmitBtn>
        </StyledForm>
    )
}

export default ChefForm
