import React from 'react';
import AddTask from './AddTask';
import TasksContainer from './TasksContainer';
import Nav from './Nav';

const Task = ({ socket }) => {
  return (
    <div>
      <Nav />
      <AddTask socket={socket} />
      <TasksContainer socket={socket} />
    </div>
  );
};

export default Task;
