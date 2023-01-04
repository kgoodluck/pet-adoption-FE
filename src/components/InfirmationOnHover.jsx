import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function InfirmationOnHover({ placement, cover, text }) {
  return (
        <OverlayTrigger
          placement={placement}
          overlay={
            <Tooltip id={`tooltip-${placement}`}>
              {text}
            </Tooltip>
          }
        >
          <Button variant="link" size="sm" style={{textDecoration: 'none'}}>&#9432;</Button>
        </OverlayTrigger>
  );
}

export default InfirmationOnHover;