import React, { Component } from 'react';
import { connect } from 'react-redux';
import smallLogo from './../assets/logo-small.png';

export class Header extends Component {

    render() {

        return <div>
                    <header style={ header }>
                        <div >
                            <img style= { img } src={ smallLogo } alt="Go to main page"/>
                        </div>
                        <div style= { logo }>
                            To-Do list vue Æpp
                        </div>
                    </header>
                </div>
    }
}

// styles
const header = {
    "height": "56px",
    "display": "flex",
    "flexFlow": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "backgroundColor": "#311b58",
    "padding": "0 20px",
    "borderBottom": "solid 1px #F7286E"
}

const logo = {
    "fontWeight": "bold",
    "fontSize": "22px",
    "color": "white",
    "margin": "0 auto"
}

const img = {
    "height": "24px"
}

const mapStateToPros = (state) => {
    return state;
}

export default connect(mapStateToPros)(Header)
