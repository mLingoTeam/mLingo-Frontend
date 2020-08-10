import React from 'react';
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from 'yup';


const SetSchema = Yup.object().shape( {
    name: Yup.string().required("This field is required").min(3, "Minimum length is 3"),
    description: Yup.string(),
} )

const SetScreenView = ( { state, functions, searched } ) => {

    const handleSubmit = () => {};

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
            <Formik
                initialValues={ { name: '', description: ''} }
                onSubmit={handleSubmit}
                validationSchema={SetSchema}
            >
                { (props) => {
                    return (
                        <Form className="set__form">
                            <div className="card__container card--set card--setscreen"></div>

                            <div className="form__group">
                                <label htmlFor="name" className="details__title" size="46">title</label>
                                <Field type="text" name="name" className="details__description details--set"/>

                                <label htmlFor="description" className="details__title">description</label>
                                <Field as="textarea" type="description" name="title" className="details__description details--set" rows="5" col="45">{state.description}</Field>
                            </div>

                            <input type="text" name="title" placeholder="search a collection" className="details__description details--set" onChange={(e)=>{ functions.searchCollection(e.target.value) }}/>
                        </Form>
                    )
                }}
            </Formik>
            <div className="set__info">
                <h2 className="set__title">{state.name}</h2>
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

            <button className="green--button createset__button">save</button>




        </div>

    )
}

export default SetScreenView;