import axios from 'axios';
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import { getAllUsersApi } from '../api/usersApi';
import PetsTable from '../components/admin_components/PetsTable';
import UsersTable from '../components/admin_components/UsersTable';
import { usePetsContext } from '../context/PetsContext';
import "./AdminPage.css";
import AdminPopupModal from '../components/admin_components/AdminPopupModal';

export default function AdminPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);

    const { petsArray, setPetsArray } = usePetsContext();

    const [modalShow, setModalShow] = useState(false);

    function handleAddPetClick() {
        setModalShow(true);
    }

    function handleModalClose() {
        setModalShow(false);
    }

    async function getUsersFromDB() {
        try {
            const res = await getAllUsersApi();
            setAllUsers(res.data);
            setIsLoading(false);
            return;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUsersFromDB();
    }, [])

    useEffect(() => {
        console.log('d');
        setPetsArray(petsArray);
    }, [petsArray]);
    

  return (
      <div className='wrapper-admin'>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
            <Col sm={3}>
            <Nav variant="pills" className="flex-column">
                <Nav.Item>
                <Nav.Link eventKey="first">Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="second">
                    <div className='d-flex justify-content-between'>
                        <span>Pets</span>
                        <Button variant="warning" className='small-button' onClick={handleAddPetClick}>+</Button>
                    </div>
                </Nav.Link>
                </Nav.Item>
            </Nav>
            </Col>
            <Col sm={9}>
            <Tab.Content>
                <Tab.Pane eventKey="first">
                    <UsersTable userList={allUsers} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                    <PetsTable petsList={petsArray} />
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Row>
        </Tab.Container>
        <AdminPopupModal show={modalShow} onHide={handleModalClose} mode={"addPet"} />
    </div>
  )
}
