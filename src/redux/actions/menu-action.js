export const UPDATE_MENU = 'menu:updateMenu'
export function updateMenu (data){
    return {
        type:UPDATE_MENU,
        payload:{
            menu:data
        }
    }
}