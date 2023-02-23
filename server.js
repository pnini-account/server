require('dotenv').config()
const express = require("express");

const app = express();

const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const PORT = process.env.PORT || 3600

console.log(process.env.NODE_ENV)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname,'public')))
app.use('/', require('./routes/root'))

app.use("/api/user",require("./routes/userRouter"));
app.use("/api/warning",require("./routes/warningRouter"));
app.use("/api/file",require("./routes/fileRouter"));
app.use("/api/folder",require("./routes/folderRouter"));
app.use("/api/category",require("./routes/categoryRouter"));
app.use("/api/auth", require("./routes/authRoutes"));

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
    } else {
    res.type('txt').send('404 Not Found')
    }
})
    
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))


