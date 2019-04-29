import React, { Component } from 'react';

export default class IF extends Component {
    //componente de condicional para não ter que misturar javacript com o render do template
    render() {
		if (this.props.test) {
			return this.props.children;
		} else {
			return false;
		}
		
	}

}
