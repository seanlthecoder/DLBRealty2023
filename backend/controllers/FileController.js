const FileModels = require("../models/File.js");
const mongoose = require("mongoose");


exports.upload_file = async (req, res) => {
    const {file, id} = req;
    const newFile = new FileModels.File({
        _id: new mongoose.Types.ObjectId(),
        path: file.path,
        user: id
    });
    try {
        await newFile.save();
        console.log(newFile);
        res.send(newFile);
    }catch(err) {
        res.status(400).send({error: err.toString()});
    }
}

exports.get_files = async (req, res) => {
    const {id} = req;
    const File = FileModels.File;
    try {
        const files = await File.find({user: id});
        File.deleteMany({});
        files.forEach(file => {
            file.path =  file.path.split("/")[1].split('-').slice(1).join('');
        });
        res.send(files);
    }catch(err) {
        res.status(400).send({error: err.toString()});
    }

}

exports.get_file = async (req, res) => {
    const {id} = req.params;
    const File = FileModels.File;
    try  {
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).send({error: "File not found"});
        }
        const name = file.path.split("/")[1].split('-').slice(1).join('');
        res.download(file.path,name);
    }catch(err) {
        res.status(400).send({error: err.toString()});
    }

}
