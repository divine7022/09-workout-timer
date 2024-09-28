import { memo, useCallback, useEffect, useState } from "react";
// to use a sound import a sound file that you created in the form of m4a.
// import that and store it some variable(clickSound)
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);

  const [duration, setDuration] = useState(0);

  // const playSound = useCallback(
  //   function () {
  //     if (!allowSound) return;
  //     // after imorting file we can use that using Audio api from the browser.(this is just a browser feature)
  //     // this then create a new audio which we just called sound and then on that can call the play() method.
  //     const sound = new Audio(clickSound);
  //     sound.play(); // let's use this function in order to paly this sound each time that the duration(state) updates.
  //   },
  //   [allowSound]
  // );

  // we are using useEffect to keep this duration in sync with all this other state variables
  useEffect(
    function () {
      setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    },
    [number, sets, speed, durationBreak]
  );

  // this is one use case that we can say that for every side effect we should have one useEffect() [ to have better knowledge watch part-4 (17)]
  useEffect(
    function () {
      const playSound = function () {
        if (!allowSound) return;
        const sound = new Audio(clickSound);
        sound.play();
      };
      playSound();
    },

    [duration, allowSound]
  );

  // we can do this with useState() also if we did it then the title will only be update at the initial render . so to keep the in sync(to be update when ever the number changes ) we need to use useEffect( ).
  useEffect(
    function () {
      document.title = `Your ${number}-exercise workout`;
    },
    [number]
  );

  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  function handleInc() {
    // we are using a floor() coz if we are the situation 76:30 sec then it round it off to 80:00
    setDuration((duration) => Math.floor(duration) + 1);
  }
  function handleDec() {
    // we are using a ceil() coz if we are the situation 76:30 sec then it round it off to 75:00
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => {
              setDurationBreak(e.target.value);
              // if we do this right here then we have to do this in all event handleres so it is better to do this using useEffect coz if pass all the eventhandler in dependency array it will update the duration when ever the any dependency changes.[basically to keep duration in sync with eventhandlers]
              // setDuration(
              //   (number * sets * speed) / 60 + (sets - 1) * e.target.value
              // );
            }}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
