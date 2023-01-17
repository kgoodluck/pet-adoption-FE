import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import UserRow from './UserRow';

export default function UsersTable({ userList }) {
  return (
    <>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th className="col-1">#</th>
                <th className="col-2">First Name</th>
                <th className="col-3">Last Name</th>
                <th className="col-4">Role</th>
                </tr>
            </thead>
            <tbody>
                { userList && userList.length !== 0 &&
                    
                    userList.map(user => {
                    return <UserRow key={user.id} user={user} />
                })
                }
            </tbody>
        </Table>
    </>
  )
}
