import axios from 'axios'

const baseUrl = "http://localhost:5000" // can be used for development
// const baseUrl = "https://fullstack-proto-jazzdap-backend.onrender.com"

const getAllJazzDap = (setJazzDap) => {
  console.log("getAllJazzDap", new Date());

  axios
    .get(baseUrl)
    .then(({ data }) => {
      console.log('data: ', data);
      setJazzDap(data);
    })
    .catch(err => console.log(err))
}

const addJazzDap = (text, setText, setJazzDap, user = null) => {
  console.log(`HandeAPI addJazzDap: \n${baseUrl}/save`, { text });

  axios
    .post(`${baseUrl}/save`, { text, user })
    .then((data) => {
      console.log(data);
      setText("");
      getAllJazzDap(setJazzDap);
    })
    .catch(err => console.log(err))
}

const updateJazzDap = (jazzDapId, text, setJazzDap, setText, setIsUpdating, userId = null) => {
  axios
    .post(`${baseUrl}/update`, { _id: jazzDapId, text, userId })
    .then((data) => {
      console.log(data);
      setText("");
      setIsUpdating(false);
      getAllJazzDap(setJazzDap);
    })
    .catch(err => console.log(err))
}

const deleteJazzDap = (jazzDapId, setJazzDap) => {
  axios
    .post(`${baseUrl}/delete`, { _id: jazzDapId })
    .then((data) => {
      console.log(data);
      getAllJazzDap(setJazzDap);
    })
    .catch(err => console.log(err))
}


const getMusicMIDI = (recording = "BGR0082-T1", user = null, transformFunc = null, playMusicFunc = null) => {
  console.log("-- handleAPI. getMusicMIDI. recording: ", recording, ", user: ", user, ", transformFunc: ", transformFunc, ", playMusicFunc: ", playMusicFunc);

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

      return d;
    })
    .catch((err) => console.log(err));
};


const getSampleMIDI = (recording = "BGR0082-T1", firstNoteIndex = 0, lastNodeIndex = null, user = null, transformFunc = null, playMusicFunc = null) => {
  console.log("-- handleAPI. getMusicMIDI. recording: ", recording, ", user: ", user, ", transformFunc: ", transformFunc, ", playMusicFunc: ", playMusicFunc);

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

      return d;
    })
    .catch((err) => console.log(err));
};

const getTracksMetadata = (lognumbers, infoMusicList, setInfoMusicList) => {
  axios
    .get(`${baseUrl}/getTracksMetadata`, {
      params: {
        lognumbers: lognumbers,
      }
    })
    .then((d) => {
      console.log("#### Then of getTracksMetadata ####");
      console.log("d: ", d);
      
      // TODO low-priority change names of columns in the files, then updated in databased (automate with Python)
      let transf_info_metadata = [];
      for ( let i in d.data){
        transf_info_metadata.push({
          lognumber: d.data[i].lognumber,
          contents: d.data[i].Contents,
          configuration: d.data[i].Configuration,
          tape_stock: d.data[i]["Tape stock"],
          recording_location: d.data[i]["Recording location"],
        })
      }
      console.log("transf_info_metadata: ",transf_info_metadata);
      setInfoMusicList(transf_info_metadata);
    })
}

/** TODO would make more sense if we loaded all the albums already returned. */
const getTrackMetadata = (lognumber, infoMusicList, setInfoMusicList) => {
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
      console.log("! infoMusicList.some(a => a.lognumber === d.data[0].lognumber ): ", ! infoMusicList.some(a => a.lognumber === d.data[0].lognumber ))
      if ( ! infoMusicList.some(a => a.lognumber === d.data[0].lognumber ) ) {
        setInfoMusicList([...infoMusicList,
        {
          lognumber: d.data[0].lognumber,
          contents: d.data[0].Contents,
          tape_stock: d.data[0]["Tape stock"],
          recording_location: d.data[0]["Recording location"],
        }
        ])
      }
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
  setListLogNumbers = null
) => {
  console.log("-- handleAPI. getMatchLevenshteinDistance. stringNotes: ", stringNotes,
    ", percMatch: ", percMatch,
    " user: ", user,
    ", transformFunc: ", transformFunc,
    ", playMusicFunc: ", playMusicFunc,
    ", levenshteinDistanceFunc: ", levenshteinDistanceFunc);

  axios
    .get(`${baseUrl}/getMatchLevenshteinDistance`, {
      params: {
        stringNotes: stringNotes,
        percMatch: percMatch,
        user: user,
      },
    })
    .then((d) => {
      console.log("#### Then of getMatchLevenshteinDistance ####");
      console.log("d", d);
      console.log("d.data: ", d.data);

      /** TODO
       * This is a lot of code and most likely should be passed as a function
       */

      /**
       * TODO 2: what to do when the data returned is the result from a query without matches?
       */

      // In retrospect, we probably don't want to play songs directly... we want to list the matching bits.
      if (levenshteinDistanceFunc == null) {
        console.log("We are missing a function to calculate distance!");
      } else {
        // structure data
        const arrayStrNotes = stringNotes.split('-')
        const arrayNotesInput = arrayStrNotes.map(a => parseInt(a))
        const numNotesInput = arrayNotesInput.length;
        console.log("numNotesInput: ", numNotesInput);
        const allRecording = [...new Set(d.data.map(a => a.recording))]
        console.log("allRecording: ", allRecording);

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

        for (let i in dataSplitByRecording) {
          // sort notes
          dataSplitByRecording[i].data = dataSplitByRecording[i].data.sort((a, b) => a.recording - b.recording || a.m_id - b.m_id);
          dataSplitByRecording[i].sequences = [];
          // let startSeQuences = dataSplitByRecording[i].data.filter(a => a.startSequence);
          for (let ds in dataSplitByRecording[i].data) {
            if (dataSplitByRecording[i].data[ds].startSequence) {
              let slice = dataSplitByRecording[i].data.slice(parseInt(ds), (parseInt(ds) + parseInt(numNotesInput)));
              dataSplitByRecording[i].sequences.push(slice);
            }
          }
        }

        // ugly... but we messed up structure here...
        let resArray = []
        let resAggreg = [];
        for (let i in dataSplitByRecording) {
          dataSplitByRecording[i].distances = []
          dataSplitByRecording[i].slicesDist = [];
          for (let j in dataSplitByRecording[i].sequences) {
            let curArrNotes = dataSplitByRecording[i].sequences[j].map(a => a.pitch)
            let curArrTime = dataSplitByRecording[i].sequences[j].map(a => a.onset)
            let curArrDurations = dataSplitByRecording[i].sequences[j].map(a => a.duration)
            // console.log("arrNotes: ", arrNotes);
            // let strArrNotes=arrNotes.toString().replaceAll(',','-');
            let distCalc = levenshteinDistanceFunc(arrayNotesInput, curArrNotes);
            dataSplitByRecording[i].distances.push(distCalc);
            dataSplitByRecording[i].slicesDist.push({
              arrNotes: curArrNotes,
              arrTime: curArrTime,
              arrDurations: curArrDurations,
              distCalc: distCalc,
              recording: i
            });
          }
          resArray.push({ "recording": i })
          resArray[resArray.length - 1].data = dataSplitByRecording[i].data;
          resArray[resArray.length - 1].distances = dataSplitByRecording[i].distances;
          resArray[resArray.length - 1].sequences = dataSplitByRecording[i].sequences;
          resArray[resArray.length - 1].slicesDist = dataSplitByRecording[i].slicesDist;
          resAggreg = resAggreg.concat(dataSplitByRecording[i].slicesDist);
        }

        resAggreg.sort((a, b) => a.distCalc - b.distCalc);
        console.log("dataSplitByRecording: ", dataSplitByRecording);
        // Will be better to later allow filter
        console.log("resArray: ", resArray);
        console.log("resAggreg: ", resAggreg);
        console.log("typeof resAggreg: ", typeof resAggreg);

        const allLogNumber =  [...new Set(resAggreg.map( a => a.recording.split('-')[0] ))] 
        // console.log("allLogNumber: ", allLogNumber);
        setListLogNumbers(allLogNumber);
        setListSearchRes(resAggreg);

        return d;
      }


      return d;
    })
    .catch((err) => console.log(err));
};


// This is really just a v1
const addAnnotation = (type, annotation, setAnnotation, setJazzDap, user = null) => {
  console.log(`HandeAPI addJazzDap: \n${baseUrl}/saveAnnotation`, { annotation });

  axios
    .post(`${baseUrl}/saveannotation`, { annotation, type, user })
    .then((data) => {
      console.log(data);
      setAnnotation("");
      // getAllAnnotation(setAnnotations); // TODO
    })
    .catch(err => console.log(err))
}



export {
  getAllJazzDap, addJazzDap, updateJazzDap, deleteJazzDap,
  getMusicMIDI, getSampleMIDI, getMatchLevenshteinDistance,
  getTrackMetadata, // will probably remove this one? 
  getTracksMetadata,
  addAnnotation
}
