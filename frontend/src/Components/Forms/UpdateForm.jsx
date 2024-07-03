import React, { useState, useEffect } from 'react';
import styles from './TaskForm.module.css';
import High from '../../Assets/Icons/High.png';
import Moderate from '../../Assets/Icons/Moderate.png';
import Low from '../../Assets/Icons/Low.png';
import Delete from '../../Assets/Icons/Delete.png';
import { useDispatch } from 'react-redux';
import { fetchTasks, updateTask } from '../../Store/Slices/taskSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const UpdateForm = ({ closeModal, task }) => {
    const [taskId, setTaskId] = useState();
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [checklist, setChecklist] = useState([]);
    const [dueDate, setDueDate] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (task) {
            setTaskId(task._id || null)
            setTitle(task.title || '');
            setPriority(task.priority || '');
            setChecklist(task.checklist || []);
            setDueDate(task.dueDate || '');
        }
    }, [task]);

    const addChecklistItem = () => {
        const newChecklistItem = { name: '', checked: false };
        setChecklist(prevChecklist => [...prevChecklist, newChecklistItem]);
    };

    const handleNameChange = (id, newName) => {
        const updatedChecklist = checklist.map(item =>
            item._id === id ? { ...item, name: newName } : item
        );
        setChecklist(updatedChecklist);
    };

    const handleCheckboxChange = (itemId, newChecked) => {
        const updatedChecklist = checklist.map(item =>
            item._id === itemId ? { ...item, checked: newChecked } : item
        );
        setChecklist(updatedChecklist);
    };



    const deleteChecklistItem = (itemId) => {
        const updatedChecklist = checklist.filter(item => item._id !== itemId);
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
        dispatch(updateTask({ taskId, title, priority, checklist, dueDate })).then(() => {
            dispatch(fetchTasks())
        }).catch((err) => {
            console.log('Update Failed -', err)
        });
        closeModal();
    };

    const handleDateChange = (date) => {
        setDueDate(date)
    }



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

            <div className={styles.checklistContainer}>
                <label>Checklist ({countCheckedItems()}/{checklist.length}) <span>*</span></label>
                <div className={styles.checklistItems}>
                    {checklist.map(item => (
                        <div className={styles.item} key={item._id}>
                            <input
                                type="checkbox"
                                className={styles.checklistCheckbox}
                                checked={item?.checked}
                                onChange={() => handleCheckboxChange(item._id, !item.checked)}
                            />
                            <input
                                type="text"
                                className={styles.checklistName}
                                placeholder="Add a task"
                                value={item?.name}
                                onChange={(e) => handleNameChange(item._id, e.target.value)}
                            />
                            <img src={Delete} alt="delete" onClick={() => deleteChecklistItem(item._id)} />
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
                        placeholderText={dueDate ? dueDate.toString() : 'Select Due Date'}
                        className={styles.customDatePicker}
                    />
                </div>
                <div className={styles.buttons}>
                    <button onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                    <button type="submit" onClick={handleSubmit} className={styles.submitButton}>Edit</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateForm;