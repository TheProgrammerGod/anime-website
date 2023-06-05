import React, { createContext, useContext, useReducer, useState } from "react";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

//actions
const LOADING ="LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_CHARACTER_PICTURES = "GET_CHARACTER_PICTURES";


const reducer = (state,action) => {

    switch(action.type){
        case LOADING:
            return {...state, loading: true};
        case GET_POPULAR_ANIME:
            return {...state, loading: false, popularAnime: action.payload};
        case SEARCH:
            return {...state, loading: false, searchResults: action.payload};
        case GET_UPCOMING_ANIME:
            return {...state, loading: false, upcomingAnime: action.payload};
        case GET_AIRING_ANIME:
            return {...state, loading: false, airingAnime: action.payload};
        case GET_CHARACTER_PICTURES:
            return {...state, loading: false, pictures: action.payload};
        default:
            return state;
    }
}


export const GlobalContextProvider = ({ children }) => {

    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false
    };

    const [state,dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value === ''){
            state.isSearch = false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(search){
            searchAnime(search);
            state.isSearch = true;
        }
        else {
            state.isSearch = false;
            alert('Please enter a search term!');
        }
    };

    const getPopularAnime = async () => {
        dispatch({type: LOADING});
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await response.json();
        dispatch({type: GET_POPULAR_ANIME, payload: data.data});
    };

    //fetch upcoming anime
    const  getUpcomingAnime = async () => {
        dispatch({type: LOADING});
        const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const data = await response.json();
        dispatch({type: GET_UPCOMING_ANIME, payload: data.data});
    };

    //fetch airing anime
    const getAiringAnime = async () => {
        dispatch({type: LOADING});
        const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
        const data = await response.json();
        dispatch({type: GET_AIRING_ANIME, payload: data.data});
    };

    //search anime

    const searchAnime = async (anime) => {
        dispatch({type: LOADING});
        const response = await fetch(`${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await response.json();
        dispatch({type: SEARCH, payload: data.data});
    };

    //fetch character pictures

    const getCharacterPictures = async (id) => {
        dispatch({type:LOADING});
        const response = await fetch(`${baseUrl}/characters/${id}/pictures`);
        const data = await response.json();
        dispatch({type: GET_CHARACTER_PICTURES, payload: data.data});
    };

    React.useEffect(() => {
        getAiringAnime();
    },[]);

    return (
        <GlobalContext.Provider value={{
            ...state,
            search,
            handleChange,
            handleSubmit,
            searchAnime,
            getAiringAnime,
            getPopularAnime,
            getUpcomingAnime,
            getCharacterPictures
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}