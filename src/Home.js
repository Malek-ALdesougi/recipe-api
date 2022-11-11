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
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import MyFavoirate from "./MyFavoirate";

function Home() {
  const [recipe, setRecipes] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/recipes").then((response) => {
      setRecipes(response);
    });
  }, []);

  if (recipe !== "") {
    console.log(recipe.data.data[0].title);
  }

  //   const {fav, setFave} = useState('');

  function setFaveorite(id) {
    var data = JSON.stringify({
      fav: 1,
    });

    var config = {
      method: "put",
      url: `http://127.0.0.1:8000/api/add-fav/${id}`,
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "XSRF-TOKEN=eyJpdiI6Im54ZUJHZjJwZGlmT0VrSXlDL3lCcHc9PSIsInZhbHVlIjoiblQxTFRQanFhVXRNS2h0Y28wNzFSajg4LzVZSlltdy9LUlBPMmRCdHVXNXc0cmExdnNFYmRzcytYb1pxNU95MllLTE4yTmdJcXZ0VDdwQUpNY2k1STVyQnRpVHhqU3pHK1NOZTF6d1lpZU0vZENvSmF2TFZmSmt4YWFLQ1gzVnMiLCJtYWMiOiI1MTA4OGQ2OWY4MzFlMjNmMmRjMDY0ODg5NzgwYzZiZTc1NTM5ODU2N2FkZjE0N2NhNGQzYTVjNDM4NjQxNWM2IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6InM5bllIZlhTVnBLWDIvdEt2SWtHSXc9PSIsInZhbHVlIjoiZ2NuOFRGYjJKZ0M4SzczK3RqVTErN2hZRm5nd05rVUl6Q3pWNThoNFhXdU1XaUZkS2l2MXlTbXhTejBLaEZFNlN0YVJxaUZ0NXQvSHcwa1hqOFRIb0NaaGVZQUV3dVNCNE5oNm0rY1EvKzFlOGxrZE4xd3MwMU5EN2dBRTIzS3QiLCJtYWMiOiI5ODJiOGI4MDA1NWFiZGRkNjRlY2E5MDIzYzNkMWJjOWMzNDEyNjcyNGNkNjljMzk1ZjhhYzZjYmFiNWJjZjdlIiwidGFnIjoiIn0%3D",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <MDBRow className="row-cols-1 row-cols-md-3 g-4 m-5">
        {recipe !== "" ? (
          recipe.data.data.map((item) => {
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
                          onClick={() => setFaveorite(item.id)}
                          style={{ width: "150px", backgroundColor: "orange" }}
                        >
                          Add to favoirate
                        </MDBBtn>
                        <Link to="/my-f">
                          <MDBBtn
                            style={{ width: "150px", backgroundColor: "green" }}
                          >
                            My Favoirates page
                          </MDBBtn>
                        </Link>
                      </div>
                    </MDBFooter>
                  </MDBCard>
                </MDBCol>
              </>
            );
          })
        ) : (
          <div
            style={{
              display: "block",
              justifyContent: "center",
              backgroundColor: "red",
            }}
          >
            <h1>Loeading ....</h1>
          </div>
        )}
      </MDBRow>
    </>
  );
}

export default Home;
