import React, {Component} from 'react';

import If from '../operator/if';
import './pagination.css';

export default class Pagination extends Component {

    render() {

        const { first_page, current, last_page} = this.props;
        return (
            <div className="pagination">
                <a 
                    onClick={(current > 1 ? () => this.props.getPage(current - 1) : null)}
                > 
                    {
                        current > 1
                            ?
                            <i className="fa fa-arrow-left"></i>
                            :
                            <i className="fa fa-ban"></i>
                    }
                    {/* <i className="fa fa-arrow-left"></i> */}
                    {/* &laquo; */}
                </a>
                <If test={current > 1}>
                    <a onClick={() => this.props.getPage(first_page)}>{first_page}</a>
                </If>
                <a className="active">{current}</a>
                <If test={current < last_page}>
                    <a onClick={() => this.props.getPage(last_page)}>{last_page}</a>
                </If>
                <a 
                    onClick={(current < last_page ? () => this.props.getPage(current + 1) : null)}
                >
                    {
                        current < last_page
                        ?
                            <i className="fa fa-arrow-right"></i>
                        :
                            <i className="fa fa-ban"></i>
                    }
                    
                    {/* &raquo; */}
                </a>
            </div>
        );
    }
}
