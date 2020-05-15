const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/todo', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

var toDoSchema = new mongoose.Schema({
    name: String,
    isActive: Boolean,
    isCompleted: Boolean
});
const  toDo = mongoose.model('toDo', toDoSchema);

module.exports = toDo;