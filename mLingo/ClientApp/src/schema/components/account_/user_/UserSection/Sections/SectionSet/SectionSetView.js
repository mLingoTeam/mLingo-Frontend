import React from 'react';

import { Link } from 'react-router-dom';

import UserSectionView from '../../UserSectionView';
import SetCard from '../../../../set_/SetCard/SetCard';
import { FaPlus } from 'react-icons/fa';

const title = "study sets";
const description=" Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY. Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY.";

const SectionSetView = ( { state } ) => {

    console.log(state)
    return (
        <UserSectionView title={title} description={description}>
        {
                state.loading ? <div>Loading...</div> : <div>
                    <div className="cards__container">
                        {
                            !state.fields.errorMessage ? state.fields.map(element => (
                                <SetCard set={element} />
                            )) : <div className="section__title"> {state.fields.errorMessage} &nbsp; </div>
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
export default SectionSetView;