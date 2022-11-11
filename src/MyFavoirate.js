import { useEffect, useState } from "react";
import axios from "axios";

import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBFooter,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const MyFavoirate = (props) => {
  const [fav, setFav] = useState({});

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:8000/api/all-fav/",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
        setFav(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function removeFave(id) {
    var config = {
      method: "delete",
      url: `http://127.0.0.1:8000/api/remove-fav/${id}`,
      headers: {
        Cookie:
          "XSRF-TOKEN=eyJpdiI6IjJ0Y25QZlRuVWlFaEtUdGFaL2Uyc1E9PSIsInZhbHVlIjoiR2ZnZ3czcTh2eTFFS2xleWFHQU9FOGxqZmFwNVd6bTdnWGRUVXFXeU40VC9LWXFsNnp1UkZzd1ZyKy9uUzByVENtWGxjZitzcXRybFRWOFFET0lQOTVjNDFVVGE4VTlGZDlaY1dDS3UxNGZFUU5SQnk4SHpTY1hQVkx5NDhNSVMiLCJtYWMiOiI3Njk3ZmMwNjk0NGMwMDJkZDE4OTEyMzNkMmUwZmRlODZlZWI0MDUzOWM3MTFhMDc4OThiNmVkZmFhYTI5NGIwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IjRaMWdETTFMRjNrV2p0M2tDWVlxaEE9PSIsInZhbHVlIjoiUUpNdzM4bWNvNG01Y1o0Wlo0NTY4bWNvYlBUREV1ak9WS1J3Tm1IUFpUOW8rdkRla0JxZ0ZobEVLTE5GL2YrcmphOFExbHpKZWM3ZzNydC9JRFQycDZoZGhUTGFkb2NGQnlrSXFLWUtjYmRMdE1kQWxFWFc0QzZ0N25rem9vMEkiLCJtYWMiOiIxNWUwZTgyODZkNTRjM2YxYWYyY2ViNDY2NTlhMzlmYjE1ZjAyMGY5NmVjNjkwYTg5ZTE4YjM1OWFjNDhmMzI4IiwidGFnIjoiIn0%3D",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // SHOW DATA IN THE MODAL=============

  const [name, setName] = useState("");
  const [varyingModal, setVaryingModal] = useState(false);
  const [time, setTime] = useState("");
  const [recipeId, setRecipeId] = useState('');

  function handelShowData(id) {
    var qs = require("qs");
    var data = qs.stringify({});
    var config = {
      method: "get",
      url: `http://127.0.0.1:8000/api/recipes/${id}`,
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.data[0].title);
        setName(response.data.data[0].title);
        setTime(response.data.data[0].readyInMinutes);
        setRecipeId(response.data.data[0].id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // END OF SHOW DATA IN THE MODAL=========




  // UPDATE DATA ==========================
    function updatForm(id){

        var data = JSON.stringify({
            title: name,
            readyInMinutes: time
        });
        
        var config = {
            method: "put",
            url: `http://127.0.0.1:8000/api/recipes/${id}`,
            headers: {
                "Content-Type": "application/json",
                // Cookie:
                // "XSRF-TOKEN=eyJpdiI6InZkZzdnYUo1WmtHZERsSmRxRWphZHc9PSIsInZhbHVlIjoiWFI5b0g4cDNINHdaYjZzNHpEczl4eXlTd1pVN2hsM0IrZ0tQSWJlVTMzMlR1MkU2WVdFdFhseHlpMFFNNlBnQzMxODFkSVBRendXL0pvTnExbVVVSUJid3p5OU1Qb2Ewak5hQ1dJV0ZzbHJUVXpnM0o3RFhQNk1JTVRmdEI5cWgiLCJtYWMiOiI0ZDJkZGRhODdkNzVmMzM4OTljNzFjYzEwNDljZjVjMGYxZDhjZmFlNjNmZjIzNTBlNTAwOWE1MTljZDFiNWVkIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkU5RVpZRWNIZUpSeWVUb3UrNmxjWVE9PSIsInZhbHVlIjoicnJaajhybW1jeG9ma1NsUTN2ZFJ2OUdMNkJNYTBTOThQbmFVU3JLb0lLZUp1S29zVDJTUEk2MDRrTTd5enIraXdMRVFwblhsR1k1VmNENGM1RFdLZGNsRVp0WFIvU3FtRHBHdkFIaGdRZ29EaSt0OUE0V0tjTWo5SlBKZE84UXgiLCJtYWMiOiJkMjZjNDQwNWI5ZGU3YjM2OGJjYTM4NjJkYTc3ODIxNDMyNTU1MTRjZjEyZTRlYWRmZWY1YTcyZDE1MmY4ZTg3IiwidGFnIjoiIn0%3D",
            },
            data: data,
        };
        
        axios(config)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

  return (
    <>
      {/* <MDBBtn onClick={() => {setName(); setVaryingModal(!varyingModal); setTime(); }}> Update Recipe</MDBBtn> */}

      <MDBModal show={varyingModal} setShow={setVaryingModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Upadate Recipe</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVaryingModal(!varyingModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <div className="mb-3">
                  {varyingModal && (
                    <MDBInput
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      labelClass="col-form-label"
                      label="Recipe Name:"
                    />
                  )}
                </div>
                <div className="mb-3">
                  {varyingModal && (
                    <MDBTextArea
                      value={time}
                        onChange={(e) => setTime(e.target.value)}
                      labelClass="col-form-label"
                      label="Time to be ready:"
                    />
                  )}
                </div>
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setVaryingModal(!varyingModal)}
              >
                Close
              </MDBBtn>
              <MDBBtn onClick={() => {updatForm(recipeId)}}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
















      <MDBRow className="row-cols-1 row-cols-md-3 g-4 m-5">
        {fav.data?.map((item) => {
          return (
            <>
              <MDBCol md={3}>
                <MDBCard>
                  <MDBCardImage src={item.image} alt="..." position="top" />
                  <MDBCardBody>
                    <MDBCardTitle>
                      <strong>
                        Recipe Name<br></br>
                      </strong>
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText>
                      <strong>Source URL :</strong>
                      <a href={item.sourceUrl}>Recipe source link</a>
                      <br></br>
                      <br></br>
                      <strong>Instructions</strong>
                      {item.instructions}
                      <br></br>
                      <strong>Vegetarian</strong> :{" "}
                      {item.vegetarian ? "yes" : "no"}
                      <br></br>
                      <strong>Ready in </strong>
                      {item.readyInMinutes} Minutes <br></br>
                      {/* {item.summary} */}
                    </MDBCardText>
                  </MDBCardBody>
                  <MDBFooter>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <MDBBtn
                        onClick={() => {
                          removeFave(item.id);
                        }}
                        style={{ width: "150px", backgroundColor: "red" }}
                      >
                        Remove fav
                      </MDBBtn>

                      <Link to="/my-f">
                        <MDBBtn
                          onClick={() => {
                            setVaryingModal(!varyingModal);
                            handelShowData(item.id);
                          }}
                        >
                          {" "}
                          Update Recipe
                        </MDBBtn>
                      </Link>
                    </div>
                  </MDBFooter>
                </MDBCard>
              </MDBCol>
            </>
          );
        })}
      </MDBRow>
    </>
  );
};

export default MyFavoirate;
