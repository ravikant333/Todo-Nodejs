const express = require('express')
const router = express.Router()
const app=express()


const {
  getAllTasks,createTask,updateTask,getTask
} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').patch(updateTask).get(getTask)

module.exports = router