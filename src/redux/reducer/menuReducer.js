import {UPDATE_MENU} from '../actions/menu-action'
export default function menuReducer(state=[],{type,payload}){
    switch(type){
        case UPDATE_MENU:return payload.menu;
        default : return state;
    }
}