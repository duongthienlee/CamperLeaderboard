import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campers: []
    };
  }

  componentDidMount() {
    this.loadRecent();
    this.loadAll();
  }
  reset() {
    this.setState({ campers: [] });
  }
  // -----------------------------------------Load Recent campers --------------------------------------------------
  loadRecent = () => {
    this.reset();
    fetch("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData[0].username);

        console.log(responseData.length);
        for (let i = 0, count = 0, l = responseData.length; i < l; i++) {
          count++;
          let username = responseData[i].username;

          let img = responseData[i].img;

          let recent = responseData[i].recent;

          let alltime = responseData[i].alltime;

          this.setState({
            campers: [
              ...this.state.campers,
              {
                username: username,
                img: img,
                recent: recent,
                alltime: alltime,
                count: count
              }
            ]
          });
        }
      });
  };

  // -----------------------------------------Load All Time campers --------------------------------------------------
  loadAll = () => {
    this.reset();
    fetch("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData[0].username);

        console.log(responseData.length);
        for (let i = 0, count = 0, l = responseData.length; i < l; i++) {
          count++;
          let username = responseData[i].username;

          let img = responseData[i].img;
          let recent = responseData[i].recent;

          let alltime = responseData[i].alltime;

          this.setState({
            campers: [
              ...this.state.campers,
              {
                username: username,
                img: img,
                recent: recent,
                alltime: alltime,
                count: count
              }
            ]
          });
        }
      });
  };
  // -----------------------------------------Render section ---------------------------------------------------------
  render() {
    return (
      <div className="container">
        <ReactTable
          data={this.state.campers}
          noDataText="Data is loading!"
          columns={[
            {
              Header: "Leaderboard",
              columns: [
                {
                  width: 35,
                  Header: "#",
                  accessor: "count"
                },
                {
                  width: 35,
                  Cell: row => {
                    return (
                      <div>
                        <img height={34} src={row.original.img} />
                      </div>
                    );
                  }
                },

                {
                  Header: "Camper Name",
                  Cell: row => {
                    return (        
                      <div>
                        <a href={'https://www.freecodecamp.org/'+row.original.username}>{row.original.username} </a>
                      </div>
                    );
                  }
                },
                {
                  Header: row => {
                    return (
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={this.loadRecent}
                        >
                          Points in past 30 days &dArr;
                        </button>
                      </div>
                    );
                  },
                  accessor: "recent"
                },
                {
                  Header: row => {
                    return (
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={this.loadAll}
                        >
                          All time points &dArr;
                        </button>
                      </div>
                    );
                  },
                  accessor: "alltime"
                }
              ]
            }
          ]}
          sortable={false}
          minRows={0}
          defaultPageSize={20}
          className="-striped -highlight "
        />
      </div>
    );
  }
}

export default App;
