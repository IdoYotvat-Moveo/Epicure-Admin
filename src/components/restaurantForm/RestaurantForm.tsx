import { FormControlLabel, InputLabel, MenuItem, OutlinedInput, Rating, Select, SelectChangeEvent, Switch, TextField } from "@mui/material"
import { Chef, Dish, Restaurant } from "../../data/types"
import { useState } from "react"
import { StyledForm, StyledSubmitBtn } from "../chefForm/style"

interface RestaurantFormProps {
    chefs: Chef[]
    dishes: Dish[]
    handleSubmit: (data: Chef | Restaurant | Dish) => Promise<void>
    initialData?: Restaurant
    handleClose: () => void
}


const RestaurantForm = ({ chefs, handleSubmit, dishes, initialData, handleClose }: RestaurantFormProps) => {
    const [formData, setFormData] = useState<Restaurant>(initialData || {
        name: '',
        chef: '',
        image: '',
        rating: 0,
        dishes: [],
        isPopular: false,
        signatureDish: ''
    })

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = ev.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }


    const handleSelectChange = (ev: SelectChangeEvent<string[]>) => {
        const { name, value } = ev.target;
        const uniqueValues = Array.from(new Set(value as string[]));
    
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: uniqueValues
        }));
    }

    const handleSwitchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = ev.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: checked
        }))
    }

    const handleRatingChange = (newValue: number | null, name: string) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: newValue !== null ? newValue : 0
        }))
    }

    const submitHandler = async (ev: React.FormEvent) => {
        ev.preventDefault()
        await handleSubmit(formData)
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
            />
            <TextField
                name="image"
                value={formData.image}
                onChange={handleChange}
                label="ImageUrl"
                variant="outlined"
                autoComplete='off'
            />
            <InputLabel id="chef">Chef</InputLabel>
            <Select
                name="chef"
                labelId="chef"
                id="chef-select"
                value={formData.chef as string}
                onChange={handleChange}
                input={<OutlinedInput label="Chef" />}
            >
                {chefs.map((chef) => (
                    <MenuItem key={chef._id} value={chef.name}>
                        {chef.name}
                    </MenuItem>
                ))}
            </Select>
            <InputLabel id="dishes">Dishes</InputLabel>
            <Select
                name="dishes"
                labelId="dishes"
                id="dishes-select"
                multiple
                value={formData.dishes}
                onChange={handleSelectChange} // Use handleSelectChange for multi-select
                input={<OutlinedInput label="Dishes" />}
                renderValue={(selected) => (selected as string[]).join(', ')}
            >
                {dishes.map((dish) => (
                    <MenuItem key={dish._id} value={dish.title}>
                        {dish.title}
                    </MenuItem>
                ))}
            </Select>
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.isPopular}
                        onChange={handleSwitchChange}
                        name="isPopular"
                    />
                }
                label="is Popular?"
            />
            <Rating
                name="rating"
                value={formData.rating}
                onChange={(event, newValue) => handleRatingChange(newValue, 'rating')}
            />
            <InputLabel id="signatureDish">Signature Dish</InputLabel>
            <Select
                name="signatureDish"
                labelId="signatureDish"
                id="signatureDish-select"
                value={formData.signatureDish || ''}
                onChange={handleChange}
                input={<OutlinedInput label="SignatureDish" />}
            >
                {dishes.map((dish) => (
                    <MenuItem key={dish._id} value={dish.title}>
                        {dish.title}
                    </MenuItem>
                ))}
            </Select>
            <StyledSubmitBtn type="submit">Submit</StyledSubmitBtn>
        </StyledForm>
    )
}


export default RestaurantForm