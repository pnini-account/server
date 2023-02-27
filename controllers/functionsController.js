const folderDal = require("../dal/folderDal");
const fileDal = require("../dal/fileDal");
const { Utils } = require("sequelize");
const email = require("../utils/email");
const sendEmail = require("../utils/email");
const Warning = require("../models/warning");
const userController=require("./userController")
const fileController=require("./fileController")

//כניסה לקטגוריה
const enterIntoCategory = async(id) => {
    allFolders = await(folderDal.getFoldersByParentId(id))
    if (!allFolders) {
        return res.status(400).json({ message: 'folder not found' })
    }
    return allFolders;
}
//כניסה לתיקייה 
const enterIntoFolder = async(id) => {
    allFolders = await(folderDal.getFoldersByParentId(id))
    allFiles = await(fileDal.getFilesByParentId(id))
    allFoldersFiles = allFolders.concat(allFiles)
    if (!allFoldersFiles) {
        return res.status(400).json({ message: 'folder or files not found' })
    }
    return allFoldersFiles;
}
//כמה יש בכל תקייה
const countFolder = async(id) => {
    const allFoldersFiles = await enterIntoFolder(id)
    const count = allFoldersFiles.length;
    return count;
}
//שליחה למייל
const sendEmail = (to,subject,massege)=>{
    //טיפול בתוכן המייל - מסמך/ אזהרה
   // email('36213259948@mby.co.il', 'I love you', 'How are you?');
   email(to,subject,massege);
}
const sendEmailOfWarning=(warning)=>{
    const user=warning.user_id;
    const to=userController.getUserById(user).email;
    if(!to){
        return 'not defined email'
    }
    const file=warning.file_id;
    file_name=fileController.openFile(file).name;
    massege=`You have a warning of file: ${file_name}
    ${warning.text}`

//חיפוש קובץ/תיקייהgit 

//הצגת אזהרות בתוקף

//הפעלת נודניק על אזהרה

//להוסיף טבלה דיפולטיבית
const addDefoultTable = async(user) =>{

}

// exports addDefoultTable








