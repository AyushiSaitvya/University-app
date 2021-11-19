const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/university_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));
