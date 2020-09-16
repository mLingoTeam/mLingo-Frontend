import React from 'react';
//import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from 'yup';


const SetSchema = Yup.object().shape( {
    name: Yup.string().required("This field is required").min(3, "Minimum length is 3"),
    description: Yup.string(),
} )

const SetScreenView = ( { state, functions, searched } ) => {


    const collections = state.collections.map( collection => <li>{collection.name || 'no name of the collection'}</li>)

    let renderedSearched =  searched.length > 0  ? searched.map( item => <div className="searched__item">
        <div className="flex--complet">
            <h3 className="mx-5">{item.name}</h3>
            <p className="m-5">{item.description}</p>
        </div>
        <button name={item.id} className="green--button" onClick={(e) => { functions.addCollectionToSet(e.target.name) }}>add</button>
    </div>)  : 'no matching collections'

    return (
        <div className="set__container">
            <h2 className="set__title">{state.name}</h2>
            <form className="set__form">
                <div className="card__container card--set card--setscreen"></div>

                <div className="form__group">
                    <label htmlFor="name" className="details__title" size="46">title</label>
                    <input type="text" name="name" className="details__description details--set" onChange={(e) => { functions.handleSetChange(e.target.name, e.target.value) }} value={state.name}/>

                    <label htmlFor="description" className="details__title">description</label>
                    <textarea as="textarea" type="description" name="description" className="details__description details--set" rows="5" col="45" onChange={(e) => { functions.handleSetChange(e.target.name, e.target.value) }}   value={state.description} ></textarea>
                </div>

                <input type="text" name="title" placeholder="search for a collection" className="details__description details--set" onChange={(e)=>{ functions.searchCollection(e.target.value) }}/>
            </form>
                <div className="set__info">
                <h2 className="set__title">{state.name || 'collections'}</h2>
                <ol>
                    { collections }
                </ol>
            </div>

            <div className="searched__collections">
                <h2 className="set__title">add collections to the set</h2>
                <ol>
                    {renderedSearched}
                </ol>
            </div>

            <button className="green--button createset__button" onClick={functions.submitSetForm}>save</button>




        </div>

    )
}

export default SetScreenView;