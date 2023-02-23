
const db = require('../models/index')
const File = db.file

class FileDataAccessor {
    db;
    File;

    constructor() {
        this.init();
    }

    init = async () => {
         this.db = db;
         this.File = File;
    }

    getAllFiles = async()=>{
        const files = await File.findAll({})
        // If no notes
        if (!files?.length) {
        return res.status(400).json({ message: 'No files found' })
        }
        // return res.json(users)
        return files;
    }

    addNewFile = async (fileData) => {
        const file = await File.create(fileData)
        if (file) { // Created
            return 'New file created'
        }
    }

    openFile = async (id) => {
        const file = await File.findOne({where:{id:id}})
        // return json(user)
        return file;
    }

    getFilesByParentId = async (id) => {
        const file = await File.findAll({where:{folderId:id}})
        return file;
    }

    updateFile = async (id, name, url, folderId, userId) => {
        const file = await File.update({name, url, folderId, userId},{where:{id:id}})
        if (!file) {
        return res.status(400).json({ message: 'file not found' })
        }
        return `file with ID ${id} updated`
    }

    deleteFile = async (id) => {
        await File.destroy({where: {id: id}});
        return `file with ID ${id} deleted`;
    }
//=====search ex4 page 17======//


    // search = async (req, res) => {
    //     const { cateogry_id, author_id, q } = req.query
    //     const books = await File.findAll({
    //     attributes:['id','name','picture'],
    //     include : [
    //     { model: Author, as: 'author', attributes:['id','name']},
    //     { model: Category, as: 'category', attributes:['id','name']}
    //     ],
    //     where:{cateogry_id:cateogry_id, author_id:author_id, name:q}
    //     })
    //     if (!books?.length) {
    //     return res.status(400).json({ message: 'No books found' })
    //     }
    //     res.json(books)
    //     }
        
}

const fileDataAccessor = new FileDataAccessor();
module.exports = fileDataAccessor;
