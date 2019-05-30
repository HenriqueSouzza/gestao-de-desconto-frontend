import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, arrayRemove, arrayPush } from 'redux-form';
import SelectLabel from '../../common/components/form/selectLabel';
import { InputLabel } from '../../common/components/form/inputLabel';
import { CheckboxLabel } from '../../common/components/form/checkBoxLabel';
import { FORM_RULES } from '../../helpers/validations';
import _ from 'lodash';

import If from '../../common/components/operator/if';

import Row from '../../common/components/layout/row';
import Grid from '../../common/components/layout/grid';

import StudentDiscountFormList from './studentDiscountsForm/studentDiscountsFormList'



class StudentDiscountsList extends Component {

    /**
    * Manipulando as matriculas que foram clicadas, guardando em uma array e retirando quando tirar o click do "check"
    */
    studentSelected = (student, status) => {
        if (status) {
            this.props.arrayPush("studentDiscounts", "students", student)
        } else {
            this.props.arrayRemove("studentDiscounts", "students", this.props.stateForm.values.students.indexOf(student))
        }
    }

    render() {

        const { students, stateForm } = this.props;

        const scholarship = students.scholarship;

        const studentsList = this.props.student;

        console.log(this.props.index)

        // const stateForm = this.props.stateForm;

        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    students: state.students,
    establishment: state.establishment
});


/**
 * <b>mapDispatchToProps</b> mapeia o disparo de ações para as propriedades. 
 * bindActionCreator: o primeiro objeto são as actions creator e o segundo é o dispatch
 * O resultado dessa função via de regra é uma action e essa action é passada para os reducers para que ele evolua o estado 
 * e o component seja renderizado novamente para refletir o estado atual
 * 
 * @param {*} dispatch 
 */

const mapDispatchToProps = dispatch => bindActionCreators({ arrayRemove, arrayPush }, dispatch)

/**
 * <b>connect</b> utiliza o padrão decorator da ES para que ele possa incluir dentro das propriedades desse component 
 * para incluir o que foi mapeado no estado(mapStateToProps) e o que foi mapeado nas actions(mapDispatchToProps)
 */
export default connect(mapStateToProps, mapDispatchToProps)(StudentDiscountsList);