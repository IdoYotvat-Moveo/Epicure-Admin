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

const ChefForm = ({ restaurants, handleSubmit, initialData,handleClose }: ChefFormProps) => {
    const [formData, setFormData] = useState<Chef>(initialData || {
        name: '',
        bio: '',
        image: '',
        restaurants: [],
        isChefOfTheWeek: false,
    })


    const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = ev.target as (HTMLInputElement | HTMLTextAreaElement)
        const { name: field, value } = target
        if (field) {
            setFormData({
                ...formData,
                [field]: value
            })
        }
    }

    const handleSelectChange = (ev: SelectChangeEvent<Restaurant[] | string[]>) => {
        const { value } = ev.target
        setFormData({
            ...formData,
            restaurants: value as string[]
        });
    }

    const handleSwitchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = ev.target
        setFormData({
            ...formData,
            [name]: checked
        })
    }

    const submitHandler = async (ev: React.FormEvent) => {
        ev.preventDefault()
        await handleSubmit(formData)
    }

    return (
        <StyledForm onSubmit={submitHandler} onBlur={() => handleClose}>
            <TextField name="name" value={formData.name} onChange={handleChange} label="Name" variant="outlined" autoComplete='off' />
            <TextField
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                label="Bio"
                multiline
                rows={4}
                variant="outlined"
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
