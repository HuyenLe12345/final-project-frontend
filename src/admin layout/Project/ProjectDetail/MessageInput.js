import { Row, Col } from "react-bootstrap";
import UserIcon from "../../../Shared/UserIcon";
import FormGroup from "../../../FormGroup/FormGroup";

const MessageInput = ({ avatar, username, rows, parentId, idUser }) => {
  return (
    <fieldset>
      <Row className="type-comment justify-content-start mb-0 ">
        <Col className="align-self-start" md={1}>
          <UserIcon avatar={avatar} username={username} href="#" />
        </Col>
        <Col xs={12} md={parentId ? 8 : 10} className="message">
          <FormGroup
            type="textarea"
            id="comment"
            placeholder="Your message"
            name="content"
            rows={rows}
            className="form-control"
            required
          />
          <input type="hidden" name="senderId" value={idUser} />
          {parentId && <input type="hidden" name="parentId" value={parentId} />}
        </Col>
        {parentId && (
          <button
            type="submit"
            className="btn btn-success align-self-start col-md-1"
          >
            Gửi
          </button>
        )}
      </Row>
    </fieldset>
  );
};
export default MessageInput;
