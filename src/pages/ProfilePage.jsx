import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from 'react-bootstrap/Button';
import "./ProfilePage.css";
import { useAuthContext } from "../context/AuthContext";
import { editUserProfileApi, getUserDataApi } from "../api/usersApi";
import { useEffect, useState } from "react";

export default function ProfilePage() {

    const { currentUser, setCurrentUser } = useAuthContext();

    const [currentUserProfile, setCurrentUserProfile] = useState({});
    const [newUserProfile, setNewUserProfile] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [receivedError, setReceivedError] = useState('');

    useEffect(() => {
      async function loadProfile() {
        const res =  await getUserDataApi(currentUser.id);
        setCurrentUserProfile(res.data);
        setNewUserProfile(res.data);
        setIsLoading(false);
      }
      loadProfile();
    }, []);

    useEffect(function checkFormValidity() {
      const areFieldsCorrect = isEmail(newUserProfile.email) && newUserProfile.firstName && newUserProfile.lastName && newUserProfile.phone;
      const isPasswordCorrect = isChangingPassword ? newUserProfile.newPassword.split('').length >= 4 : true;

      if(areFieldsCorrect && isPasswordCorrect && JSON.stringify(currentUserProfile) !== JSON.stringify(newUserProfile)) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }, [newUserProfile, currentUserProfile])

    function handleFormChange() {
      setReceivedError('');
    }

    function handleChangePasswordToggle() {
      setIsChangingPassword(!isChangingPassword);
      setNewUserProfile({...newUserProfile, password: "", newPassword: "", isChangingPassword: !isChangingPassword});
      setCurrentUserProfile({...currentUserProfile, password: "", newPassword: "", isChangingPassword: !isChangingPassword});
    }

    const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    async function handleSaveChanges() {
      const res = await editUserProfileApi(newUserProfile);
      if(res.status === 200) {
        setCurrentUserProfile(newUserProfile);
        setCurrentUser({...currentUser, firstName: newUserProfile.firstName, lastName: newUserProfile.lastName});
        return;
      } else {
        setReceivedError(res.response.data);
        console.log('res.response.message', res.response.data);
      }
    }

    return (
      <>
      { !isLoading &&
        <div className="wrapper">
            <Card className="user-profile-card text-center">
                <Card.Header>Profile settings</Card.Header>
                <Card.Body>
                    <Form
                        onChange={handleFormChange}
                    >
                        <Row className="mb-3">
                            <InputGroup as={Col} className="mb-3">
                                <InputGroup.Text id="firstName">
                                    First name
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="firstName"
                                    value={newUserProfile.firstName}
                                    onChange={(e) => {setNewUserProfile({...newUserProfile, firstName: e.target.value})}}
                                    className={ !newUserProfile.firstName ? 'border-danger' : '' }
                                />
                            </InputGroup>
                            <InputGroup as={Col} className="mb-3">
                                <InputGroup.Text id="lastName">
                                    Last name
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="lastName"
                                    value={newUserProfile.lastName}
                                    onChange={(e) => {setNewUserProfile({...newUserProfile, lastName: e.target.value})}}
                                    className={ !newUserProfile.lastName ? 'border-danger' : '' }
                                />
                            </InputGroup>

                            {/* <Form.Group as={Col} controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" placeholder="First name" autoComplete="given-name"/>
        </Form.Group>

        <Form.Group as={Col} controlId="lastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control type="text" placeholder="Last name" autoComplete="family-name" />
        </Form.Group> */}
                        </Row>
                        <Row className="mb-3">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="email">
                                    Email
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="email"
                                    value={newUserProfile.email}
                                    onChange={(e) => {setNewUserProfile({...newUserProfile, email: e.target.value})}}
                                    className={ (!newUserProfile.email || !isEmail(newUserProfile.email)) ? 'border-danger' : '' }
                                />
                            </InputGroup>

                            {/* <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" autoComplete="email" className={ (signUpDetails.email && !isEmail(signUpDetails.email)) ? 'border-danger' : '' } />
        </Form.Group> */}
                        </Row>

                        <Row className="mb-3">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="phone">
                                    Phone
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="phone"
                                    value={newUserProfile.phone}
                                    onChange={(e) => {setNewUserProfile({...newUserProfile, phone: e.target.value})}}
                                    className={ !newUserProfile.phone ? 'border-danger' : '' }
                                />
                            </InputGroup>
                        </Row>

                        {/* <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="tel" placeholder="" autoComplete="tel" />
      </Form.Group> */}
                        <Row className="mb-3">
                            <InputGroup>
                                <InputGroup.Text id="bio">Bio</InputGroup.Text>
                                <Form.Control
                                    as="textarea"
                                    aria-label="With textarea"
                                    aria-describedby="bio"
                                    value={newUserProfile.bio != null ? newUserProfile.bio : ""}
                                    onChange={(e) => {setNewUserProfile({...newUserProfile, bio: e.target.value})}}
                                />
                            </InputGroup>
                        </Row>

                        {/* <InputGroup.Text id="changePassword">Change password</InputGroup.Text> */}
                        <Form.Check className="mt-5" reverse type="switch" id="custom-switch" label="Change password" onChange={handleChangePasswordToggle} />

                        <Row>
                            <InputGroup as={Col}>
                                <InputGroup.Text id="password">
                                    Old password
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="password"
                                    type="password"
                                    value={newUserProfile.password}
                                    className={ (isChangingPassword && newUserProfile.password.length < 4) ? 'border-danger' : '' }
                                    onChange={(e) => {setNewUserProfile({...newUserProfile, password: e.target.value})}}
                                    disabled={!isChangingPassword}
                                />
                            </InputGroup>

                            <InputGroup as={Col}>
                                <InputGroup.Text id="newPassword">
                                    New Password
                                </InputGroup.Text>
                                <Form.Control
                                    aria-label="Default"
                                    aria-describedby="newPassword"
                                    type="password"
                                    value={newUserProfile.newPassword}
                                    onChange={(e) => {setNewUserProfile({...newUserProfile, newPassword: e.target.value})}}
                                    className={ (isChangingPassword && newUserProfile.newPassword.length < 4) ? 'border-danger' : '' }
                                    disabled={!isChangingPassword}
                                />
                            </InputGroup>

                            {/* <Form.Group as={Col} className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" autoComplete="new-password" />
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="rePassword">
            <Form.Label className={ (signUpDetails.rePassword && signUpDetails.password !== signUpDetails.rePassword) ? 'text-danger' : '' }>Repeat password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" autoComplete="new-password" className={ (signUpDetails.rePassword && signUpDetails.password !== signUpDetails.rePassword) ? 'border-danger' : '' } />
        </Form.Group> */}
                        </Row>
                    </Form>
                    {/* { isChangingPassword && newUserProfile.newPassword.split('').length < 4 ? <p className="text-danger">Can't be less than 4</p> : ""} */}
                    <p className="text-danger m-1" style={{userSelect: "none"}}>{receivedError !== '' ? receivedError : '\u00A0' }</p>
                    <Button variant="success" onClick={handleSaveChanges} disabled={!isFormValid} title={JSON.stringify(currentUserProfile) === JSON.stringify(newUserProfile) ? "You didn't change anything" : "Save"}>
            Save
          </Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                    Joined us on {currentUserProfile.joinedAt.split('T')[0]} at {currentUserProfile.joinedAt.split('T')[1].slice(0, 8)}.
                </Card.Footer>
            </Card>
        </div>
      }
      </>
    );
}
