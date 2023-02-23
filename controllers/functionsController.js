const folderDal = require("../dal/folderDal");
const fileDal = require("../dal/fileDal");
const { Utils } = require("sequelize");
const email = require("../utils/email");
const sendEmail = require("../utils/email");

//כניסה לקטגוריה
enterIntoCategory = async(id) => {
    allFolders = await(folderDal.getFoldersByParentId(id))
    if (!allFolders) {
        return res.status(400).json({ message: 'folder not found' })
    }
    return allFolders;
}
//כניסה לתיקייה 
enterIntoFolder = async(id) => {
    allFolders = await(folderDal.getFoldersByParentId(id))
    allFiles = await(fileDal.getFilesByParentId(id))
    allFoldersFiles = allFolders.concat(allFiles)
    if (!allFoldersFiles) {
        return res.status(400).json({ message: 'folder or files not found' })
    }
    return allFoldersFiles;
}
//כמה יש בכל תקייה
countFolder = async(id) => {
    const allFoldersFiles = await enterIntoFolder(id)
    const count = allFoldersFiles.length;
    return count;
}
//שליחה למייל
sendEmail = (to,subject,massege)=>{
   // email('36213259948@mby.co.il', 'I love you', 'How are you?');
   email(to,subject,massege);
}
//

// email()
