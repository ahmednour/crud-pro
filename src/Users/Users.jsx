import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import ViewUser from './__viewUser';
 
function Users() {
  const [users, setUsersList] = useState([])// get all user 
  const [showViewMode , setShowViewMode] = useState(false) // view user modal 
  const [selectedUserId , setSelectedUserId] = useState();
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      if (response) {
        setUsersList(response.data);
      }
    }
    catch (err) {
      console.log(err);
     }
  }

  // actions function 
  const actionTemplate = (rowDate) => {
    return (
      <>
        <button className="btn btn-success" onClick={() => { setShowViewMode(true); setSelectedUserId(rowDate.id)} }><i className="pi pi-eye"></i></button>
        <button className="btn btn-primary" onClick={() => { console.log(rowDate.id) }}><i className="pi pi-file-edit"></i></button>
        <button className="btn btn-danger" onClick={() => { console.log(rowDate.id) }}><i className="pi pi-trash"></i></button>
      </>
    )
  }
  return (
    <div className="users-page">
      <div className="container">
        <h1>Welcome to Crud Operations Crash Course.</h1>
        <h3>We will use React, Primereact, Json-server and Axios</h3>
        <div className="users-list">
          <DataTable value={users} responsiveLayout="scroll">
            <Column field="name" header="Name"></Column>
            <Column field="username" header="Username"></Column>
            <Column field="email" header="Email Address"></Column>
            <Column field="phone" header="Phone Number"></Column>
            <Column field="website" header="Website"></Column>
            <Column header="Actions" body={actionTemplate}></Column>
          </DataTable>
        </div>
        <Dialog header="View User Data"
          visible={showViewMode}
          style={{ width: '50vw' }}
          onHide={() => setShowViewMode(false)}>
          <ViewUser userId={selectedUserId} />
        </Dialog>
      </div>
    </div>
  )
}

export default Users