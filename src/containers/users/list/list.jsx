import "./list.scss";

import React, { useRef, useState } from "react";

import { EditUser, Table, TableRow } from "../../../components";
import { UsersService } from "../../../services";

export function UserList() {

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const loadData = (page, perPage) => {
    return UsersService.listUsers(page, perPage);
  }

  // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  const tableRef = useRef();

  const editUser = (userId) => {
    setEditingId(userId);
    setEditing(true);
  }

  const onCancel = () => {
    setEditingId(null);
    setEditing(false);
  }

  const onSave = () => {
    onCancel();
    tableRef.current.refreshData();
  }

  return (
    <>
      <Table loadDataFunc={loadData} ref={tableRef}>
        <TableRow width={70} header="" data="avatar" template={<img className="avatar" src="$avatar" alt="$email" />} />
        <TableRow header="Firstname" data="firstname" />
        <TableRow header="Lastname" data="lastname" />
        <TableRow header="Email" data="email" />
        <TableRow width={70} header="" data="id" onClick={editUser} text="Edit" />
      </Table>
      {editing && <EditUser userId={editingId} onCancel={onCancel} onSave={onSave}/>}
    </>
  );
}
