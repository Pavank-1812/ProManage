import React, { useState } from 'react';
import styles from './TaskForm.module.css';
import High from '../../Assets/Icons/High.png';
import Moderate from '../../Assets/Icons/Moderate.png';
import Low from '../../Assets/Icons/Low.png';
import Delete from '../../Assets/Icons/Delete.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskForm = ({ closeModal, handleAddTask }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [checklist, setChecklist] = useState([]);
    const [dueDate, setDueDate] = useState('');
    const [assignTo, setAssignTo] = useState('');

    const addChecklistItem = () => {
        const newChecklistItem = { name: '', checked: false };
        setChecklist(prevChecklist => [...prevChecklist, newChecklistItem]);
    };

    const handleNameChange = (index, newName) => {
        const updatedChecklist = [...checklist];
        updatedChecklist[index].name = newName;
        setChecklist(updatedChecklist);
    };

    const handleCheckboxChange = (index, newChecked) => {
        const updatedChecklist = [...checklist];
        updatedChecklist[index].checked = newChecked;
        setChecklist(updatedChecklist);
    };

    const deleteChecklistItem = (index) => {
        const updatedChecklist = [...checklist];
        updatedChecklist.splice(index, 1);
        setChecklist(updatedChecklist);
    };

    const countCheckedItems = () => {
        return checklist.filter(item => item.checked).length;
    };

    const handleCancel = () => {
        closeModal();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const taskData = {
            title,
            priority,
            checklist,
            dueDate,
            assignTo
        };
        handleAddTask(taskData);
        closeModal();
    };

    const handleDateChange = date => {
        setDueDate(date);
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <label htmlFor="title">Title <span>*</span></label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className={styles.priorityContainer}>
                <label className={styles.priorityLabel}>Select Priority <span>*</span></label>
                <div className={styles.selectPriority}>
                    <div
                        className={styles.priority}
                        id={priority === 'high' ? styles.selected : ''}
                        onClick={() => setPriority('high')}
                    >
                        <img src={High} alt="High" />
                        <p>HIGH PRIORITY</p>
                    </div>
                    <div
                        className={styles.priority}
                        id={priority === 'moderate' ? styles.selected : ''}
                        onClick={() => setPriority('moderate')}
                    >
                        <img src={Moderate} alt="Moderate" />
                        <p>MODERATE PRIORITY</p>
                    </div>
                    <div
                        className={styles.priority}
                        id={priority === 'low' ? styles.selected : ''}
                        onClick={() => setPriority('low')}
                    >
                        <img src={Low} alt="Low" />
                        <p>LOW PRIORITY</p>
                    </div>
                </div>
            </div>
            <div className={styles.assignToContainer}>
                <label htmlFor="assignTo">Assign To</label>
                <input
                    type="email"
                    name="assignTo"
                    id="assignTo"
                    placeholder="Add a Assignee"
                    value={assignTo}
                    onChange={(e) => setAssignTo(e.target.value)}
                />
            </div>

            <div className={styles.checklistContainer}>
                <label>Checklist ({countCheckedItems()}/{checklist.length}) <span>*</span></label>
                <div className={styles.checklistItems}>
                    {checklist.map((item, index) => (
                        <div className={styles.item} key={index}>
                            <input
                                type="checkbox"
                                className={styles.checklistCheckbox}
                                checked={item.checked}
                                onChange={() => handleCheckboxChange(index, !item.checked)}
                            />
                            <input
                                type="text"
                                className={styles.checklistName}
                                placeholder="Add a task"
                                value={item.name}
                                onChange={(e) => handleNameChange(index, e.target.value)}
                            />
                            <img src={Delete} alt="delete" onClick={() => deleteChecklistItem(index)} />
                        </div>
                    ))}
                </div>
                <button className={styles.addChecklistBtn} onClick={addChecklistItem}>+ Add New</button>
            </div>

            

            <div className={styles.buttonContainer}>
                <div className={styles.datePicker}>
                    <DatePicker
                        selected={dueDate}
                        onChange={handleDateChange}
                        dateFormat="MM/DD/YYYY"
                        placeholderText={dueDate ? dueDate : 'Select Due Date'}
                        className={styles.customDatePicker}
                    />
                </div>

                <div className={styles.buttons}>
                    <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                    <button type="submit" onClick={handleSubmit} className={styles.submitButton}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;
