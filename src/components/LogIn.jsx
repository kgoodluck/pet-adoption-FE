import Form from "react-bootstrap/Form";
export default function LogIn({handleFormChange, loginDetails, isEmail}) {
    return (
        <Form onChange={(e) => {handleFormChange(e)}}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" autoComplete="email" className={ (loginDetails.email && !isEmail(loginDetails.email)) ? 'border-danger' : '' }/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" autoComplete="current-password" />
            </Form.Group>
        </Form>
    );
}
