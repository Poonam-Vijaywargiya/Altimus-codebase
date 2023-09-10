const express = require('express');
const cors = require('cors')
const app  = express();
const path = require('path');
const mongoose =  require('mongoose');
const User  = require('./models/user.model');
const Projects  = require('./models/projects.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs');
const File = require('./models/File.model');
const nodemailer = require('nodemailer');
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, './Client/dist')))
mongoose.connect('mongodb+srv://altimusgrg:oxRavth6B7b4RcfA@cluster0.ohvhc70.mongodb.net/upwork-project')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'altimus.grg@gmail.com', // Your Gmail email address
    pass: 'aaghaocthavjejxd',        // Your Gmail password or app-specific password
  },
});
app.get('*', function(req, res) {
    // console.log(__dirname , ,'dirname');
    fs.readdir(__dirname, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file); 
        });
    });
    res.sendFile('./Client/dist/index.html', { root: __dirname }, function(err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
// app.get('*', function(req, res){
//     console.log(path.join(__dirname, "../Client/dist/index.html"))
//    res.sendFile(
//         path.join(__dirname, "../Client/dist/index.html"), 
//         function(err) {
//             if(err) {
//                 res.status(500).send(err)
//             }
//         }
//     )
// })
// app.get('*', function(req, res) {
//     res.sendFile('index.html', { root: __dirname }, function(err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     });
//   });


app.post('/api/signup', async (req,res) =>{
    try{
        const newPwd = await bcrypt.hash(req.body.password, 10)
        await User.create({
            email: req.body.email,
            password: newPwd,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        res.json({status: 'ok'})
    } catch(err) {
        res.json({status: 'error', error: err})
    }
})

app.post('/api/login', async (req,res) =>{
    try {
        const userDetails = {email: req.body.email};
        const user  = await User.findOne({email: req.body.email});
        const isPwdValid = await bcrypt.compare(req.body.password, user.password)
        if(isPwdValid) {
            const token= jwt.sign({email: user.email,firstName: user.firstname},'secret123')
            userDetails.token = token;
            res.json({status: 'ok', user: userDetails})
        } else {
            res.json({status: 'error', user: false})
        }
    } catch(err) {
        res.json({status: 'error', error: err})
    } 
});

app.post('/api/projects', async (req,res) =>{
    try{
        const projectsData = await Projects.find({ email: req.body.email});
        res.json({status: 'ok', data: projectsData})
    } catch(err) {
        res.json({status: 'error', error: err})
    }
})

app.post('/api/addnewproject', async (req,res) =>{
    try{
        const project =  await Projects.create({ data: req.body.userData, email: req.body.email });
        res.json({status: 'ok', projectid: project._id, name: project.data.projectName});
        // Email data
        const mailOptions = {
            from: 'altimus.grg@gmail.com',
            to: 'altimus.grg@gmail.com',
            subject: 'New Project Created in Altimus',
            text: `${req.body.email} has created a new project, please check the Files section to see that information.`,
        };
        
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.error('Error sending email:', error);
            } else {
            console.log('Email sent:', info.response);
            }
        });
    } catch(err) {
        res.json({status: 'error', error: err})
    }
})

app.post('/api/getprojectById', async (req,res) =>{
    try{
        const projectsData = await Projects.findOne({_id: req.body.id});
        res.json({status: 'ok', data: projectsData})
    } catch(err) {
        res.json({status: 'error', error: err})
    }
})


app.post('/api/upload', upload.single('excelFile'), async (req, res) => {
    const file = req.file;
    const email = req.body.email;
    const type = req.body.type;
    const projectid = req.body.projectid;
    const projectname = req.body.projectname;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    
    // // Parse the Excel file and save it to MongoDB
    // const workbook = XLSX.read(file.buffer);
    // const sheet = workbook.Sheets[workbook.SheetNames[0]];
    // const fileData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    const newFile = new File({
      name: file.originalname,
      data: file.buffer,
      email: email,
      type: type,
      projectid:projectid,
      projectname:projectname, 
      uploadedfile:'',
      pdfdata: ''
    });
    try {
        await newFile.save();
        res.status(201).send('File uploaded successfully.');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/getallfiles', async (req,res) =>{
    try{
        const filesData = await File.find().select({ name: 1,projectname: 1, email: 1, type: 1,uploadedfile: 1});;
        res.json({status: 'ok', data: filesData})
    } catch(err) {
        res.json({status: 'error', error: err})
    }  
})

app.get('/api/download/:id', async (req, res) => {
    const fileId = req.params.id;
    try {
        const file = await File.findOne({_id: fileId});
        if (!file) {
            return res.status(404).send('File not found.');
        }
        res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(file.data);
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).send('Internal Server Error');
    }
});
  

app.post('/api/uploadpdf', upload.single('pdfFile'), async (req, res) => {
    const file = req.file;
    const userEmail = req.body.email;
    if (!file) {
        return res.status(404).send('File not found.');
    }
    try{
        await File.updateOne({_id: req.body.id}, {uploadedfile:file.originalname, pdfdata: file.buffer});
        res.status(201).send('File uploaded successfully.');
        const mailOptions = {
            from: 'altimus.grg@gmail.com',
            to: userEmail,
            subject: 'Altimus output is generated',
            text: `Please check the Altimus tool to get the generated output`,
        };
        
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.error('Error sending email:', error);
            } else {
            console.log('Email sent:', info.response);
            }
        });
    } catch {
        console.error('Error uploading pdf file:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/downloadOutput/:id', async (req, res) => {
    const projectId = req.params.id;
    try {
        const file = await File.findOne({projectid: projectId, type: 'project-file'});
        if (!file) {
            return res.status(404).send('File not found.');
        }
        res.setHeader('Content-Disposition', `attachment; filename=${file.uploadedfile}`);
        res.setHeader('Content-Type', 'application/pdf');
        res.status(200).send(file.pdfdata);
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, ()=>{
    console.log('server started at port '+ PORT)
})




