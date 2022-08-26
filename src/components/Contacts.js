import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getContacts } from "../actions/overview";
import { ListGroup } from "react-bootstrap";
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

const Contacts = () => {
  // const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();
  const contacts = useRef()
  const [successful, setSuccessful] = useState(false);
  const filteredContacts = useRef()
  const [contactsState, setContacts] = useState({});

  useEffect(() => {
    // Update the document title using the browser API
    dispatch(getContacts())
      .then((response) => {
        contacts.current = response;
        setContacts(response);
      })
      .catch(() => {
        setSuccessful(false);
      });
  },[]);

  const filterContacts = (filter) => {
    var j=0;
    var flag = false;
    filteredContacts.current = [];
    for(var i=0;i<16;i++) {
      if(contacts.current[i].type === filter) {
        console.log(contacts.current[i].type);
        filteredContacts.current[j] = contacts.current[i];
        j = j+1;
        flag = true;
      }
    }
    if(flag) {
      setContacts(conta => ({
        ...conta,
        ...filteredContacts
      }));
      console.log(contactsState);
      setSuccessful(true);
      flag = false;
    } else {
      setSuccessful(false);
    }
  }

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <div class="d-flex justify-content-center">
        <ListGroup horizontal>
          <ListGroup.Item action onClick={() =>{filterContacts("Favoriten")}}>Favoriten</ListGroup.Item>
          <ListGroup.Item action onClick={() =>{filterContacts("Veterinaeraemter")}}>Veterinaeraemter</ListGroup.Item>
          <ListGroup.Item action onClick={() =>{filterContacts("Pflanzenschutzstellen")}}>Pflanzenschutzstellen</ListGroup.Item>
          <ListGroup.Item action onClick={() =>{filterContacts("Landesverbände")}}>Landesverbände</ListGroup.Item>
          <ListGroup.Item action onClick={() =>{filterContacts("Bieneninstitute")}}>Bieneninstitute</ListGroup.Item>
          <ListGroup.Item action onClick={() =>{filterContacts("Fachberater")}}>Fachberater</ListGroup.Item>
        </ListGroup>
      </div>
      <div class="d-flex justify-content-center" style={{ paddingTop: "20px" }}>

        <MDBListGroup tag='div'>
          {
            successful ? <div>
              {contactsState.current.map(function (contact, index) {
                return <MDBListGroupItem tag='a' href='#' action aria-current='true' key={index}>
                  <div className='d-flex w-100 justify-content-between'>
                    <h5 className='mb-1'>{contact.name}</h5>
                  </div>
                  <p className='mb-1'>
                    {contact.address}
                  </p>
                  <small>{"Fax : " + contact.fax}</small><br />
                  <small>{"Tel : " + contact.tel}</small><br />
                  <small>{contact.email}</small>
                </MDBListGroupItem>
                  ;
              })}
            </div> : <div><MDBListGroupItem tag='a' href='#' action>
              <div className='d-flex w-100 justify-content-between'>
                <h5 className='mb-1'>In Gefahr: Notartz rufen</h5>
              </div>
              <p className='mb-1'>
                Notruf: 112
              </p>
            </MDBListGroupItem></div>
          }
        </MDBListGroup>
      </div>

    </div>
  )
};
export default Contacts;