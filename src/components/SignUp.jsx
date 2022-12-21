import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function SignUp(handleSetPopupModal) {
  return (
    
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" placeholder="First name" autoComplete="given-name"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control type="text" placeholder="Last name" autoComplete="family-name" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" autoComplete="email" />
        </Form.Group>
        </Row>

      <Form.Group className="mb-3" controlId="formGridPhone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="tel" placeholder="" autoComplete="tel" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" autoComplete="new-password" />
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" autoComplete="new-password" />
        </Form.Group>
      </Row>
      {/* <div className='d-flex flex-column align-items-center'>
            Already a member?
            <a href="#" onClick={(e) => {handleSetPopupModal(e)}}>Log in</a>
        </div>
      <div className='text-end'>
      <Button variant="success" type="submit">
        Sign up
      </Button>
      </div> */}
    </Form>
        
    
  )
}
