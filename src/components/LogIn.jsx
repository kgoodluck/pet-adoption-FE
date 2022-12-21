import Form from "react-bootstrap/Form";
export default function LogIn() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" autoComplete="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" autoComplete="current-password" />
            </Form.Group>
            {/* <div className='d-flex flex-column align-items-center'>
            Already a member?
            <a href="#" onClick={(e) => {handleSetPopupModal(e)}}>Log in</a>
            </div>
            <div className='text-end'></div> */}
        </Form>
    );
}
