const path = require('path');
const express = require('express');
const multer = require('multer');
const File = require('../model/file');
const Router = express.Router();
const Professor = require('../model/professors');
const Assignment=require('../model/assignments');
const Solution=require('../model/solutions');
const app = express();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/api/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      const { title,code } = req.body;
      const { path, mimetype } = req.file;
      const assi = await Assignment.findOne({code:code}).exec();
      if(assi!==null)
     { assi.assignment.push({
          title,
          file_path: path,
          file_mimetype: mimetype
          
      });
      await assi.save();
    }
    else
    {
      const assignment=new Assignment({
             code,
             assignment:{
              title,
              file_path: path,
              file_mimetype: mimetype
            }
      })
      await assignment.save();
    }

      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.post(
  '/api/uploadSolution',
  upload.single('file'),
  async (req, res) => {
    try {
      const {regCode,assiCode } = req.body;
      const { path, mimetype } = req.file;
     
      var regexp = new RegExp(assiCode);
      const soln = await Solution.find({ assiCode: { $regex:regexp } });
     
   
      if(soln.length)
     {
      soln.forEach(async function(sol) {
        sol.solution.push({
              regCode,
              file_path: path,
              file_mimetype: mimetype
              
          });
      await sol.save();
      });
    }
    else
    {
      const solution=new Solution({
             assiCode,
             solution:{
              regCode,
              file_path: path,
              file_mimetype: mimetype
            }
      })
      await solution.save();
    }

      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);


Router.get('/api/getAllFiles', async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

Router.get(`/api/download/:assiCode/:regCode`, async (req, res) => {
  try {
     
    const assiCode=req.params.assiCode;
    const regCode=req.params.regCode;
    console.log(assiCode+regCode);

    const soln = await Solution.findOne({assiCode});
    const file=soln.solution.find(obj=>obj.regCode==regCode);
   
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

Router.get(`/api/downloadAssignment/:code/:assiId`, async (req, res) => {
  try {
    const assignments = await Assignment.findOne({code:req.params.code});
    console.log(assignments.assignment);
    const file=assignments.assignment.find(obj=>obj._id==req.params.assiId);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

Router.get(`/api/viewSubmissions/:id`, async (req, res) => {
  try {
    const soln = await Solution.findOne({assiCode:req.params.id});
    var solutionsMap=[];
    soln.solution.forEach(function(soln) {
      solutionsMap.push(soln)
        
    });
    res.send(solutionsMap);
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

Router.get(`/api/getAllAssignments/:id`, async (req, res) => {
  try {
    var regexp = new RegExp(req.params.id);
    const assignments = await Assignment.find({ code: { $regex:regexp } });
    var assignmentList=[];
   

    assignments.forEach(function(assign) {
      assign.assignment.forEach(function(assi){
        assignmentList.push({
                _id:assi._id,
                year:assign.code.substr(0,4),
                course:assign.code.substr(4,2),
                branch:assign.code.substr(6,3),
                title:assi.title,
                file_path:assi.file_path,
                file_mimetype:assi.file_mimetype
        });
      })
    });
  
    res.send(assignmentList);
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});
module.exports = Router;
