import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'

import UserSectionView from '../../UserSectionView';
import CollectionCard from '../../../../collection_/CollectionCard/CollectionCard';

const SectionCollectionView = ( { state } ) => {

    return (
        <UserSectionView title="collections" description=" Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY. Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY.">
            {
                state.loading ? <div className="position-relative">Loading</div>  : <div>
                    <div className="yourcollections">
                        {
                            state.exist ? state.fields.map(element => (
                                <CollectionCard set={element} />
                            )) : <div className="text-center col-12"><h2> You have no collection! &nbsp; </h2></div>
                        }
                        {
                            state.exist ? <button class="green-button">Load more</button> : null
                        }
                    </div>
                    <div className="d-flex justify-content-center">
                        <Link to="/create" className="plus-button"><FaPlus /></Link>
                    </div>
                </div>
            }
        </UserSectionView>
    );
}

export default SectionCollectionView;