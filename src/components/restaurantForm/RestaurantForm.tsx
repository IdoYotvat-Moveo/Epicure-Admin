import { FormControlLabel, FormHelperText, InputLabel, MenuItem, OutlinedInput, Rating, Select, SelectChangeEvent, Switch, TextField } from "@mui/material"
import { Chef, Dish, Restaurant } from "../../data/types"
import { useMemo, useState } from "react"
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
    const [errors, setErrors] = useState({
        name: false,
        chef: false
    })

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = ev.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
        if (name === "name" && value) {
            setErrors(prevErrors => ({
                ...prevErrors,
                name: false
            }))
        }

        if (name === "chef" && value) {
            setErrors(prevErrors => ({
                ...prevErrors,
                chef: false
            }))
        }
    }


    const handleSelectChange = (ev: SelectChangeEvent<string[]>) => {
        const { name, value } = ev.target
        const uniqueValues = Array.from(new Set(value as string[]))
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: uniqueValues
        }))
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

    const validateForm = () => {
        const newErrors = {
            name: !formData.name,
            chef: !formData.chef
        }
        setErrors(newErrors)

        return !Object.values(newErrors).some(error => error)
    }

    const submitHandler = async (ev: React.FormEvent) => {
        ev.preventDefault()
        if (!validateForm()) {
            return
        }
        await handleSubmit(formData)
    }

    const filteredSignatureDishes = useMemo(() => {
        return dishes.filter(dish => formData.dishes.includes(dish.title))
    }, [formData.dishes, dishes])


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
                error={errors.chef}
            >
                {chefs.map((chef) => (
                    <MenuItem key={chef._id} value={chef.name}>
                        {chef.name}
                    </MenuItem>
                ))}
            </Select>
            {errors.chef && (
                <FormHelperText error>Please select a chef</FormHelperText>
            )}
            <InputLabel id="dishes">Dishes</InputLabel>
            <Select
                name="dishes"
                labelId="dishes"
                id="dishes-select"
                multiple
                value={formData.dishes}
                onChange={handleSelectChange}
                input={<OutlinedInput label="Dishes" />}
                renderValue={(selected) => (selected as string[]).join(', ')}>
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
                value={formData.signatureDish as string}
                onChange={handleChange}
                input={<OutlinedInput label="SignatureDish" />}
            >
                {filteredSignatureDishes.map((dish) => (
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