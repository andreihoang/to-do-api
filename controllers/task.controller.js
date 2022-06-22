

const handleSubmitTask = (req, res, db) => {
    const {task, dueDate, isComplete, isHeartFill, userId, date} = req.body
    let dateParse = new Date(dueDate).toDateString()
    db('task')
        .returning('*')
        .insert({
            task: task,
            date: date, 
            duedate: dateParse,
            iscomplete: isComplete,
            isheartfill: isHeartFill,
            userid: userId
        })
        .then(task => {
            
            const taskObj = task[0]
            taskObj.date = new Date(taskObj.date).toDateString()
            
            return res.json(taskObj);
        })
        .catch(err => console.log(err));
}


const handleGetTask = (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('task').where('userid', '=', id)
      .then(tasks => {
          
          const newArray = [];
          for (let i = 0; i < tasks.length; i++) {
              tasks[i].date = new Date(tasks[i].date).toDateString();
              newArray.push(tasks[i])
           }
          return res.json(newArray);
      })
      .catch(err => res.status(404).json("Cannot get task"));
}

const handleMarkComplete = (req, res, db) => {
    const {id} = req.params;
    const {taskId, isComplete} = req.body;

    db('task')
        .returning('*')
        .where({
            taskid: taskId,
            userid: id
        }).update({
            iscomplete: !isComplete
        }).then(task => {
            return res.json(task[0]);
        })
        .catch(err => res.status(404).json("Cannot update task"));

}

const handleHeartFill = (req, res, db) => {
    const {id, taskid} = req.params;
    const {isHeartFill} = req.body;

    db('task')
        .returning('*')
        .where({
            taskid: taskid,
            userid: id
        }).update({
            isheartfill: !isHeartFill
        }).then(task => {   
            return res.json(task[0]);
        })
 
}

const handleDueDate = (req, res, db) => {
    const {id} = req.params;
    const {dueDate, taskId} = req.body;
 
    db('task')
        .returning('*')
        .where({
            taskid: taskId,
            userid: id
        }).update({
            duedate: dueDate
        })
        .then(task => {
            return res.json(task[0]);
        })
        .catch(err => console.log(err));
}

const hadleDeletetask = (req, res, db) => {
    const {id, taskid} = req.params;

    db('task')
        .del()
        .where({
            taskid: taskid,
            userid: id
        })
    
        .then(response => res.json("success!"))
        .catch(err => res.status(404).json("Cannot delete task"));

}


module.exports = {
    handleSubmitTask: handleSubmitTask,
    handleGetTask: handleGetTask,
    handleMarkComplete: handleMarkComplete,
    handleHeartFill: handleHeartFill,
    handleDueDate: handleDueDate,
    hadleDeletetask: hadleDeletetask
}
