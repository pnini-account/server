const fileDal = require("../dal/fileDal");

class fileController {    

    getAllfiles = async (req, res) => {
        // Get all notes from DB
        res.send(await fileDal.getAllFiles());
    }

    saveFile = async(req, res) => {
        const fileData = req.query
        // Confirm data
        if (!fileData) {
        return res.status(400).json({ message: 'All fields are required'})
        }
       res.send(await fileDal.addNewFile(fileData));
    }

    openFile = async(req, res) => {
        const id = req.params.id;
        res.json(await fileDal.openFile(id));
    }

    updateFile = async(req, res) => {
         const id  = req.params.id;
        const { name, url, folderId, userId } = req.query   
        // Confirm data
        if (!id) {
        return res.status(400).json({ message: 'Id fields are required'})
        }
        
        res.send(await fileDal.updateFile(id, name, url, folderId, userId));  
    }
    
    deleteFile = async(req, res) => {
        const id  = req.params.id;
        // Confirm data
        if (!id) {
        return res.status(400).json({ message: 'file ID required' })
        }
        res.send(await fileDal.deleteFile(id)); 
    }  
    
}

const filecontroller = new fileController();
module.exports = filecontroller;

