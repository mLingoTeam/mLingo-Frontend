import React from 'react';

import { Link } from 'react-router-dom';

import UserSectionView from '../../UserSectionView';
import SetCard from '../../../../set_/SetCard/SetCard';
import { FaPlus } from 'react-icons/fa';

const SectionSetView = ( { state } ) => {

    return (
        <UserSectionView title="study sets" description=" Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY. Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY.">
            {
                state.loading ? <div className="position-relative">Loading...</div> : <div>
                    <div className="yourstudysets">
                        {
                            state.exist ? state.fields.map(element => (
                                <SetCard set={element} />
                            )) : <div className="text-center col-12"><h2> You have no collection! &nbsp; </h2></div>
                        }
                        {
                            state.exist ? <button class="green-button">Load more</button> : null
                        }
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Link to="/create" className="plus-button"><FaPlus /></Link>
                    </div>
                </div>
            }
        </UserSectionView>
    );
}
export default SectionSetView;