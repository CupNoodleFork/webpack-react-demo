/**
 * Created by haizhi on 16/7/6.
 */

import React from 'react';
import { Link } from 'react-router';

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div>Home View</div>
                <Link className="btn btn-primary btn-sm" to="/button">To Button View</Link>
            </div>
        );
    }
}

export default HomeView;