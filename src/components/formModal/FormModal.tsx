import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp'
import { StyledModal } from './styles';
import { Chef, Dish, EntityType, Restaurant } from '../../data/types';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/root-reducer';
import * as chefThunks from '../../redux/chunks/chef/chef.thunks'
import * as restaurantThunks from '../../redux/chunks/restaurant/restaurant.thunks'
import * as dishThunks from '../../redux/chunks/dish/dish.thunks'
import { AppDispatch } from '../../redux/store/store';
import ChefForm from '../chefForm/ChefForm';
import RestaurantForm from '../restaurantForm/RestaurantForm';
import DishForm from '../dishForm/DishForm';
// import RestaurantForm from '../restaurantForm/RestaurantForm';


interface ModalProps {
    entity: EntityType
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    initialData?: Chef | Restaurant | Dish | null
    setInitialData: Dispatch<SetStateAction<Chef | Restaurant | Dish | null>>
}


const FormModal = ({ entity, open, setOpen, initialData,setInitialData }: ModalProps) => {
    const dispatch = useDispatch<AppDispatch>()

    const restaurants = useSelector((state: RootState) => state.restaurants.restaurants)
    const dishes = useSelector((state: RootState) => state.dishes.dishes)
    const chefs = useSelector((state: RootState) => state.chefs.chefs)

    useEffect(() => {
        dispatch(restaurantThunks.getAllRestaurants())
        dispatch(dishThunks.getAllDishes())
        dispatch(chefThunks.getAllChefs())
    }, [])

    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setInitialData(null)
    }

    const handleSubmit = async (data: Chef | Restaurant | Dish) => {
        try {
            if (data._id) {
                switch (entity) {
                    case 'chef':
                        await dispatch(chefThunks.updateChef({ id: data._id, data: data as Chef }))
                        break;
                    case 'restaurant':
                        await dispatch(restaurantThunks.updateRestaurant({ id: data._id, data: data as Restaurant }))
                        break;
                    case 'dish':
                        await dispatch(dishThunks.updateDish({ id: data._id, data: data as Dish }))
                        break;
                }
            } else {
                switch (entity) {
                    case 'chef':
                        await dispatch(chefThunks.addChef({ data: data as Chef }))
                        break;
                    case 'restaurant':
                        await dispatch(restaurantThunks.addRestaurant({ data: data as Restaurant }))
                        break;
                    case 'dish':
                        await dispatch(dishThunks.addDish({ data: data as Dish }))
                        break;
                }
            }
        } catch (error) {
            console.error('Failed to submit data', error)
        } finally {
            handleClose()
        }
    }

    return (
        <div>
            <Button onClick={handleOpen}>
                <AddBoxSharpIcon fontSize='large' />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyledModal>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBlockEnd:5}}>
                       {!initialData && `Add ${entity}`}
                       {initialData && `edit ${entity}`}
                    </Typography>
                    {entity === 'chef' && <ChefForm restaurants={restaurants} handleSubmit={handleSubmit} initialData={initialData as Chef} handleClose={handleClose} />}
                    {entity === 'restaurant' && <RestaurantForm chefs={chefs} handleSubmit={handleSubmit} dishes={dishes} initialData={initialData as Restaurant} handleClose={handleClose} />}
                    {entity === 'dish' && <DishForm restaurants={restaurants} handleSubmit={handleSubmit} initialData={initialData as Dish} handleClose={handleClose} />}
                </StyledModal>
            </Modal>
        </div>
    );
}

export default FormModal