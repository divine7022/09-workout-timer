import { useEffect, useMemo, useState } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";

// this function that is inside the App component body dosn't actally use any reactive value so there is no need to reacreate this funtion on every render
function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format();
}

//DUE TO TIMER IS RERENDRIG ALL THE OTHER COMPONENT(i,e all the child componets ) are re rendering which are not re requerde to re render to we need to memorize the child componts to prevent them from rendering when ever timer clock changes.
function App() {
  const [allowSound, setAllowSound] = useState(true);
  const [time, setTime] = useState(formatTime(new Date()));

  // Will be be AM or PM

  // this is also the reactive value coz it depends on the time state, so we need to pass it as dependency in useMemo()
  const partOfDay = time.slice(-2);

  // here we need to pass a function[ () => return ] which react will then call on the  initial render.
  // so here due to the array nature in javascript, we actually need to create a function body and return this array from there.
  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  useEffect(function () {
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  // allowSound is a boolean value so it stays stable b/w the renders sice we memorized the ToggleSound and state setter function(setAllowSound) by default it stays stable(memorize) b/w the renders. So take care  about workout object by using useMemo( ).
  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

export default App;
