import React from 'react';
import left from '../../../../img/leftsquare.svg';
import right from '../../../../img/rightsquare.svg'

const MainpageNewsletterView = ({ that }) => {

    return(
        <section id="newsletter-section" className="col-12">
                <div className="left-circle-container col-6">
                    <img src={left} className="left-circle img-fluid"/>
                </div>
                {
                    that.state.success ?
                        <h2 className="newsletter-thanks col-10 col-sm-4">You have just registered successfully, Thank You!</h2> :
                        <div className="newsletter-subscribe col-sm-10 col-md-4">
                            <h2 className="main-page-h2 mb-5">newsletter</h2>
                            <p>awesome content once a week.</p>
                            <p>{"No spam, we promise :)"}</p>
                            <input type="email" className="text my-5" placeholder="email@email.com" name="email" value={that.state.email} onChange={that.handleChange} required/>
                            {
                                that.state.err ? <div>{that.state.err}</div> : null
                            }
                            <br/>
                            <input type="submit" className="green-button px-5" onClick={that.register} value="sign me up"/>
                        </div>

                }


                <div className="right-circle-container col-6">
                    <img src={right} className="right-circle img-fluid"/>
                </div>
            </section>
    )
}

export default MainpageNewsletterView;