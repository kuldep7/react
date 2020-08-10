import {UPDATE_RESTAURANT} from '../actions/restaurant-action'

export default function restaurantReducer(state=[],{type,payload}){
    switch(type){
        case UPDATE_RESTAURANT:return payload.restaurant;
        default : return state;
    }
}