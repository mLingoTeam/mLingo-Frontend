import React from 'react';
import left from '../../../../../img/leftsquare.svg';
import right from '../../../../../img/rightsquare.svg'

const MainpageNewsletterView = ( { state, functions } ) => {

    return(
        <div className="newsletter__section">
                <div className="leftcircle__container">
                    <img src={left} className="left__circle"/>
                </div>
                {
                    state.success ?
                        <div className="newsletter__thanks">You have just registered successfully, Thank You!</div> :
                        <div className="newsletter__subscribe">
                            <div className="newsletter__title mainpage--title">newsletter</div>
                            <div className="newsletter__description">awesome content once a week.</div>
                            <div className="newsletter__description">{"No spam, we promise :)"}</div>
                            <input type="email" className="newsletter__email input--text" placeholder="email@email.com" name="email" value={state.email} onChange={functions.handleChange} required/>
                            {
                                state.err ? <div>{state.err}</div> : null
                            }
                            <br/>
                            <input type="submit" className="green--button" onClick={functions.register} value="sign me up"/>
                        </div>

                }


                <div className="rightcircle__container">
                    <img src={right} className="right__circle"/>
                </div>
            </div>
    )
}

export default MainpageNewsletterView;