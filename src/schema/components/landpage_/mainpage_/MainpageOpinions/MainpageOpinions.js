import React from 'react';
import MainpageOpinion from './MainpageOpinion';
import photo1 from '../../../../../img/brown-haired-girl-in-white-sleeveless-dress-standing-beside-756453@2x.png'

class MainpageOpinions extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            opinions: [
                {
                    photo: photo1,
                    opinion: "Great app! I'd really recommand it to anyone who want's to learn something. Interface is great and overall functionalities really helped me develop my english skills so I can now write this great review. Thanks mLingo!",
                }
            ]
        }
    }


    render(){

        const opinions_render = this.state.opinions.map( (op, index) => {
            return <MainpageOpinion set={op} index={index}/>
        })

        return(
            <div className="opinions__container">
                <h2 className="opinions__title mainpage--title">testimonials</h2>
                <div>
                    {opinions_render}
                </div>
            </div>
        )
    }
}

export default MainpageOpinions;