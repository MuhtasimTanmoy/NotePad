import React, { Component } from "react";

export default class CardItem extends Component {


    render() {
        return (


            <div className="cardItem">
                <div className="cardHover">
                     <div className="ui small image" style={{minHeight:"180px"}}>
                        <img src={this.props.src}/>
                        
                    </div> 

                    <div className="content" style={{paddingTop:"10px"}} >
                        <div className="meta">
                            <a>{this.props.header}</a>
                        </div>
                    </div>                   
                </div>

            </div>



        )
    }
}
