import axios from 'axios'
import { setIsLoading } from '../App';


const baseUrl = "http://localhost:5000" // can be used for development
// const baseUrl = "https://fullstack-proto-jazzdap-backend.onrender.com"


const getAllJazzDap = (setJazzDap) => {
  console.log("---- HandleApi / getAllJazzDap", new Date());
  setIsLoading(true);

  axios
    .get(baseUrl)
    .then(({ data }) => {
      console.log('data: ', data);
      setJazzDap(data);

      setIsLoading(false);
    })
    .catch(err => console.log(err))
}

const addJazzDap = (text, setText, setJazzDap, user = null) => {
  console.log(`HandeAPI addJazzDap: \n${baseUrl}/save`, { text });
  // setIsLoading(true);

  axios
    .post(`${baseUrl}/saveJazzDap`, { text, user })
    .then((data) => {
      console.log(data);
      setText("");
      getAllJazzDap(setJazzDap);

      // setIsLoading(false);      
    })
    .catch(err => console.log(err))
}

const updateJazzDap = (jazzDapId, text, setJazzDap, setText, setIsUpdating, userId = null) => {
  console.log("HandleApi updateJazzDap: ", jazzDapId, text);
  // setIsLoading(true);

  axios
    .post(`${baseUrl}/updateJazzDap`, { _id: jazzDapId, text, userId })
    .then((data) => {
      console.log(data);
      setText("");
      setIsUpdating(false);
      getAllJazzDap(setJazzDap);
      // setIsLoading(false);

    })
    .catch(err => console.log(err))
}

const deleteJazzDap = (jazzDapId, setJazzDap) => {
  console.log("HandeAPI deleteJazzDap. annotationId: ", jazzDapId, ", setJazzDap: ", setJazzDap)

  axios
    .post(`${baseUrl}/deleteJazzDap`, { _id: jazzDapId })
    .then((data) => {
      console.log(data);
      getAllJazzDap(setJazzDap);
    })
    .catch(err => console.log(err))
}


const getMusicMIDI = (recording = "BGR0082-T1", user = null, transformFunc = null, playMusicFunc = null) => {
  console.log("-- handleAPI. getMusicMIDI. recording: ", recording, ", user: ", user, ", transformFunc: ", transformFunc, ", playMusicFunc: ", playMusicFunc);
  // setIsLoading(true);

  axios
    .get(`${baseUrl}/getMusicMIDI`, {
      params: {
        recording: recording,
        user: user,
      },
    })
    .then((d) => {
      console.log("#### Then of getMusicMIDI ####");
      console.log(d);
      console.log(d.data);

      if (transformFunc !== null) {
        const dTransformed = transformFunc(d.data);
        console.log("dTransformed: ", dTransformed);
        // play transformed song
        if (playMusicFunc === null) {
          console.log("problem, playMusicFunc is null");
        } else {
          playMusicFunc(dTransformed);
        }
      } else {
        // play song without transformation
        console.log("missing transformation function");
        if (playMusicFunc === null) {
          console.log("also, playMusicFunc is null");
        } else {
          playMusicFunc(d.data); // MIGHT BE BUGGY
        }
      }

      // setIsLoading(false);
      return d;
    })
    .catch((err) => console.log(err));
};


const getSampleMIDI = (recording = "BGR0082-T1", firstNoteIndex = 0, lastNodeIndex = null, user = null, transformFunc = null, playMusicFunc = null) => {
  console.log("-- handleAPI. getMusicMIDI. recording: ", recording, ", user: ", user, ", transformFunc: ", transformFunc, ", playMusicFunc: ", playMusicFunc);
  // setIsLoading(true);

  axios
    .get(`${baseUrl}/getSampleMIDI`, {
      params: {
        recording: recording,
        firstNoteIndex: firstNoteIndex,
        lastNodeIndex: lastNodeIndex,
        user: user,
      },
    })
    .then((d) => {
      console.log("#### Then of getSampleMIDI ####");
      console.log(d);
      console.log(d.data);

      if (transformFunc !== null) {
        const dTransformed = transformFunc(d.data);
        console.log("dTransformed: ", dTransformed);
        // play transformed song
        if (playMusicFunc === null) {
          console.log("problem, playMusicFunc is null");
        } else {
          playMusicFunc(dTransformed);
        }
      } else {
        // play song without transformation
        console.log("missing transformation function");
        if (playMusicFunc === null) {
          console.log("also, playMusicFunc is null");
        } else {
          playMusicFunc(d.data); // MIGHT BE BUGGY
        }
      }

      // setIsLoading(false);
      return d;
    })
    .catch((err) => console.log(err));
};

const getTracksMetadata = (lognumbers, infoMusicList, setInfoMusicList) => {
  console.log("---- HandleApi / getTracksMetadata. lognumbers: ", lognumbers, ", infoMusicList: ", infoMusicList, ", setInfoMusicList: ", setInfoMusicList);
  // setIsLoading(true);

  axios
    .get(`${baseUrl}/getTracksMetadata`, {
      params: {
        lognumbers: lognumbers,
      }
    })
    .then((d) => {
      console.log("#### Then of getTracksMetadata #### d: ", d);

      // TODO low-priority change names of columns in the files, then updated in databased (automate with Python)
      let transf_info_metadata = [];
      for (let i in d.data) {
        transf_info_metadata.push({
          lognumber: d.data[i].lognumber,
          contents: d.data[i].Contents,
          configuration: d.data[i].Configuration,
          tape_stock: d.data[i]["Tape stock"],
          recording_location: d.data[i]["Recording location"],
          idDatabase: d.data[i]["_id"] // new addition. Get the _id stored in the database
        })
      }
      console.log("transf_info_metadata: ", transf_info_metadata);
      setInfoMusicList(transf_info_metadata);
      // setIsLoading(false);
    })
}

/** TODO would make more sense if we loaded all the albums already returned. */
const getTrackMetadata = (lognumber, infoMusicList, setInfoMusicList) => {
  // setIsLoading(true);

  axios
    .get(`${baseUrl}/getTrackMetadata`, {
      params: {
        lognumber: lognumber,
      }
    })
    .then((d) => {
      console.log("#### Then of getTrackMetadata ####");
      console.log("d: ", d, ", d.data[0].lognumber: ", d.data[0].lognumber);
      // Need to change to push into the array... if that's not something already queried for...? 
      // It might be arguable that one metadata search is enough
      // first, let's just add object if lognumber not already in the list
      console.log("! infoMusicList.some(a => a.lognumber === d.data[0].lognumber ): ", !infoMusicList.some(a => a.lognumber === d.data[0].lognumber))
      if (!infoMusicList.some(a => a.lognumber === d.data[0].lognumber)) {
        setInfoMusicList([...infoMusicList,
        {
          lognumber: d.data[0].lognumber,
          contents: d.data[0].Contents,
          tape_stock: d.data[0]["Tape stock"],
          recording_location: d.data[0]["Recording location"],
          idDatabase: d.data[0]["_id"] // new addition. Get the _id stored in the database
        }
        ])
      }
      // setIsLoading(false);
    })
}

const getMatchLevenshteinDistance = (
  stringNotes = "",
  percMatch = 1,
  user = null,
  transformFunc = null,
  playMusicFunc = null,
  levenshteinDistanceFunc = null,
  setListSearchRes = null,
  setListLogNumbers = null,
  setListTracks = null
) => {
  console.log("-- handleAPI / getMatchLevenshteinDistance. stringNotes: ", stringNotes, ", percMatch: ", percMatch, " user: ", user,
    // ", transformFunc: ", transformFunc, // ", playMusicFunc: ", playMusicFunc, // ", levenshteinDistanceFunc: ", levenshteinDistanceFunc
  );
  setIsLoading(true);

  axios
    .get(`${baseUrl}/getMatchLevenshteinDistance2`, { params: { stringNotes: stringNotes, percMatch: percMatch, user: user, }, })
    .then((d) => {
      console.log("#### Then of getMatchLevenshteinDistance ####");
      console.log("d", d);
      console.log("d.data: ", d.data);

      console.log("TIME AFTER QUERY: ", new Date());

      /** TODO * This is a lot of code and most likely should be passed as a function */
      /** TODO 2 * What to do when the data returned is the result from a query without matches? */

      // In retrospect, we probably don't want to play songs directly... we want to list the matching bits.
      if (levenshteinDistanceFunc == null) {
        console.log("We are missing a function to calculate distance!");
      } else {
        // structure data
        const arrayStrNotes = stringNotes.split('-');
        const arrayNotesInput = arrayStrNotes.map(a => parseInt(a));
        const numNotesInput = arrayNotesInput.length;
        const allRecording = [...new Set(d.data.map(a => a.recording))];
        console.log("numNotesInput: ", numNotesInput, ", allRecording: ", allRecording);

        console.log("TIME BEFORE METADATA QUERY: ", new Date());
        // TODO we need to get the _id of the tracks (called logNumber)... this is garbage... it wil take even longer...!
        axios.get(`${baseUrl}/getTracksMetadata`, {
          params: { lognumbers: allRecording, }
        })
          .then((d) => {
            console.log("#Levenshtein getTracksMetadata #### d: ", d);
          });

        console.log("TIME AFTER METADATA QUERY: ", new Date());


        let notesPerRecording = {};
        for (let i in allRecording) {
          notesPerRecording[allRecording[i]] =
            d.data.filter(a => a.recording === allRecording[i])
        }
        console.log("notesPerRecording :", notesPerRecording);
        // Tricky to split the data into sections... might have to do it from previous step actually!

        // split according to recording
        let dataSplitByRecording = {};
        for (let i in allRecording) {
          let filteredByRecording = d.data.filter(a => a.recording === allRecording[i])
          dataSplitByRecording[allRecording[i]] = {}
          dataSplitByRecording[allRecording[i]].data = filteredByRecording;
        }

        console.log("dataSplitByRecording: ", dataSplitByRecording);

        for (let i in dataSplitByRecording) {
          // sort notes
          dataSplitByRecording[i].data =
            dataSplitByRecording[i].data.sort((a, b) => a.recording - b.recording || a.m_id - b.m_id);
          dataSplitByRecording[i].sequences = [];
          // let startSeQuences = dataSplitByRecording[i].data.filter(a => a.startSequence);
          for (let ds in dataSplitByRecording[i].data) {
            if (dataSplitByRecording[i].data[ds].startSequence) {
              let slice =
                dataSplitByRecording[i].data.slice(
                  parseInt(ds), (parseInt(ds) + parseInt(numNotesInput))
                );
              dataSplitByRecording[i].sequences.push(slice);
            }
          }
        }

        // ugly... but we messed up structure here...
        // let resArray = []; 
        let resAggreg = [];
        for (let i in dataSplitByRecording) {
          dataSplitByRecording[i].distances = []
          dataSplitByRecording[i].slicesDist = [];
          for (let j in dataSplitByRecording[i].sequences) {
            let curArrNotes = dataSplitByRecording[i].sequences[j].map(a => a.pitch)
            let curArrTime = dataSplitByRecording[i].sequences[j].map(a => a.onset)
            let curArrDurations = dataSplitByRecording[i].sequences[j].map(a => a.duration)

            let currArrIdNotes = dataSplitByRecording[i].sequences[j].map(a => a._id)

            let distCalc = levenshteinDistanceFunc(arrayNotesInput, curArrNotes);
            dataSplitByRecording[i].distances.push(distCalc);
            dataSplitByRecording[i].slicesDist.push({
              arrNotes: curArrNotes,
              arrIdNotes: currArrIdNotes,
              arrTime: curArrTime.map((num) => Number(num.toFixed(2))),
              arrDurations: curArrDurations.map((num) => Number(num.toFixed(2))),
              distCalc: distCalc,
              recording: i
            });
          }
          // resArray.push({ "recording": i });
          // resArray[resArray.length - 1].data = dataSplitByRecording[i].data;
          // resArray[resArray.length - 1].distances = dataSplitByRecording[i].distances;
          // resArray[resArray.length - 1].sequences = dataSplitByRecording[i].sequences;
          // resArray[resArray.length - 1].slicesDist = dataSplitByRecording[i].slicesDist;
          resAggreg = resAggreg.concat(dataSplitByRecording[i].slicesDist);
        }

        resAggreg.sort((a, b) => a.distCalc - b.distCalc);
        console.log("TIME AFTER ORGANIZING RES, CALCULATING DISTANCE, AND SORTING: ", new Date());

        console.log("dataSplitByRecording: ", dataSplitByRecording);
        // Will be better to later allow filter
        // console.log("resArray: ", resArray);
        console.log("resAggreg: ", resAggreg);

        const allLogNumber = [...new Set(resAggreg.map(a => a.recording.split('-')[0]))]
        console.log("allLogNumber: ", allLogNumber);
        setListLogNumbers(allLogNumber);
        setListSearchRes(resAggreg);
        // TODO
        setListTracks([...new Set(resAggreg.map(obj => obj.recording))].sort())
      }

      setIsLoading(false);
      return d;
    })
    .catch((err) => console.log(err));
};

/** Annotations */

// indexAnnotation added because we can have one sequence occur several times in a track
const addAnnotation = (
  type,
  info,
  indexAnnotation = 0,
  annotationInput,
  setAnnotationInput,
  setListAnnotations,
  author = null,
  privacy = 'public'
) => {
  console.log(`HandeAPI addAnnotation: \n${baseUrl}/saveAnnotation`, { type, info, annotationInput, author, indexAnnotation, privacy });
  // setIsLoading(true);

  let time = new Date();

  axios
    .post(`${baseUrl}/addAnnotation`, { type, info, indexAnnotation, annotationInput, author, privacy, time })
    .then((data) => {
      console.log(data);
      setAnnotationInput("");
      getAnnotations(
        type,
        info,
        setListAnnotations,
        indexAnnotation,
        localStorage.username ? localStorage.username : null)

      // setIsLoading(false);        
    })
    .catch(err => console.log(err))
}

const updateAnnotation = (
  annotationId,
  annotationInput,
  setAnnotationInput,
  indexAnnotation = 0,
  type,
  info,
  setListAnnotations,
  setIsUpdating,
  userId = null) => {
  console.log("HandleApi updateAnnotation: ", annotationId, annotationInput, indexAnnotation);
  // setIsLoading(true);

  axios
    .post(`${baseUrl}/updateAnnotation`, { _id: annotationId, annotationInput, userId })
    .then((data) => {
      console.log("data: ", data);
      console.log("data[0]: ", data[0]);
      setAnnotationInput("");
      setIsUpdating(false);
      // getAllJazzDap(setJazzDap);
      getAnnotations(
        type,
        info,
        setListAnnotations,
        indexAnnotation,
        localStorage.username ? localStorage.username : null);
      // setIsLoading(false);
    })
    .catch(err => console.log(err))
}

const getAnnotations = (
  type,
  info,
  setListAnnotations,
  indexAnnotation = 0,
  user = null
) => {
  console.log("HandeAPI getAnnotations type: ", type, ", info: ", info, ", indexAnnotation: ", indexAnnotation, ", user: ", user);
  // setIsLoading(true);

  axios
    .get(`${baseUrl}/getAnnotations`, {
      params: {
        type: type,
        info: info,
        indexAnnotation: indexAnnotation,
        user: user
      }
    })
    .then(({ data }) => {
      console.log('data: ', data);
      setListAnnotations(data);
      // setIsLoading(false);
    })
    .catch(err => console.log(err))
}

const deleteAnnotation = (annotationId, type, info, setListAnnotations, indexAnnotation = 0) => {
  console.log("HandeAPI deleteAnnotation. annotationId: ", annotationId, ", setListAnnotations: ", setListAnnotations)

  axios
    .post(`${baseUrl}/deleteAnnotation`, { _id: annotationId })
    .then((data) => {
      console.log(data);
      getAnnotations(
        type,
        info,
        setListAnnotations,
        indexAnnotation,
        localStorage.username ? localStorage.username : null);
    })
    .catch(err => console.log(err))
}


/** Comments */

// indexAnnotation added because we can have one sequence occur several times in a track
const addComment = (
  type,
  info,
  indexAnnotation = 0,
  commentInput,
  setCommentInput,
  setListComments,
  author = null,
  annotationId = null
) => {
  console.log(`HandeAPI addComment: \n${baseUrl}/addComment`,
    {
      type,
      info,
      commentInput,
      author,
      indexAnnotation,
      annotationId
    });

  let time = new Date();

  axios
    .post(`${baseUrl}/addComment`, {
      type,
      info,
      indexAnnotation,
      commentInput,
      author,
      time,
      annotationId
    })
    .then((data) => {
      console.log(data);
      setCommentInput("");
      getComments(
        setListComments,
        author,
        annotationId
      )
    })
    .catch(err => console.log(err))
}

const updateComment = (
  commentId,
  commentInput,
  setCommentInput,
  setListComments,
  setIsUpdating,
  userId = null,
  annotationId = null
) => {
  console.log("HandleApi updateComment: ", commentId, commentInput, userId, annotationId);
  // setIsLoading(true);

  axios
    .post(`${baseUrl}/updateComment`, { _id: commentId, commentInput, userId, annotationId })
    .then((data) => {
      console.log("data: ", data);
      console.log("data[0]: ", data[0]);
      setCommentInput("");
      setIsUpdating(false);
      // getAllJazzDap(setJazzDap);
      // getComments(type, info, setListComments, indexAnnotation);
      getComments(
        setListComments,
        userId,
        annotationId
      )

      // setIsLoading(false);
    })
    .catch(err => console.log(err))
}

const getComments = (
  // type,
  // info,
  setListComments,
  // indexAnnotation = 0,
  user = null,
  annotationId = null
) => {
  console.log("HandeAPI getComments, annotationId: ", annotationId, ", user: ", user);
  // "type: ", type, ", info: ", info, ", indexAnnotation: ", indexAnnotation, 
  // setIsLoading(true);

  axios
    .get(`${baseUrl}/getComments`, {
      params:
      {
        // type: type,
        // info: info,
        // indexAnnotation: indexAnnotation,
        annotationId: annotationId
      }
    })
    .then(({ data }) => {
      console.log('data: ', data);
      setListComments(data);
    })
    .catch(err => console.log(err))
}

const deleteComment = (
  commentId,
  setListComments,
  user = null,
  annotationId = null
) => {
  console.log("HandeAPI deleteComment. commentId: ", commentId, ", setListComments: ", setListComments, ", user: ", user, ", annotationId: ", annotationId);

  axios
    .post(`${baseUrl}/deleteComment`, { _id: commentId })
    .then((data) => {
      console.log(data);
      getComments(
        setListComments,
        user,
        annotationId
      );
    })
    .catch(err => console.log(err))
}

/** User info */
const getUserAnnotations = (setListAnnotations, user) => {
  console.log("handleApi getUserAnnotations. user: ", user);

  axios
    .get(`${baseUrl}/getUserAnnotations`, {
      params:
      {
        user: user
      }
    })
    .then(({ data }) => {
      console.log('data: ', data);
      setListAnnotations(data);
    })
    .catch(err => console.log(err))
}

/** Workflows */

const getWorkflowsInfo = (dispatch, setWorkflows, { title = null, time = null, user = null } = {}) => {
  console.log("handleApi getWorkflowsInfo.", { title, time, user });
  axios
    .get(`${baseUrl}/getWorkflowsInfo`, {
      params:
      {
        title: title,
        time: time,
        user: user
      }
    })
    .then(({ data }) => {
      console.log('getWorkflowsInfo data: ', data);
      dispatch(setWorkflows(data))
    })
    .catch(err => console.log(err))
}

// In the case where we create one workflow with one object, there can be one note passed with it
const createWorkflow = (
  title, description, time, author,
  objectsId = [], // the id of the object being listed
  objectsTimes = [],
  objectsNote = [],
  objectsType = [],
  setTitleInput, setDescriptionInput,
  dispatch,
  setWorkflows,
  objectIndexRange = [] // For samples we need to know how far the search goes beyond the first note identified
) => {
  console.log("handleApi createWorkflow. ", {
    title, description, time, author, objectsId, objectsTimes, objectsNote, objectsType
  });

  const objects = [];
  for (var i = 0; i < objectsId.length; i++) {
    console.log("i: ", i, ", (typeof i): ", (typeof i), ", (typeof objectsTimes[i]): ", objectsTimes[i]);
    objects.push({
      objectId: objectsId[i],
      objectTime: objectsTimes[i],
      objectIndex: i,
      objectNote: objectsNote[i],
      objectType: objectsType[i],
      objectIndexRange: objectIndexRange[i]
    })
  }

  axios
    .post(`${baseUrl}/createWorkflow`, {
      title, description, time, author,
      objects
    })
    .then((data) => {
      console.log("Then handleApi createWorkflow");
      setTitleInput("");
      setDescriptionInput("");
      getWorkflowsInfo(
        dispatch, setWorkflows, { user: author }
      )
    })
    .catch(err => console.log(err))
}

const addContentWorkflow = (
  dispatch, setWorkflows,
  _id, // _id of of the workflow
  textNote, // text to set note related to the object
  time, // time of input
  userId, // identifier of author
  idContent, // _id of object
  typeContent, // type of the content: recording / track / sample / annotation / comment / search (TODO) / ...
  objectsIndex, // make the assumption that this is calculated with the call as the workflow is passed as a parameter... (OR make another call if that isn't passed?! V1 assume it is passed)
  workflow, // TODO doubt about this!
  indexRange = 0 // For samples we need to know how far the search goes beyond the first note identified
) => {
  console.log("handleApi createWorkflow. ", {
    _id, textNote, time, userId, idContent, typeContent, objectsIndex
  });

  // axios call
  axios.post(`${baseUrl}/addContentWorkflow`, {
    _id, textNote, time, userId, idContent, typeContent, objectsIndex, indexRange
  })
    .then((data) => {
      console.log("Then handleApi addContentWorkflow. data: ", data);
      // TODO ... do more? Maybe do another call to get the list of workflows?
      getWorkflowsInfo(
        dispatch,
        setWorkflows,
        { user: userId }
      );
      // change with dispatch and setWorkflows? (Probably not, it is done in getWorkflowsInfo)
      // workflow.objects.push(data.data.objects[data.data.objects.length-1]);
    })
    .catch(err => console.log(err))
}

// Note: the parameter passed is the _id of the workflow
const deleteWorkflowObject = (_id, objectIndex, workflow,
  // setListWorkflows, 
  dispatch,
  setWorkflows,
  userId) => {
  console.log("handleApi deleteWorkflowObject. ", { _id, objectIndex });
  // TODO assess whether we care about indexes having empty spots... I suppose not 
  axios.post(`${baseUrl}/deleteWorkflowObject`, {
    _id, objectIndex
  })
    .then((data) => {
      console.log("Then handleApi deleteWorkflowObject. data: ", data);
      getWorkflowsInfo(dispatch, setWorkflows, { user: userId });
      // TODO check if this is the right way. Call of workflow should be made with the global variable I think.
      workflow.objects = workflow.objects.filter(item => item["objectIndex"] !== objectIndex);
    })
    .catch(err => console.log(err));
}

// Loading up detail of workflow once as it is loaded is surprisingly complicated... Might as well load everything from the start
const getWorkflow = (setIsWorkerVisible, setSelectedWorkflow, _id, user) => {
  console.log("handleApi getWorkflow. setIsWorkerVisible: ", setIsWorkerVisible, ", setSelectedWorkflow: ", setSelectedWorkflow, ", _id: ", _id, ", user: ", user);

  axios
    .get(`${baseUrl}/getWorkflow`, {
      params:
      {
        _id: _id,
        user: user
      }
    })
    .then(({ data }) => {
      console.log('getWorkflow successful. data: ', data);
      // TODO load the full details?

      console.log("All objects: ",data.objects)

      // So we will add content to the data...
      getDatabaseContent(data, setSelectedWorkflow, setIsWorkerVisible);

      // setSelectedWorkflow(data);
      // setIsWorkerVisible(true);
    })
    .catch(err => console.log(err))
}

const getDatabaseContent = async (workflow, setSelectedWorkflow, setIsWorkerVisible) => {
  const workflowObjects = workflow.objects;
  console.log("getDatabaseContent. workflowObjects: ", workflowObjects);

  const requests = workflowObjects.map((object) => {
    const _id = object.objectId;
    const typeCaller = object.objectType;
    const indexRange = object.objectIndexRange;

    if (["annotation", "comment", "recording", "track", "sample"].includes(typeCaller)) {
      return axios.get(`${baseUrl}/get_idContent_${typeCaller}`, {
        params: {
          _id: _id,
          typeCaller: typeCaller,
          indexRange: indexRange,
        },
      });
    } else {
      console.log("Issue with typeCaller: (", typeCaller, "), it is not recognized.");
      return Promise.reject("Invalid typeCaller");
    }
  });

  try {
    const responses = await Promise.allSettled(requests);
    console.log("responses:", responses);
    const responseData = responses.map((response) =>
      response.status === "fulfilled" ? response.value.data : null
    );
    console.log("responseData:", responseData);

    const updatedWorkflowObjects = workflowObjects.map((object, i) => {
      return { ...object, content: responseData[i] };
    });

    const updatedWorkflow = { ...workflow, objects: updatedWorkflowObjects };
    console.log("updatedWorkflow after enrichment: ", updatedWorkflow);

    setSelectedWorkflow(updatedWorkflow);
    setIsWorkerVisible(true);
  } catch (error) {
    console.log("Error:", error);
  }
};

export {
  getAllJazzDap, addJazzDap, updateJazzDap, deleteJazzDap,
  getMusicMIDI, getSampleMIDI, getMatchLevenshteinDistance,
  getTrackMetadata, getTracksMetadata,
  addAnnotation, getAnnotations, deleteAnnotation, updateAnnotation,
  addComment, getComments, deleteComment, updateComment,
  getUserAnnotations,
  getWorkflow, getWorkflowsInfo, createWorkflow,
  addContentWorkflow, deleteWorkflowObject,
  getDatabaseContent
}
