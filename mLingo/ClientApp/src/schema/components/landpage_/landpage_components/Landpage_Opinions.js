import React from 'react';
import Landpage_Opinion from './Landpage_Opinion';
import photo1 from '../../../../img/brown-haired-girl-in-white-sleeveless-dress-standing-beside-756453@2x.png'

class Landpage_Opinions extends React.Component {

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
            return <Landpage_Opinion set={op} index={index}/>
        })

        return(
            <div id="Opinions">
                <h2 className="main-page-h2">testimonials</h2>
                {opinions_render}
            </div>
        )
    }
}

export default Landpage_Opinions;