import React ,{useEffect} from 'react';
import { Button, Card,Badge,Accordion } from 'react-bootstrap';
import { Link ,useNavigate} from 'react-router-dom';
import MainScreen from '../../MainScreen';
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from '../../../actions/notesActions';
import Loading from '../../Loading';
import ErrorMessage from '../../ErrorMessage';

const MyNotes = ({search}) => {

  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);

  const {loading,notes,error} = noteList;

  const userLogin = useSelector((state) => state.userLogin);

  const {userInfo} = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success:successCreate} = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate} = noteUpdate;


  const noteDelete  = useSelector((state) => state.noteDelete);

  const {loading:loadingDelete,error:errorDelete,success:successDelete} = noteDelete;

  const deleteHandler = (id)=>{
    if(window.confirm('Are you sure?')){
      dispatch(deleteNoteAction(id));

    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listNotes());
    if(!userInfo){
      navigate('/');
    }

  
    
  }, [dispatch,successCreate,navigate,userInfo,successUpdate,successDelete]);
  



  return (
    <MainScreen title={`Welcome ${userInfo.name}..`}>
    <Link to="/createnote" >
        <Button style={{marginLeft:"10",marginBottom:"6"} } size="lg"  >Create new note</Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
      {loadingDelete && <Loading/>}
        {notes?.reverse().filter(filteredNotes =>(
          filteredNotes.title.toLowerCase().includes(search.toLowerCase())
        )).map((note)=>(
            <Accordion defaultActiveKey={["0"]} key={note._id}>
          <Accordion.Item eventkey="0">
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Button as={Card.Text} variant="link">
                    {note.title}
                  </Accordion.Button>
                </span>
                <div>
                  <Button>
                  <Link to={`/note/${note._id}`}>
                  Edit
                  </Link>
                  </Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() =>deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse>
                <Card.Body>
                  <h4>
                    <Badge bg="success" text="light">
                      Category - {note.category}{" "}
                    </Badge>
                  </h4>

                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on{""}
                      <cite title="Source title">
                        {note.createdAt.substring(0,10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion.Item>
        </Accordion>
            
          ))
        }
  </MainScreen>
  );
}

export default MyNotes;
