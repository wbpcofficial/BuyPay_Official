import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import moment from "moment-timezone";

import { fetchUsers, deleteUser } from "../../services";
import { UserType } from "../../constants";
import { Link } from "react-router-dom";
import { getAuth, capitalize } from "../../utils";

const UserList = ({ history }) => {
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState("");
  const authUser = getAuth().user;

  async function loadUsers() {
    try {
      const response = await fetchUsers({ page, perPage, keyword });
      setUsers(response.users);
      setTotal(response.total);
    } catch (e) {}
  }

  useEffect(() => {
    loadUsers();
  }, [page, perPage, keyword]);

  const onChangePage = (newPage) => {
    setPage(newPage);
  };

  const onDeleteUser = async (user) => {
    if (authUser.role === UserType.Manager && user.role === UserType.Admin) {
      alert("You don't have permission to delete Admin user.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(user.id);
        loadUsers();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const startIndex = Math.min(perPage * (page - 1) + 1, total);
  const endIndex = Math.min(startIndex + perPage - 1, total);

  const renderTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, idx) => (
              <tr key={user.id}>
                <th>{startIndex + idx}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{capitalize(user.role)}</td>
                <td>{moment(user.createdAt).format("MM/DD/YYYY, HH:mm:ss")}</td>
                <td>
                  <Link to={`/users/${user.id}/edit`} className="btn">
                    <i className="fas fa-pen"></i>
                  </Link>
                  <button
                    className="btn"
                    onClick={() => onDeleteUser(user)}
                    disabled={user.id === authUser.id}
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
            <div className="card-header font-weight-bold">Manage Users</div>
            <div className="card-body">
              <div className="clearfix">
                <div className="bs-bars float-left">
                  <div id="toolbar">
                    <Link className="btn btn-primary" to="/users/new">
                      <i className="fa fa-plus"></i> Create new user
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
              {users && users.length === 0 && (
                <div className="text-center">
                  {keyword.length === 0
                    ? "There are no users yet."
                    : "No users found."}
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
export default UserList;
