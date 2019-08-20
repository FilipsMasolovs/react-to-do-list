import React from 'react';

export default class ToDoItem extends React.Component {
    constructor (props) {
        super(props)

        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
    }

    handleDeleteClick (event) {
        this.props.handleDeleteClick(event)
    }

    handleCheckboxClick (event) {
        this.props.handleCheckboxClick(event)
    }

    render () {
        let id = this.props.id
        let isChecked = this.props.checked
        let value = this.props.value

        return (
            <div className="task" id={id}>
                <div className="task-value">
                    <input type="checkbox" className="checkbox" checked={isChecked} onChange={this.handleCheckboxClick} />
                    {value}
                </div>
                <div className="task-delete">
                    <button className="delete-button" onClick={this.handleDeleteClick}>Delete</button>
                </div>
            </div>
        )
    }
};