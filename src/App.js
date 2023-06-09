import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// versions issue with mui/base/ModalUnstyled
// import ModalUnstyled from "@mui/base/ModalUnstyled";
// import { ModalUnstyled } from '@mui/base';
import "./App.css";
import JazzDap from "./components/JazzDap";
import Dashboard from "./components/Dashboard/Dashboard";
import Preferences from "./components/Preferences/Preferences";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import { AiOutlineLoading } from 'react-icons/ai';
import {
  getAllJazzDap,
  addJazzDap,
  updateJazzDap,
  deleteJazzDap,
} from "./utils/HandleApi";
import logoJazzDap from "./Logo1.jpg";
import Register from "./components/Register/Register";
import AuthContext from "./context/AuthProvider";
import { UserContext } from "./context/UserContext";
import { WorkflowContext } from './components/Workflow/WorkflowContext';
import MusicInterface from "./components/MusicInterface/MusicInterface";

import { Provider } from 'react-redux';
import store from './components/App/store';

export let setIsLoading; // Export the function

function App() {
  const [listJazzDap, setListJazzDap] = useState([]);
  const [textInputJazzDAP, setTextInputJazzDAP] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [jazzDapId, setJazzDapId] = useState("");

  const { auth, setAuth } = useContext(AuthContext);

  //  ---- Login buttons variables
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showDiv, setShowDiv] = useState(false);

  const [isLoading, setIsLoadingState] = useState(false);
  useEffect(() => {
    setIsLoading = setIsLoadingState; // Assign the function to the exported variable
  }, []);

  useEffect(() => {
    getAllJazzDap(setListJazzDap);
  }, []);
  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setTextInputJazzDAP(text);
    setJazzDapId(_id);
  };

  return (
    <Provider store={store}>    
      <div className="App">
        {(localStorage?.username === undefined) ?
          <button
            className='buttonShowDiv'
            onClick={() => setShowDiv(!showDiv)}
          >
            {showDiv ? 'Hide Login / Register' : 'Login / Register'}
          </button>
          : <></>
        }
        <div className="header">        
            <img src={logoJazzDap} className="imageHeader" alt="some value" name="Image1" align="bottom" width="125.6" height="70" border="0" />
            <span className="alpha_warning">ALPHA</span>

          {(showDiv || localStorage?.username !== undefined) &&
            <div className="wrapper">
                <div
                  className={
                    auth !== null || localStorage.token ? "offscreen" : "auth"
                  }
                >
                <Register/>
                <hr />
                <Login/>
              </div>
            </div>
          }
        </div>
        <div className="contentApp">

          {/* 
          TODO change in progress: set a global variable to keep track of the workflows loaded. 
          We need to ensure the distinction with loading light data and heavy things like search 
          */}

          { (auth !== null || localStorage.token ? "logout" : "offscreen") ?
            (
              <>
                <div className={auth !== null || localStorage.token ? "logout" : "offscreen"}>
                  <Logout />
                </div>
                <MusicInterface />
              </>
            )
            :
            <MusicInterface />
          } 

          {/* <div className="container">
            <div className="jazzdapInput">
              <input
                type="text"
                placeholder="Add Jazzdap"
                name="AddJazzDap"
                id="AddJazzDap"
                value={textInputJazzDAP}
                onChange={(e) => setTextInputJazzDAP(e.target.value)}
              />
              <div className="add" onClick={
                isUpdating
                  ? () =>
                    updateJazzDap(
                      jazzDapId,
                      textInputJazzDAP,
                      setListJazzDap,
                      setTextInputJazzDAP,
                      setIsUpdating,
                      localStorage.username ? localStorage.username : null)
                  : () =>
                    addJazzDap(
                      textInputJazzDAP,
                      setTextInputJazzDAP,
                      setListJazzDap,
                      localStorage.username ? localStorage.username : null
                    )
              }
              >
                {isUpdating ? "Update" : "Add"}
              </div>
            </div>
            <div className="list">
              {listJazzDap.map((item) => (
                <JazzDap
                  key={item._id}
                  text={item.text}
                  updateMode={() => updateMode(item._id, item.text, localStorage?.username)}
                  deleteJazzDap={() => deleteJazzDap(item._id, setListJazzDap)}
                />
              ))}
            </div>
          </div> */}

          <div className="info">
            <hr/><br/>
            <p>
              <font face="Helvetica, sans-serif" color="ghostwhite">
                <b>
                  A NEH-AHRC New Directions for Digital Scholarship in Cultural
                  Institutions project
                </b>
              </font>
            </p>
            <div className="textInfo">
              <span>
                <font size="3">
                  <font color="#dce0cd">
                    New Directions in Digital Jazz Studies uses state of the art
                    music information retrieval and artificial intelligence
                    algorithms for the analysis of jazz recordings and linked data
                    to enable novel approaches to co-creative use of materials in
                    the archival collections of the Institute of Jazz Studies and
                    Scottish Jazz Archive. This trans-Atlantic collaboration between
                    jazz historians, technologists, and jazz archivists will expand
                    access to unique materials held in archives and illuminate their
                    musical relationships to more widely studied recordings. This
                    project will create, analyse, and visualize relationships
                    between audio and other materials and create rich research
                    workflows to be shared within the scholarly community as a novel
                    way to support co-creation with cultural institutions. We
                    envision a disciplinary transformation through the discovery of
                    new models for jazz historiography, and a broader,
                    interdisciplinary transformation in methodology for digital
                    humanities
                  </font>
                </font>
              </span>
            </div>

            <br />
            <hr />
            <br />

            <ul>
              <p>
                <span>
                  <font color="ghostwhite">
                    <font size="3">
                      <strong>Investigators</strong>
                    </font>
                  </font>
                </span>
              </p>
              <div className="textInfo">
                <p>
                  <span>
                    <font size="3">
                      <font color="#dce0cd">
                        <a
                          className="externalLink"
                          href="http://www.city.ac.uk/people/academics/tillman-weyde"
                        >
                          Tillman Weyde
                        </a>{" "}
                        (PI{" "}
                      </font>
                    </font>
                    <font size="3">
                      <font color="#dce0cd">UK</font>
                    </font>
                    <font size="3">
                      <font color="#dce0cd">
                        ),
                        <a className="externalLink" href="http://www.city.ac.uk/">
                          City University of London
                        </a>
                        , UK
                      </font>
                    </font>
                  </span>
                </p>
                <p>
                  <span>
                    <font size="3">
                      <font color="#dce0cd">
                        <a
                          className="externalLink"
                          href="https://music.illinois.edu/faculty/gabriel-solis"
                        >
                          Gabriel Solis
                        </a>{" "}
                      </font>
                    </font>
                    <font size="3">
                      <font color="#dce0cd">(PI US)</font>
                    </font>
                    <font size="3">
                      <font color="#dce0cd">
                        ,
                        <a className="externalLink" href="http://illinois.edu/">
                          University of Illinois Champaign Urbana
                        </a>
                        , USA
                      </font>
                    </font>
                  </span>
                </p>
                <p>
                  <span>
                    <font size="3">
                      <font color="#dce0cd">
                        <a
                          className="externalLink"
                          href="http://www.eecs.qmul.ac.uk/%7Esimond"
                        >
                          Simon Dixon
                        </a>
                        ,{" "}
                        <a className="externalLink" href="http://www.qmul.ac.uk/">
                          Queen Mary University of London
                        </a>
                        , UK
                      </font>
                    </font>
                  </span>
                </p>
                <p>
                  <span>
                    <font size="3">
                      <font color="#dce0cd">
                        <a
                          className="externalLink"
                          href="https://www.napier.ac.uk/people/haftor-medboe"
                        >
                          Haftor Medboe
                        </a>
                        ,{" "}
                        <a
                          className="externalLink"
                          href="https://www.napier.ac.uk/"
                        >
                          Edinburgh Napier University
                        </a>
                        , UK
                      </font>
                    </font>
                  </span>
                </p>
                <p>
                  <span>
                    <font size="3">
                      <font color="#dce0cd">
                        <a
                          className="externalLink"
                          href="https://www.bcu.ac.uk/research/our-people/a-e/pedro-cravinho"
                        >
                          Pedro Cravinho
                        </a>
                        ,{" "}
                        <a className="externalLink" href="https://www.bcu.ac.uk/">
                          Birmingham City University
                        </a>
                        , UK
                      </font>
                    </font>
                  </span>
                </p>
                <p>
                  <span>
                    <font size="3">
                      <font color="#dce0cd">
                        <a
                          className="externalLink"
                          href="https://www.libraries.rutgers.edu/directory/adriana-cuervo"
                        >
                          Adriana Cuervo
                        </a>
                        ,{" "}
                        <a className="externalLink" href="https://www.rutgers.edu/">
                          Rutgers University
                        </a>
                        , USA
                      </font>
                    </font>
                  </span>
                </p>
              </div>
              <br />
              <hr />
              <br />
              <p>
                <span>
                  <font color="ghostwhite">
                    <font size="3">
                      <strong>Partners</strong>
                    </font>
                  </font>
                </span>
              </p>
              <div className="textInfo">
                <p>
                  <span>
                    <font size="3">
                      <font color="#dce0cd">
                        <a
                          className="externalLink"
                          href="http://scottishjazzarchive.org/"
                        >
                          Scottish Jazz Archive
                        </a>
                        , UK
                      </font>
                    </font>
                  </span>
                </p>
              </div>
              <br />
              <hr />
              <br />
              <p>
                <span>
                  <font color="ghostwhite">
                    <font size="3">
                      <b>Duration and Funding</b>
                    </font>
                  </font>
                </span>
              </p>
              <div className="textInfo">
                <p>
                  <span>
                    <font size="3">
                      <font color="#dce0cd">
                        The project is an ongoing collaboration between six
                        different universities across four countries, which started
                        in Feb 2021 and is funded until July 2024 by the NEH/AHRC
                        New Directions for Digital Scholarship in Cultural
                        Institutions Call (see announcement
                        <a
                          className="externalLink"
                          href="https://webarchive.nationalarchives.gov.uk/ukgwa/20200619160542/https://ahrc.ukri.org/funding/apply-for-funding/current-opportunities/neh-ahrc-new-directions-for-digital-scholarship-in-cultural-institutions-call/"
                        >
                          here
                        </a>
                        ) via the support of the Arts and Humanities Research
                        Council (UK) and the National Endowment for the Humanities
                        (USA).
                      </font>
                    </font>
                  </span>
                </p>
              </div>
              <br />
              <div className="footer">
                <p>
                  <span>
                    <font color="#72aee6">
                      <a
                        className="externalLink"
                        href="https://mirg.city.ac.uk/blog/wp-content/uploads/2021/11/logo.png"
                      >
                        <font color="#000080"> </font>
                        <img
                          src="https://mirg.city.ac.uk/blog/wp-content/uploads/2021/11/logo.png"
                          className="imageFooter"
                          alt="some value"
                          name="Image2"
                          align="bottom"
                          width="280"
                          height="71"
                          border="1"
                        />
                      </a>
                    </font>

                    <a
                      className="externalLink"
                      href="https://mirg.city.ac.uk/blog/wp-content/uploads/2021/11/logo.png"
                    ></a>
                    <a
                      className="externalLink"
                      href="https://mirg.city.ac.uk/blog/wp-content/uploads/2021/11/logo-us-neh.png"
                    >
                      <font color="#000080">
                        <img
                          src="https://mirg.city.ac.uk/blog/wp-content/uploads/2021/11/logo-us-neh.png"
                          className="imageFooter"
                          alt="some value"
                          name="Image3"
                          align="bottom"
                          width="280"
                          height="67"
                          border="1"
                        />
                      </font>
                    </a>
                    <a
                      className="externalLink"
                      href="https://mirg.city.ac.uk/blog/wp-content/uploads/2021/11/logo-us-neh.png"
                    ></a>
                  </span>
                </p>
              </div>
            </ul>
          </div>
        </div>
        {isLoading && (
          <div className="loading-container">
            <div className="loading-icon">
              <h2>Loading... This can take a few minutes.</h2>{" "}
              <AiOutlineLoading className="spin" size={window.innerHeight / 10} />
            </div>
          </div>
        )}
      </div>
    </Provider>
  );
}

export default App;
