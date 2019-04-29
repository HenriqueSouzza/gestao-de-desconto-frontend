import React, { Component } from 'react';
import Grid from '../layout/grid';
import Select from 'react-select';

/**
 * <b>SelectMultiple</b> Component responsável por criar inputs do tipo select option multiplo, criar os botões selecionar todos e retirar todos 
 * e também permite remover itens selecionados por meio do icone de remover (x). Apresenta mensagens por meio da para o span com a classe help-block
 * 
 * OBS: htmlFor = for do html normal assim que className = class
 * {...input} recebe do Field do (redux-form) 
 */
export default class SelectMultiple extends Component {

    render() {

       const {
            style,
            cols,
            label,
            readOnly,
            multiple,
            input,
            options,
            name,
            id,
            meta: { touched, error } 
        } = this.props;

        return (
            <Grid cols={cols} style={style}>
                <div className={`form-group ${touched && error && "has-error"}`}>
                    {touched && error ? (
                        <label className="control-label">
                            <i className="fa fa-times-circle-o" />
                            &nbsp;
                        {label}
                        </label>
                    ) : (
                            <label htmlFor={name}>{label}</label>
                        )}
                    <Select
                        {...input}
                        id={id}
                        name={name}
                        options={options}
                        value={input.value || ""}
                        onChange={value => input.onChange(value)}
                        onBlur={() => { }}
                        placeholder="Selecione"
                        isSearchable={true}
                        isMulti={multiple}
                        isDisabled={readOnly}
                    />
                    {multiple ? (
                        <div>
                            <button
                                type="button"
                                className={`btn btn-light pull-right`}
                                onClick={value => input.onChange((value = options))}
                            >
                                Selecionar Todos
                        </button>
                            <button
                                type="button"
                                className={`btn btn-light pull-right`}
                                onClick={value => input.onChange((value = []))}
                            >
                                Retirar Todos
                        </button>
                        </div>
                    ) : null}
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </Grid>

        )
        
    }
}