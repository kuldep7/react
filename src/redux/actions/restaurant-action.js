export const UPDATE_RESTAURANT = 'menu:updateRestaurant'
export function updateRestaurant (data){
    return {
        type:UPDATE_RESTAURANT,
        payload:{
            restaurant:data
        }
    }
}