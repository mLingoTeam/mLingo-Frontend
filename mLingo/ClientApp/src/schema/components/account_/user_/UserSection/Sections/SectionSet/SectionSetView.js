import React from 'react';

import { Link } from 'react-router-dom';

import UserSectionContainer from '../../UserSectionContainer';
import SetCard from '../../../../set_/SetCard/SetCard';
import { FaPlus } from 'react-icons/fa';

const SectionSetView = ( { that } ) => {

    return (
        <UserSectionContainer title="study sets" description=" Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY. Lorem ipsum dolor amet helvetica mumblecore venmo pop-up green juice tousled try-hard, brunch poke. Activated charcoal neutra chambray schlitz, meh succulents DIY.">
            {
                that.state.loading ? <div className="position-relative"><Animation_Loading/></div> : <div>
                    <div className="yourstudysets">
                        {
                            that.state.exist ? that.state.fields.map(element => (
                                <SetCard set={element} />
                            )) : <div className="text-center col-12"><h2> You have no collection! &nbsp; </h2></div>
                        }
                        {
                            that.state.exist ? <button class="green-button">Load more</button> : null
                        }
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <Link to="/create" className="plus-button"><FaPlus /></Link>
                    </div>
                </div>
            }
        </UserSectionContainer>
    );
}
export default SectionSetView;