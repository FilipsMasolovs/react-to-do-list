import React from 'react';
import './App.css';
import ToDoItem from './ToDoItem'

export default class App extends React.Component {
    constructor (props) {
        super(props)

        let data = window.localStorage.toDoData

        if (data) {
            data = JSON.parse(data)
        } else {
            data = { toDoTasks: [], completedTasks: [] }
            window.localStorage.setItem('toDoData', JSON.stringify(data))
        }
    
        this.state = {
            inputValue: '',
            toDoTasks: data.toDoTasks,
            completedTasks: data.completedTasks
        }

        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
        this.keyPressed = this.keyPressed.bind(this)
    }

    updateLocalStorage () {
        let data = {
            toDoTasks: this.state.toDoTasks,
            completedTasks: this.state.completedTasks
        }
        window.localStorage.setItem('toDoData', JSON.stringify(data))
    }

    keyPressed(event) {
        if (event.key === "Enter") {
          this.handleAddClick()
        }
    }
    
    handleAddClick () {
        if (this.state.inputValue) {
            let id = Date.now()
            let newItem = { id: id.toString(), value: this.state.inputValue }
            let newToDoTasks = this.state.toDoTasks
            newToDoTasks.unshift(newItem)
            this.setState({
                inputValue: '',
                toDoTasks: newToDoTasks
            })
        }

        this.updateLocalStorage()
    }

    handleInputChange (event) {
        this.setState({ inputValue: event.currentTarget.value })
    }

    handleDeleteClick (event) {
        let id = event.currentTarget.closest('.task').id
        let checked = event.currentTarget.closest('.task').querySelector('.checkbox').checked;
        let arrayToDelete = checked ? this.state.completedTasks : this.state.toDoTasks;
        let index = arrayToDelete.findIndex(item => item.id === id);
        arrayToDelete.splice(index, 1);

        this.setState({
            [checked ? 'completedTasks': 'toDoTasks']: arrayToDelete
        })
        
        this.updateLocalStorage()
    }

    handleCheckboxClick (event) {
        let id = event.currentTarget.closest('.task').id
        let checked = event.currentTarget.closest('.task').querySelector('.checkbox').checked;

        let arrayToAdd = checked ? this.state.completedTasks : this.state.toDoTasks
        let arrayToDelete = checked ? this.state.toDoTasks : this.state.completedTasks

        let index = arrayToDelete.findIndex(item => item.id === id);
        arrayToAdd.unshift(arrayToDelete[index]) 
        arrayToDelete.splice(index, 1);
        this.setState({
            toDoTasks: checked ? arrayToDelete : arrayToAdd,
            completedTasks: checked ? arrayToAdd : arrayToDelete
        })

        this.updateLocalStorage()
    }

    getItems (isChecked) {
        let items = [];
        let itemArray = isChecked ? this.state.completedTasks : this.state.toDoTasks
        itemArray.forEach((item) => {
            let key = `to-do-item-${item.id}`
            items.push(
                <ToDoItem 
                    key={key} 
                    value={item.value} 
                    id={item.id} 
                    checked={isChecked} 
                    handleDeleteClick={this.handleDeleteClick} 
                    handleCheckboxClick={this.handleCheckboxClick}
                />
            )
        })
        return items;
    }

    render () {
        return (
            <section className="todo">
                <div>
                    <h2 className="section-name">ADD ITEM</h2>
                    <div className="input">
                        <input value={this.state.inputValue} type="text" className="input-task" onChange={this.handleInputChange} onKeyPress={this.keyPressed} />
                        <button className="add-task" onClick={this.handleAddClick}>Add</button>
                    </div>
                </div>
                <div>
                    <h2 className="section-name">TODO</h2>
                    <div className="open-tasks">
                        {this.getItems(false)}
                    </div>
                </div>
                <div>
                    <h2 className="section-name">COMPLETED</h2>
                    <div className="completed-tasks">
                        {this.getItems(true)}
                    </div>
                </div>
            </section>
        )
    }
};