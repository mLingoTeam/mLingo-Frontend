import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'

import UserSectionView from '../../UserSectionView';
import CollectionCard from '../../../../collection/CollectionCard/CollectionCard';
import Loading from '../../../../../loading/Loading'

const title = "collections";
const description = " Your collections of flashcards";


const SectionCollectionView = ({ state }) => {

    return (
        <UserSectionView title={title} description={description}>    {
            state.loading ? <div><Loading /></div> : <div>
                <div className={state.collection_page ? "cards__container collection--page " : "cards__container"}>
                    {
                        !state.fields.errorMessage ? state.fields.map(element => (
                            <CollectionCard set={element} />
                        )) : <div className="section__title">{state.fields.errorMessage} &nbsp;</div>
                    }
                    {
                        !state.fields.errorMessage ? <button class="green--button">Load more</button> : null
                    }
                </div>
                <div className="element--center">
                    <Link to="/create" className="plus--button"><FaPlus /></Link>
                </div>
            </div>
        }
        </UserSectionView>
    );
}

export default SectionCollectionView;