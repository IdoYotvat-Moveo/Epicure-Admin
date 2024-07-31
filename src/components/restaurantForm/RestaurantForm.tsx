import { FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Switch, TextField } from "@mui/material"
import { Chef, Dish, Restaurant } from "../../data/types"
import { useState } from "react"
import { StyledForm, StyledSubmitBtn } from "../chefForm/style"

interface ChefFormProps {
    chefs: Chef[]
    dishes: Dish[]
    handleSubmit: (data: Chef | Restaurant | Dish) => Promise<void>
    // restaurant: Restaurant
}


const RestaurantForm = ({ chefs, handleSubmit, dishes }: ChefFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        chef: '',
        image: '',
        rating: 0,
        dishes: [],
        isPopular: false,
        signatureDish: ''
    })


    const getChefObjectIdByName = (name: string) => {
        const chef = chefs.find(chef => chef.name === name);
        return chef ? chef._id : '';
    };

    // Function to get the ObjectId of a Dish by title
    const getDishObjectIdByTitle = (title: string) => {
        const dish = dishes.find(dish => dish.title === title);
        return dish ? dish._id : '';
    }


    const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = ev.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }


    const handleSelectChange = (ev: SelectChangeEvent<string[]>) => {
        const { value } = ev.target
        setFormData({
            ...formData,
            dishes: value as string[]
        })
    }

    const handleSwitchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = ev.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: checked
        }))
    }


    const submitHandler = async (ev: React.FormEvent) => {
        ev.preventDefault()
        // await handleSubmit(formData)
    }

    return (
        <StyledForm onSubmit={submitHandler}>
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
                labelId="chef"
                id="chef-select"
                value={formData.chef}
                // onChange={handleChange}
                input={<OutlinedInput label="Chef" />}
            // renderValue={(selected) => selected}
            >
                {chefs.map((chef) => (
                    <MenuItem key={chef._id} value={chef.name}>
                        {chef.name}
                    </MenuItem>
                ))}
            </Select>
            <InputLabel id="dishes">Dishes</InputLabel>
            <Select
                labelId="dishes"
                id="dishes-select"
                multiple
                value={formData.dishes}
                onChange={handleSelectChange}
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
            <StyledSubmitBtn type="submit">Submit</StyledSubmitBtn>
        </StyledForm>
    )
}


export default RestaurantForm