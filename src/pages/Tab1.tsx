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
  IonSelect,
  IonSelectOption,
  IonDatetime
} from '@ionic/react';

import React, { useEffect, useState } from 'react';
import {
  initDB,
  getTasks,
  addTaskDB,
  toggleTaskDB,
  deleteTaskDB
} from '../database';

const Tab1: React.FC = () => {

  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('School');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const setup = async () => {
      await initDB();
      loadTasks();
    };
    setup();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data || []);
  };

  const addTask = async () => {
    if (!title) return;
    await addTaskDB(title, category, dueDate);
    setTitle('');
    loadTasks();
  };

  const toggleTask = async (task: any) => {
    await toggleTaskDB(task.id, task.completed);
    loadTasks();
  };

  const deleteTask = async (id: number) => {
    await deleteTaskDB(id);
    loadTasks();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Tracker</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonItem>
          <IonInput
            placeholder="Task..."
            value={title}
            onIonChange={e => setTitle(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonSelect value={category} onIonChange={e => setCategory(e.detail.value)}>
            <IonSelectOption value="School">School</IonSelectOption>
            <IonSelectOption value="Personal">Personal</IonSelectOption>
            <IonSelectOption value="Group">Group</IonSelectOption>
            <IonSelectOption value="Work">Work</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonDatetime
            presentation="date"
            onIonChange={e => setDueDate(e.detail.value as string)}
          />
        </IonItem>

        <IonButton expand="block" onClick={addTask}>
          Add Task
        </IonButton>

        <IonList>
          {tasks.map(task => (
            <IonItem key={task.id}>
              <IonCheckbox
                slot="start"
                checked={task.completed === 1}
                onIonChange={() => toggleTask(task)}
              />
              <IonLabel>
                <h2>{task.title}</h2>
                <p>{task.category} | Due: {task.dueDate}</p>
              </IonLabel>
              <IonButton
                color="danger"
                fill="clear"
                slot="end"
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