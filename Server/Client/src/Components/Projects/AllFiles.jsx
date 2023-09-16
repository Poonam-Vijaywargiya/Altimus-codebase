

import React, {useState, useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {Header} from '../index';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AllFiles = () => {
    const [rows, setRows]  = useState([]);
    const fileInputRef = useRef(null);
    const [currentRowdata, setCurrentRowData] = useState(null);
    const [showProjectPreviewModal, setShowProjectPreviewModal] = useState(false);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const showProjectPreview = async (id ) => {
    
      const res = await fetch('/api/getprojectById', {
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
              id: id
            })
      });
      const resData = await res.json();
      setData(resData.data.data);
      setOpen(true);
      setShowProjectPreviewModal(true);
    }
    const downloadFile = async (id, data, name) => {
try {
    const response = await axios.get(`/api/download/${id}`, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
    }

    const uploadFile = async (data) => {
        const formData = new FormData();
        formData.append('pdfFile', data);
        formData.append('id', currentRowdata._id);
        formData.append('email', currentRowdata.email);
        try {
          const response = await axios.post('/api/uploadpdf', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          getAllFiles();
        } catch (error) {
          console.error('Error uploading file:', error);
        }
    }
    const handleInputFileClick = (row) =>{
        setCurrentRowData(row)
        fileInputRef.current.click();
    }
    const columns = [
        // { field: '_id', headerName: 'ID',flex: 1, hide: false},
        // { field: 'projectid', headerName: 'Project ID',flex: 1, hide: false},
        {
            field: 'projectname',
            headerName: 'Project Name', flex: 2
        },
        {
          field: 'name',
          headerName: 'File Name', flex: 2
        },
        {
          field: 'email',
          headerName: 'User Email',flex: 2
        },
        {
          field: 'type',
          headerName: 'File Type', flex: 2
        },
        {
            field: "actions",
            headerName: "Download",
            sortable: false,
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (params) => {
              if(params.row.name) {
                return (
                    <div style={{ cursor: "pointer" }}>
                        <FileDownloadIcon index={params.row._id} color="primary" onClick ={() => downloadFile(params.row._id, params.row.data, params.row.name)} />
                     </div>
                );
             }
            }
          },
          {
            field: "action",
            headerName: "Upload Output",
            sortable: false,
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (param) => {
                if(param.row.type == 'project-file') {
                return (
                    <div style={{ cursor: "pointer" }}>
                    <input
                        type="file"
                        accept=".pdf"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        index={param.row._id}
                        onChange={(e) => uploadFile(e.target.files[0])}
                    />
                    <FileUploadIcon index={param.row._id} color="primary" onClick ={() => handleInputFileClick(param.row)} />
                      
                    </div>
                );
             } else return ;
            } 
          },
          {
            field: 'uploadedfile',
            headerName: 'Uploaded File', flex: 2
          },
          {
            field: "preview",
            headerName: "Show Preview",
            sortable: false,
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div style={{ cursor: "pointer" }}>
                        <VisibilityIcon index={params.row._id} color="primary" onClick ={() => showProjectPreview(params.row.projectid)} />
                     </div>
                );
            }
          },
    ];
    const getAllFiles = async() =>{
    const res = await fetch('/api/getallfiles', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        const resData = await res.json();
        setRows(resData.data)
    }
    useEffect(() => {
        getAllFiles();
    },[]);
  return (
    <>
    <Header/>
    <Box sx={{ height: '100%', width: '96vw', mt: '10vh', ml:'2vw', mr:'2vw', mb: '20px', boxSizing:'border-box'}}>
      <DataGrid
        rows={rows}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15]}
        disableRowSelectionOnClick
        style={{ overflowX: 'scroll' }}
      />
    </Box>
    { showProjectPreviewModal && data && <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
      >
        <DialogTitle>{"Project Preview of Project: "} {data.projectName}</DialogTitle>
        <DialogContent>
        <div style={{display:'flex', flexDirection:'column'}}>
        <div style={{ display:'flex', flexDirection:'column', marginTop: '10px',marginBottom: '10px', borderRadius: '20px', border: '1px solid gray', padding: '15px'}}>
        <div style={{marginTop: '20px',marginBottom: '20px'}}>Project Details</div>   
        <TextField variant="standard" value={"Project Name: "+data.projectName} InputProps={{readOnly: true}} />
        <TextField variant="standard"  value={"Project Short Description: "+data.projectShortDesc} InputProps={{readOnly: true}} />
        <TextField variant="standard" value={"Project Description: " + data.projectDesc} InputProps={{readOnly: true}} />
        <TextField variant="standard" value={"Project File: "+data.file} InputProps={{readOnly: true}} />
          </div>
          {data && data.formData && data.formData.map(step => (
           <div style={{ display:'flex', flexDirection:'column', marginTop: '10px',marginBottom: '10px', borderRadius: '20px', border: '1px solid gray', padding: '15px'}}>
                <div style={{marginTop: '20px',marginBottom: '20px'}}>{step.stepLabel}</div>
            <>
            {Object.keys(step.data).map(value =>(
                <TextField  label={value} variant="standard" value={step.data[value]} InputProps={{ readOnly: true }} />
            ))}
            </>
            </div>
          ))}
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>}
    </>
  );
}

export default AllFiles