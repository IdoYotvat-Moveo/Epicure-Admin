import { useState } from "react"
import { Chef, Dish, EiconMeaning, Restaurant } from "../../data/types"
import { StyledForm, StyledSubmitBtn } from "../chefForm/style"
import { FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Switch, TextField } from "@mui/material"

interface DishFormProps {
    restaurants: Restaurant[]
    handleSubmit: (data: Chef | Restaurant | Dish) => Promise<void>
    initialData?: Dish
    handleClose: () => void

}

const DishForm = ({ restaurants, handleSubmit, initialData, handleClose }: DishFormProps) => {
    const [formData, setFormData] = useState(initialData || {
        title: '',
        image: '',
        ingredients: [] as string[],
        restaurant: '',
        price: 0,
        icons: [] as EiconMeaning[],
        isActive: true
    })

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<string[]>) => {
        const { name, value } = ev.target;

        if (name === "ingredients") {
            setFormData(prevFormData => ({
                ...prevFormData,
                ingredients: (value as string).split(',').map((ingredient: string) => ingredient.trim())
            }))
        } else if (name === "price") {
            setFormData(prevFormData => ({
                ...prevFormData,
                price: +value
            }))
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }))
        }
    }


    const handleSwitchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = ev.target
        setFormData({
            ...formData,
            [name]: checked
        });
    }

    const submitHandler = async (ev: React.FormEvent) => {
        ev.preventDefault()
        await handleSubmit(formData)
    }

    console.log(formData.restaurant);
    
    return (
        <StyledForm onSubmit={submitHandler} onBlur={() => handleClose}>
            <TextField
                name="title"
                value={formData.title}
                onChange={handleChange}
                label="Title"
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
            <TextField
                id="outlined-number"
                label="Price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
            />
            <InputLabel id="restaurant">Restaurant</InputLabel>
            <Select
                required={true}
                name="restaurant"
                labelId="restaurant"
                id="restaurant-select"
                value={formData.restaurant as string}
                onChange={handleChange}
                input={<OutlinedInput label="Restaurant" />}
            >
                {restaurants.map((res) => (
                    <MenuItem key={res._id} value={res.name}>
                        {res.name}
                    </MenuItem>
                ))}
            </Select>
            <InputLabel id="icons">Tags</InputLabel>
            <Select
                name="icons"
                labelId="icons"
                id="icons-select"
                multiple
                value={formData.icons as EiconMeaning[]}
                onChange={handleChange}
                input={<OutlinedInput label="Icons" />}
                renderValue={(selected) => (selected as EiconMeaning[]).join(', ')}
            >
                {Object.values(EiconMeaning).map((icon) => (
                    <MenuItem key={icon} value={icon}>
                        {icon}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                name="ingredients"
                value={formData.ingredients.join(', ')}
                onChange={handleChange}
                label="Ingredients"
                variant="outlined"
                autoComplete='off'
                multiline
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={formData.isActive}
                        onChange={handleSwitchChange}
                        name="isActive"
                    />
                }
                label="Is Active?"
            />
            <StyledSubmitBtn type="submit">Submit</StyledSubmitBtn>
        </StyledForm>
    )
}

export default DishForm
