const folderDal = require("../dal/folderDal");
const fileDal = require("../dal/fileDal");
const { Utils } = require("sequelize");
const email = require("../utils/email");
const Category = require("../models/category");
const User = require("../models/user");
const { category } = require("../models");
//const sendEmail = require("../utils/email");
const categoryControl = require("../controllers/categoryController")
const warningControl = require("../controllers/warningController");
const Warning = require("../models/warning");

//כניסה לקטגוריה
const enterIntoCategory = async (id) => {
    allFolders = await (folderDal.getFoldersByParentId(id))
    if (!allFolders) {
        return res.status(400).json({ message: 'folder not found' })
    }
    return allFolders;
}
//כניסה לתיקייה 
const enterIntoFolder = async (id) => {
    allFolders = await (folderDal.getFoldersByParentId(id))
    allFiles = await (fileDal.getFilesByParentId(id))
    allFoldersFiles = allFolders.concat(allFiles)
    if (!allFoldersFiles) {
        return res.status(400).json({ message: 'folder or files not found' })
    }
    return allFoldersFiles;
}
//כמה יש בכל תקייה
const countFolder = async (id) => {
    const allFoldersFiles = await enterIntoFolder(id)
    const count = allFoldersFiles.length;
    return count;
}
//שליחה למייל
const sendEmail = (to, subject, massege) => {
    //טיפול בתוכן המייל - מסמך/ אזהרה
    // email('36213259948@mby.co.il', 'I love you', 'How are you?');
    email(to, subject, massege);
}

//  לפי Id הצגת כל האזהרות 
const warningsById = async (user) => {
    return await Warning.findAll({
        where: { user_id: user.id }
    })
}

//הצגת אזהרות בתוקף
const warningsInValidity = async (user) => {
    const warningById = await warningsById(user);
    const datetime = new Date();
    date = datetime.toISOString().slice(0, 10);
    const result = warningById.filter(w => {w.date >= date && w.is_read==false});
    return result;
}

//הפעלת נודניק על אזהרה

//הוספת טבלה דיפולטיבית
const addDefaultTable = async (user) => {
    const id = user.id;
    const defaultTable = await Category.findAll({ where: { default: true } })
    //foreach on an object?
    defaultTable.forEach(cat => {
        cat.userId = id;
        categoryControl.addNewCategory(cat);
    });
}

module.exports = addDefaultTable;








