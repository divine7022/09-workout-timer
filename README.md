## Redux library used

# Workout Timer App

This React application displays a dynamic workout timer with various workout options that change based on the time of day. The app is designed to prevent unnecessary re-renders and optimize performance using memoization techniques. 

## Features

- **Workout Timer**: Displays a live-updating time in `HH:MM:SS` format.
- **Dynamic Workouts**: Adjusts the workout options based on whether it's AM or PM.
- **Toggle Sounds**: Allows users to toggle sounds for the workout, with sound preferences retained across renders.
- **Performance Optimization**: Utilizes `useMemo` and `useEffect` hooks to prevent unnecessary re-renders, optimizing the app's performance.

## Components

### `App`
- The main component of the application.
- Maintains the current time (`time`) and sound preference (`allowSound`) state.
- Updates the time every second and displays different workout options based on the time of day (AM/PM).
- Renders the `ToggleSounds` and `Calculator` components with memoized props to prevent re-rendering.

### `Calculator`
- Receives the `workouts` list and `allowSound` as props to display workout details.
- Memoized to avoid re-rendering on every time update.

### `ToggleSounds`
- Provides a toggle button to enable or disable workout sounds.
- Receives `allowSound` and `setAllowSound` as props.

## Hooks Used

- **`useState`**: Manages the `time` and `allowSound` states.
- **`useEffect`**: Sets up an interval to update the `time` state every second.
- **`useMemo`**: Memoizes the `workouts` array to prevent re-creating the workout list on each render.

## Code Explanation

### Format Time Function
A `formatTime` function formats the time to display it in `MM/DD/YYYY HH:MM:SS` format. This function does not depend on any props or state, so it is defined outside of `App` to avoid unnecessary re-creation.

### `workouts` Array
The `workouts` array is memoized with `useMemo` since it changes only when `partOfDay` (AM/PM) changes. This prevents the `Calculator` component from re-rendering every second when `time` updates.

### Sound Toggle
`allowSound` is a boolean that remains stable between renders. The `ToggleSounds` component is passed this state along with its setter, `setAllowSound`, which by default remains stable across renders.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/workout-timer-app.git
2. Navigate to the project directory:
   ```bash
   cd workout-timer-app
3. Start the development server:
   ```bash
   npm install
4. Start the development server:
   ```bash
   npm start


