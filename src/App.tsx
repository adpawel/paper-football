import './App.css';
import SideBar from './components/SideBar';
import Pitch from './components/Pitch';
import WinnerInfoModal from './components/WinnerInfoModal';


const App = () => {

  return (
    <>
    <WinnerInfoModal />
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100 overflow-auto">
        <SideBar />
        <div className="col d-flex flex-column h-100">
          <main className="row">
              <div className="col pt-4 mt-4 d-flex justify-content-center">
                <Pitch />
              </div>
          </main>
        </div>
      </div>
    </div>
    </>
  );
};

export default App;