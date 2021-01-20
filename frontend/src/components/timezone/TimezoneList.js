import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import moment from "moment-timezone";

import { fetchTimezones, deleteTimezone } from "../../services";
import { Link } from "react-router-dom";
import { getAuth } from "../../utils";
import { UserType } from "../../constants";

const TimezoneList = ({ history }) => {
  const [timezones, setTimezones] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(moment());
  const [keyword, setKeyword] = useState("");
  const auth = getAuth();

  const isAdmin = auth && auth.user.role === UserType.Admin;

  async function loadTimezones() {
    try {
      const response = await fetchTimezones({ page, perPage, keyword });
      setTimezones(response.timezones);
      setTotal(response.total);
    } catch (e) {}
  }

  useEffect(() => {
    loadTimezones();
  }, [page, perPage, keyword]);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onChangePage = (newPage) => {
    setPage(newPage);
  };

  const onDeleteTimezone = async (timezoneId) => {
    if (window.confirm("Are you sure you want to delete this timezone?")) {
      try {
        await deleteTimezone(timezoneId);
        loadTimezones();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const startIndex = Math.min(perPage * (page - 1) + 1, total);
  const endIndex = Math.min(startIndex + perPage - 1, total);
  const localTimeOffset = new Date().getTimezoneOffset() / 60;
  const renderTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>City</th>
            <th>Diff to GMT</th>
            <th>Diff to Local</th>
            <th>Current Time</th>
            <th>Created By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {timezones &&
            timezones.map((timezone, idx) => (
              <tr key={timezone.id}>
                <th>{startIndex + idx}</th>
                <td>{timezone.name}</td>
                <td>{timezone.city}</td>
                <td>
                  {timezone.timeDiff > 0 ? "+" : ""}
                  {timezone.timeDiff}
                </td>
                <td>
                  {timezone.timeDiff + localTimeOffset > 0 ? "+" : ""}
                  {timezone.timeDiff + localTimeOffset}
                </td>

                <td>
                  <strong>
                    {now.utcOffset(timezone.timeDiff * 60).format("HH:mm:ss")}
                  </strong>
                  <br />
                  {now.utcOffset(timezone.timeDiff * 60).format("MMM DD")}
                </td>
                <td>{timezone.user.name}</td>
                <td>
                  <Link to={`/timezones/${timezone.id}/edit`} className="btn">
                    <i className="fas fa-pen"></i>
                  </Link>
                  <button
                    className="btn"
                    onClick={() => onDeleteTimezone(timezone.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header font-weight-bold">
              {isAdmin ? "All Timezones" : "My Timezones"}
            </div>
            <div className="card-body">
              <div className="clearfix">
                <div className="bs-bars float-left">
                  <div id="toolbar">
                    <Link className="btn btn-primary" to="/timezones/new">
                      <i className="fa fa-plus"></i> Create new timezone
                    </Link>
                  </div>
                </div>
                <div className=" float-right form-group has-search">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={keyword}
                    onChange={(event) => {
                      setKeyword(event.target.value);
                      setPage(1);
                    }}
                  />
                </div>
              </div>
              <div className="">{renderTable()}</div>
              {timezones && timezones.length === 0 && (
                <div className="text-center">
                  {keyword.length === 0
                    ? "There are no timezones yet."
                    : "No timezones found."}
                </div>
              )}
            </div>
            <div className="card-footer">
              <div className="float-right"></div>
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                innerClass="pagination float-right"
                prevPageText="‹"
                nextPageText="›"
                activePage={page}
                itemsCountPerPage={perPage}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                onChange={onChangePage}
              />
              <div className="float-right mx-4 mt-2">
                Showing ({startIndex} - {endIndex}) / {total}
              </div>
              <div className="float-right mr-2 mt-1">
                Show per page &nbsp;
                <select
                  className="form-control-sm"
                  value={perPage}
                  onChange={(event) => {
                    setPerPage(parseInt(event.target.value));
                    setPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TimezoneList;
