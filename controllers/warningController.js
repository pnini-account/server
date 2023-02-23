const warningDal = require("../dal/warningDal");

class warningController {

    getAllWarnings = async (req, res) => {
        res.send(await warningDal.getAllWarnings());
    }

    addNewWarning = async(req, res) => {
        const warningData = req.query
        // Confirm data
        if (!warningData) {
        return res.status(400).json({ message: 'All fields are required'})
        }
       res.send(await warningDal.addNewWarning(warningData));
    }

    getWarningByWarningID = async(req, res) => {
       const id = req.params.id;
       res.json(await warningDal.getWarningById(id));
    }

    updateWarning = async(req, res) => {
        const id  = req.params.id;
        const { userid, fileid, text, snooze } = req.query   
        // Confirm data
        if (!id) {
        return res.status(400).json({ message: 'Id fields are required'
        })
        }
        res.send(await warningDal.updateWarning(id , userid, fileid, text, snooze));  
    }

    deleteWarning = async(req, res) => {
        const id  = req.params.id;
        // Confirm data
        if (!id) {
        return res.status(400).json({ message: 'warning ID required' })
        }
        // var id = req.params.id;
        res.send(await warningDal.deleteWarning(id)); 
    }
}

const WarningController = new warningController();
module.exports = WarningController;
