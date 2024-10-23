import ButtonSolidOverlay from "./components/buttons/ButtonSolidOverlay"
import CursorTracker from "./components/utils/CursorTracker"

function App() {
  return (
    <>
      <CursorTracker />
      <div className="App flex cg-10">
        <ButtonSolidOverlay />
        <ButtonSolidOverlay arrowIcon={true} text="Shop Now" />
        <ButtonSolidOverlay arrowIcon={true} />
      </div>
    </>
  )
}

export default App
