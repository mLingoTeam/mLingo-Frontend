import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'

import UserSectionView from '../../UserSectionView';
import CollectionCard from '../../../../collection_/CollectionCard/CollectionCard';
import Loading from '../../../../../loading/Loading'

const title = "collections";
const description=" Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY. Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY.";


const SectionCollectionView = ( { state } ) => {

    return (
        <UserSectionView title={title} description={description}>    {
                state.loading ? <div><Loading/></div>  : <div>
                    <div className="cards__container">
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