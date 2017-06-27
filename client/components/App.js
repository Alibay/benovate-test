/**
 * Created by lenur on 3/20/17.
 */

import React from 'react';
import NavBar from './NavBar';
// import store from '../state';

export default class App extends React.Component {
    // componentWillMount(){
    //     store.subscribe(() => {
    //     });
    // }

    render() {
        return (
            <div>
                <NavBar />
                <div id="page-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
