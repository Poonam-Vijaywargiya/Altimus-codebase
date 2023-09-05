

import React, {useState, useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {Header} from '../../Components/index';
import axios from 'axios';
const AllFiles = () => {
    const [rows, setRows]  = useState([]);
    const fileInputRef = useRef(null);
    const [currentRowdata, setCurrentRowData] = useState(null)
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
        { field: '_id', headerName: 'ID',flex: 2},
        {
            field: 'projectname',
            headerName: 'Project Name', flex: 1
        },
        {
          field: 'name',
          headerName: 'File Name', flex: 1
        },
        {
          field: 'email',
          headerName: 'User Email',flex: 1
        },
        {
          field: 'type',
          headerName: 'File Type', flex: 1
        },
        {
            field: "actions",
            headerName: "Download",
            sortable: false,
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div style={{ cursor: "pointer" }}>
                        <FileDownloadIcon index={params.row._id} color="primary" onClick ={() => downloadFile(params.row._id, params.row.data, params.row.name)} />
                     </div>
                );
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
            headerName: 'Uploaded File', flex: 1
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
        <p style={{display:'flex', justifyContent:'center', marginBottom: '10px'}}>All Files: </p>
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
    </Box></>
  );
}

export default AllFiles