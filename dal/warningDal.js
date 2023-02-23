
const db = require('../models/index')
const Warning = db.warning

class WarningDataAccessor {
    db;
    Warning;

    constructor() {
        this.init();
    }

    init = async () => {
         this.db = db;
         this.Warning = Warning;
    }

    getAllWarnings = async () => {
        // Get all notes from DB
        const warnings = await Warning.findAll({})
        // If no notes
        if (!warnings?.length) {
            return res.status(400).json({ message: 'No warnings found' })
        }
        return warnings;
    }

    addNewWarning = async (WarningData) => {
        const warning = await Warning.create(warningData)
        if (warning) { // Created
            return 'New warning created'
        }
    }
 
    getWarningById = async (id) => {
        const warning = await Warning.findOne({where:{id:id}})
        // return json(user)
        return warning;
    }

    updateWarning = async (id , userid, fileid, text, snooze) => {
        const warning = await Warning.update({ userid, fileid, text, snooze},{where:{id:id}})
        if (!warning) {
        return res.status(400).json({ message: 'warning not found' })
        }
        return `warning with ID ${id} updated`
    }

    deleteWarning = async (id) => {
        await Warning.destroy({where: {id: id}});
        return `warning with ID ${id} deleted`
    }
}

const warningDataAccessor = new WarningDataAccessor();
module.exports = warningDataAccessor;
