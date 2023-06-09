// create two monophonic synths
// const synthA = new Tone.FMSynth().toDestination();
// const synthB = new Tone.AMSynth().toDestination();
const [synthPoly, setSynthPoly] = useState(new Tone.PolySynth(Tone.Synth).toDestination());
function playSinth() {
    const now = Tone.now();
    synth2.current.triggerAttackRelease("C#4", "8n", now + 0.25); // synth2.triggerAttackRelease("E4", "8n", now + 0.5); // synth2.triggerAttackRelease("G4", "8n", now + 1); // synth2.triggerAttackRelease(440, "800n", now + 1.5);
    synth2.current.triggerAttackRelease("C#4s", "8n", now + 0.5);
    synth2.current.triggerAttackRelease(360, 1, now + 1); synth2.current.triggerAttackRelease(360, 1, now + 2); synth2.current.triggerAttackRelease(360, 5, now + 3);
    synthPoly.triggerAttack("D4", now + 3); synthPoly.triggerAttack("F4", now + 0.5 + 3); // synthPoly.triggerAttack("A4", now + 1); // synthPoly.triggerAttack("C5", now + 1.5); // synthPoly.triggerAttack("E5", now + 2); // synthPoly.triggerAttack("G6", now + 3); // synthPoly.triggerAttack("D3", now + 4); 
    synthPoly.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 1 + 3);
    // Tone.loaded().then(() => { sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], "16n", now+5);  })
}

const [playingMIDI, setPlayingMIDI] = useState(false);

// function playMusic(contextMusic,oscillator,music = tetris, lengthNote=2, eps=0.01) {
//   // getOrCreateContext();
//   if (oscillator.context.state!=="running") {oscillator.start(0);}
//   var time = contextMusic.currentTime + eps;
//   music.forEach((note) => {
//     const freq = Math.pow(2, (note[0] - 69) / 12) * 440;
//     oscillator.frequency.setTargetAtTime(0, time - eps, 0.001);
//     oscillator.frequency.setTargetAtTime(freq, time, 0.001);
//     time += lengthNote / note[1];
//   });
//   // line added ourselves, unsure if it makes perfect sense
//   oscillator.stop(tetris.length / lengthNote);
// }


// // This is a tetris theme transposed from https://musescore.com/user/16693/scores/38133
// const tetris = [ [76, 4], [71, 8], [72, 8], [74, 4], [72, 8], [71, 8], [69, 4], [69, 8], [72, 8], [76, 4], [74, 8], [72, 8], [71, 4], [71, 8], [72, 8], [74, 4], [76, 4], [72, 4], [69, 4], [69, 4], [0,  4], [74, 3], [77, 8],[81, 4], [79, 8], [77, 8], [76, 3], [72, 8], [76, 4], [74, 8], [72, 8], [71, 4], [71, 8], [72, 8], [74, 4], [76, 4], [72, 4], [69, 4], [69, 4], [0, 4], ]

const oldMainMelody = [
    {'time': 0, 'note': Math.pow(2, (76 - 69) / 12) * 440, 'duration': 5},
    // {'time': 6, 'note': Math.pow(2, (100 - 69) / 12) * 440, 'duration': 10},
    {'time': '0:1', 'note': Math.pow(2, (72 - 69) / 12) * 440, 'duration': '8n.'},
    {'time': '0:2', 'note': Math.pow(2, (74 - 69) / 12) * 440, 'duration': '8n'},
    {'time': '0:2:2', 'note': Math.pow(2, (72 - 69) / 12) * 440, 'duration': '8n.'},
    {'time': '0:2:4', 'note': Math.pow(2, (71 - 69) / 12) * 440, 'duration': '8n.'},
    {'time': '0:3', 'note': 440, 'duration': '8n'}, {'time': '0:3:2', 'note': 'A4', 'duration': '2n'}, 
    // {'time': '2:0', 'note': 'A4', 'duration': '8n'}, {'time': '2:0:2', 'note': 'G4', 'duration': '8n'}, {'time': '2:1', 'note': 'F4', 'duration': '8n'}, {'time': '2:2', 'note': 'A4', 'duration': '8n'}, {'time': '2:2:2', 'note': 'G4', 'duration': '8n'}, {'time': '2:3', 'note': 'E4', 'duration': '8n'}, {'time': '2:3:2', 'note': 'F4', 'duration': '2n'}, {'time': '4:0', 'note': 'G4', 'duration': '8n'}, {'time': '4:0:2', 'note': 'F4', 'duration': '8n'}, {'time': '4:1', 'note': 'D4', 'duration': '8n'}, {'time': '4:2', 'note': 'F4', 'duration': '8n'}, {'time': '4:2:2', 'note': 'A4', 'duration': '8n'}, {'time': '4:3', 'note': 'G4', 'duration': '8n'}, {'time': '4:3:2', 'note': 'A4', 'duration': '2n'}, {'time': '5:2:2', 'note': 'G4', 'duration': '8n'}, {'time': '5:3', 'note': 'A4', 'duration': '8n'}, {'time': '5:3:2', 'note': 'B4', 'duration': '8n'}, {'time': '6:0', 'note': 'C5', 'duration': '8n'}, {'time': '6:1', 'note': 'B4', 'duration': '8n'}, {'time': '6:1:2', 'note': 'A4', 'duration': '8n'}, {'time': '6:2', 'note': 'B4', 'duration': '8n'}, {'time': '6:2:2', 'note': 'A4', 'duration': '8n'}, {'time': '6:3', 'note': 'G4', 'duration': '8n'}, {'time': '6:3:2', 'note': 'A4', 'duration': 2},
  ];
  
  const mainMelody = [
    {'time': 0, 'note': Math.pow(2, (76 - 69) / 12) * 440, 'duration': 5},
    // {'time': 6, 'note': Math.pow(2, (100 - 69) / 12) * 440, 'duration': 10},
    {'time': 0.1, 'note': Math.pow(2, (72 - 69) / 12) * 440, 'duration': '8n.'},
    {'time': 0.2, 'note': Math.pow(2, (74 - 69) / 12) * 440, 'duration': '8n'},
    {'time': 2.2, 'note': Math.pow(2, (72 - 69) / 12) * 440, 'duration': '8n.'},
    {'time': 2.4, 'note': Math.pow(2, (71 - 69) / 12) * 440, 'duration': '8n.'},
    {'time': 3, 'note': 440, 'duration': '8n'}, {'time': 3.2, 'note': 'A4', 'duration': '2n'}, 
    // {'time': '2:0', 'note': 'A4', 'duration': '8n'}, {'time': '2:0:2', 'note': 'G4', 'duration': '8n'}, {'time': '2:1', 'note': 'F4', 'duration': '8n'}, {'time': '2:2', 'note': 'A4', 'duration': '8n'}, {'time': '2:2:2', 'note': 'G4', 'duration': '8n'}, {'time': '2:3', 'note': 'E4', 'duration': '8n'}, {'time': '2:3:2', 'note': 'F4', 'duration': '2n'}, {'time': '4:0', 'note': 'G4', 'duration': '8n'}, {'time': '4:0:2', 'note': 'F4', 'duration': '8n'}, {'time': '4:1', 'note': 'D4', 'duration': '8n'}, {'time': '4:2', 'note': 'F4', 'duration': '8n'}, {'time': '4:2:2', 'note': 'A4', 'duration': '8n'}, {'time': '4:3', 'note': 'G4', 'duration': '8n'}, {'time': '4:3:2', 'note': 'A4', 'duration': '2n'}, {'time': '5:2:2', 'note': 'G4', 'duration': '8n'}, {'time': '5:3', 'note': 'A4', 'duration': '8n'}, {'time': '5:3:2', 'note': 'B4', 'duration': '8n'}, {'time': '6:0', 'note': 'C5', 'duration': '8n'}, {'time': '6:1', 'note': 'B4', 'duration': '8n'}, {'time': '6:1:2', 'note': 'A4', 'duration': '8n'}, {'time': '6:2', 'note': 'B4', 'duration': '8n'}, {'time': '6:2:2', 'note': 'A4', 'duration': '8n'}, {'time': '6:3', 'note': 'G4', 'duration': '8n'}, {'time': '6:3:2', 'note': 'A4', 'duration': 2},
  ];
  
  
  /* // Previously set Tone.start by a click
  document
    .querySelector(".musicInterface")
    ?.addEventListener("click", () => {
      // if (Tone.context.state !== "running") {
      //   Tone.start();
      //   console.log("audio is ready");
      // }
    });
  */


  // const beginningRecord =  [
  //   {"time":4.017052154,"note":69,"duration":4.82975056},{"time":7.140136054,"note":77,"duration":1.114557824},{"time":8.997732426,"note":85,"duration":0.185759632},{"time":9.102222222,"note":80,"duration":0.37151928},{"time":10.73922902,"note":72,"duration":5.20126984},{"time":10.73922902,"note":72,"duration":5.20126984},{"time":15.29034014,"note":69,"duration":4.272471648},{"time":16.8460771,"note":67,"duration":13.374693872},{"time":17.8677551,"note":67,"duration":0.185759632},{"time":19.73696145,"note":67,"duration":13.746213152}
  // ]
  
  
  const kickDrum = new Tone.MembraneSynth({
    volume: 6
  }).toDestination();
  const kicks = [ { time: 0 }, { time: 0.32 }, 
  { time: 0.51 }, { time: 0.52 }, { time: 1.1 }, { time: 1.2 }, 
  // { time: '3:0:2' }, { time: '3:1:' }, { time: '4:0' }, { time: '4:3:2' }, { time: '5:1' }, { time: '6:0' }, { time: '6:1:2' }, { time: '6:3:2' }, { time: '7:0:2' }, { time: '7:1:' }, 
  ];
  
/**
 * Seems like this is the right approach to play any types of notes. (unnecessary)
 */
function playTestMidi() {
    console.log("---- playTestMidi")
    Tone.Transport.stop();
    if (Tone.context.state !== "running") {
        Tone.start();
        console.log("audio is ready");
    }
    if (Tone.Transport.state !== "started") {
        Tone.Transport.start();
        console.log("Tone.Transport.start");
    } else {
        Tone.Transport.stop();
        console.log("Tone.Transport.stop");
    }
    Tone.Transport.bpm.value = 180; // Not necessary, but good to have... // normal bpm is slower

    // let musicPart = new Tone.Part(function (time, note) {
    //   synth2.triggerAttackRelease(note.note, note.duration, time );
    // }, mainMelody).start(0); // used to start at 0 but would bug

    mainMelody.forEach(tune => {
        const now = Tone.now()
        synth2.current.triggerAttackRelease(tune.note, tune.duration, now + tune.time)
    })


    // const testRecDB = new Tone.Part(function (time,note){
    //   synth2.triggerAttackRelease(note.note,note.duration,time);
    // },beginningRecord).start(now);

    // const kickPart = new Tone.Part(function (time) {
    //   const now = Tone.now()
    //   kickDrum.triggerAttackRelease("C1", "8n", now + time);
    // }, kicks).start(now);

    kicks.forEach(tune => {
        const now = Tone.now()
        kickDrum.triggerAttackRelease("C1", "8n", now + tune.time)
    })

    // *** Trying to stop the transport after playing
    // console.log("mainMelody[mainMelody.length-1].time: ",mainMelody[mainMelody.length-1].time)
    // console.log("now: ",now);
    // // console.log("now + mainMelody[mainMelody.length-1].time: "+ now + mainMelody[mainMelody.length-1].time)
    // // let [minutes, seconds, milliseconds] = mainMelody[mainMelody.length-1].time.split(":").map(Number);
    // // let totalSeconds = (minutes * 60) + seconds + (milliseconds / 1000);
    // // console.log("totalSeconds: ", totalSeconds,", now + totalSeconds: ", (now + totalSeconds));
    // const totalSeconds = mainMelody[mainMelody.length-1].time  ; // need to consider duration
    // console.log("now + totalSeconds: ",(now + totalSeconds));
    // Tone.Transport.stop(now + totalSeconds);
}

function playMidiDatabase(){
    Tone.Transport.stop();
    if (Tone.context.state !== "running") {
      Tone.start();
      console.log("audio is ready");
    }
  
    var d = getMusicMIDI("BGR0082-T1", localStorage?.username,transformToPlayfulFormat,playFormattedMusic);
    console.log("---- playMidiDatabase. d: ",d);
  }
  
  function playSampleMidiDatabase(){
    Tone.Transport.stop();
    if (Tone.context.state !== "running") {
      Tone.start();
      console.log("audio is ready");
    }
  
    var d = getSampleMIDI("BGR0082-T1", 0, 10,localStorage?.username, transformToPlayfulFormat,playFormattedMusic);
    console.log("---- playSampleMidiDatabase. d: ",d);
  }
  


{/* <div
          className="playMusic"
          onClick={(c) => {
            console.log("about to play sample from database");
            playSampleMidiDatabase();
            console.log("done with sample from database");
          }}
        >
          Play Test Sample Database Music
        </div>
        <div
          className="playMusic"
          onClick={(c) => {
            console.log("about to play music from database");
            playMidiDatabase();
            console.log("done with music from database");
          }}
        >
          Play Test Database Music
        </div> */}
        <div
          className="playMusic"
          onClick={(c) => {
            console.log("about to play music");
            playTestMidi();
            console.log("done with music");
          }}
        >
          Play Test MIDI Music
        </div>

  <div
  className="playMusic"
  onClick={(c) => {
    console.log("about to play synth");
    playSinth();
    console.log("done with synth");
  }}
>
  Play Test Synthetizers
</div>

             {/* {(listSearchRes.map((item, i) => {
              return (
                <div className='resMusicSearch'
                  key={i + '' + item.recording + '_' + item.arrNotes.toString().replaceAll(',', '-')} >
                  Recording: {item.recording}. Notes: {item.arrNotes.toString().replaceAll(',', '-')}. Distance match: {item.distCalc}
                </div>)
            })
            )}  */}
