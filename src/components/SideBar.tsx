import Theme from "./Theme";

const handleChangeColor = (color: string): void => {
    if (color === "Color") {
      document.body.style.backgroundColor = "#a0c4f4";
    }
    else if (color === "White") {
      document.body.style.backgroundColor = "#ffffff";
    }
    else if(color === "Dark") {
      document.body.style.backgroundColor = "#000000";
    }
  };

  const SideBar = () => {
    return (
      <>
        <div className="col-12 col-sm-4 col-xl-3 px-sm-2 px-0 bg-dark d-flex sticky-top">
            <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
                <a href="/" className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5">P<span className="d-none d-sm-inline">aper Football Game</span></span>
                </a>
                <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <a href="#" className="nav-link px-sm-0 px-2">
                            <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Home</span>
                        </a>
                    </li>
                    <hr/>
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-sm-0 px-2">
                            <i className="fs-5 bi-speedometer2"></i><span className="ms-1 d-none d-sm-inline">Players</span> </a>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Player1" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Submit</button>
                            </form>
                            <hr/>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Player2" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Submit</button>
                            </form>
                    </li>
                    <hr/>
                    <li>
                        <a href="#" className="nav-link px-sm-0 px-2">
                            <i className="fs-5 bi-table"></i><span className="ms-1 d-none d-sm-inline">Stats</span></a>
                    </li>
                </ul>
                <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        {/* <img src="https://github.com/mdo.png" alt="hugenerd" width="28" height="28" className="rounded-circle"> */}
                        <span className="d-none d-sm-inline mx-1">Theme</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <Theme color="White" onChangeColor={handleChangeColor} />
                        <Theme color="Dark" onChangeColor={handleChangeColor} />
                        <Theme color="Color" onChangeColor={handleChangeColor} />
                    </ul>
                </div>
            </div>
        </div>
      </>
    );
  };
  
  export default SideBar;
  