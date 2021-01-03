import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle,  Button } from 'reactstrap';


import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem({ places, postlike,  likes,  deletelike ,  updateplace,  auth}) {
    var fav=null;

       return(

           <>
           {places.map((place) => {



        //  console.log(likes.some((like) => like._id === place._id))
            // console.log(fav)
             return(

            <div key={place._id} className="col-12 col-md-5 m-1 ">

              {  auth.isAuthenticated && likes !== null ?
                <>
                { likes.places.some((like) => like._id === place._id) ?
                      fav =true
                : fav=false
              }</>:
                null
            }
             <Card >
            <CardImg width="100%" src={baseUrl +  place.image} alt={place.name} />
            <CardBody className="ab">

              <CardTitle> <h3>{place.name}</h3></CardTitle><br/>

                 <CardText >{place.description}</CardText>


                 </CardBody>

                 </Card>
                 { auth.isAuthenticated?
                 <div>
                 { !fav?
                   <div>
                   <Button outline color="primary"  onClick={() =>{ postlike(place._id); updateplace(place._id, "like")}}>

                 <span   color="primary" className="fa fa-thumbs-up"></span>



                         </Button>&nbsp; {place.likeCount}</div>:

                         <div><Button  color="primary"  onClick={() =>  {  deletelike(place._id); updateplace(place._id, "dislike")}  }>

                      <span   color="primary" className="fa fa-thumbs-up"></span>



                               </Button>&nbsp; {place.likeCount}</div>



             }</div>  :
                <div> <span   color="primary" className="fa fa-thumbs-up"></span>&nbsp; {place.likeCount}</div>
              }


                </div>
               );
           })}

          </>
       );
   }






const Home = (props) => {




         if (props.places.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.places.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="container">
                    <div className="row">

                        <div className="col-12">
                            <h3>Explore</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderMenuItem places={props.places.places} likes={props.likes} postlike={props.postlike} deletelike={props.deletelike} updateplace={props.updateplace} auth={props.auth}/>

                    </div>
                </div>
            );
    }

export default Home;
