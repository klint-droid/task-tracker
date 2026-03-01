import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCheckbox,
} from '@ionic/react';

import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Tab1: React.FC = () => {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTasks = () => {
    if (taskText.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Student Task Tracker</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>
        <IonItem>
          <IonInput
            placeholder='Enter task...'
            value={taskText}
            onIonInput={(e) => setTaskText(e.detail.value!)}
          />
          <IonButton onClick={addTasks}>Add Task</IonButton>
        </IonItem>

        <IonList>
          {tasks.map(task => (
            <IonItem key={task.id}>
              <IonCheckbox
                slot='start'
                checked={task.completed}
                onIonChange={() => toggleTask(task.id)}
              />
              <IonLabel style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </IonLabel>
              <IonButton
                color='danger'
                fill='clear'
                slot='end'
                onClick={() => deleteTask(task.id)} 
              >
                Delete
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};    

export default Tab1;