import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function HackathonBasic() {
  const [jobs, setJobs] = useState(() => {
    const listJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    return listJobs;
  });

  const [job, setJob] = useState("");
  const jobRef = useRef();
  const [nameEdit, setNameEdit] = useState("");

  const handleAddJob = (e) => {
    e.preventDefault();
    const newJob = {
      id: uuidv4(),
      status: false,
      nameJob: job,
      isEdit: false,
    };
    const newJobs = [...jobs, newJob];
    setJobs(newJob);
    localStorage.setItem("jobs", JSON.stringify(newJobs));
    jobRef.current.focus();
  };

  const handleCheck = (id) => {
    const updateJobs = jobs.map((job) => {
      if (job.id === id) {
        return { ...job, status: !job.status };
      }
      return job;
    });
    localStorage.setItem("jobs", JSON.stringify(updateJobs));
    setJobs(updateJobs);
  };

  const handleDelete = (id) => {
    const newJob = jobs.filter((job) => job.id !== id);
    localStorage.setItem("jobs", JSON.stringify(newJob));
    setJobs(newJob);
    jobRef.current.focus();
  };

  const handleShowEdit = (j) => {
    setNameEdit(j.nameJob);
    setJobs((prevJobs) => {
      return prevJobs.map((job) => {
        if (job.id === j.id) {
          return { ...job, isEdit: true };
        }
        return job;
      });
    });
  };

  const handleCancel = (id) => {
    setJobs((prevJobs) => {
      return prevJobs.map((job) => {
        if (job.id === id) {
          return { ...job, isEdit: false };
        }
        return job;
      });
    });
  };

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setNameEdit(value);
  };

  const handleSave = (id) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === id) {
        return { ...job, nameJob: nameEdit, isEdit: false };
      }
      return job;
    });

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };
  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div
            className="row d-flex justify-content-center align-items-center
              h-100"
          >
            <div className="col col-xl-10 ">
              <div className="card">
                <div className="card-body p-5 bg-danger">
                  <h2 style={{ textAlign: "left" }}>Todo List</h2>
                  <p style={{ textAlign: "left", fontSize: 14 }}>
                    Get things done, one item at a time
                    <hr style={{ marginBottom: 50, marginTop: 5 }} />
                  </p>
                  <div className="col col-xl-10 ">
                    <ul>
                      {jobs.map((job) => (
                        <>
                          {job.isEdit ? (
                            <>
                              <li key={job.id}>
                                <div>
                                  <input
                                    value={nameEdit}
                                    onChange={handleChangeInput}
                                    name="nameEdit"
                                    className="form-control list"
                                    type="text"
                                    style={{ width: "200px" }}
                                  />
                                </div>
                                <div className="d-flex gap-2">
                                  <button
                                    onClick={() => handleSave(job.id)}
                                    className="btn btn-warning"
                                  >
                                    Cập nhật
                                  </button>
                                  <button
                                    onClick={() => handleCancel(job.id)}
                                    className="btn btn-danger"
                                  >
                                    Hủy
                                  </button>
                                </div>
                              </li>
                            </>
                          ) : (
                            <>
                              <li
                                key={job.id}
                                className="list-group-item d-flex align-items-center border-0 mb-2 rounded justify-content-between list"
                                style={{ backgroundColor: "#f4f6f7" }}
                              >
                                <div>
                                  <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    checked={job.status === true}
                                    onChange={() => handleCheck(job.id)}
                                  />
                                  {job.status ? (
                                    <>
                                      <s style={{ color: "#333" }}>
                                        {job.nameJob}
                                      </s>
                                    </>
                                  ) : (
                                    <>
                                      <span style={{ color: "#333" }}>
                                        {job.nameJob}
                                      </span>
                                    </>
                                  )}
                                </div>
                                <div>
                                  <a
                                    onClick={(e) => handleShowEdit(job)}
                                    className="text-info"
                                    title="Sửa công việc"
                                    style={{ color: "#333 " }}
                                  >
                                    <i
                                      style={{ color: "#333 " }}
                                      className="fas fa-pencil-alt me-3"
                                    />
                                  </a>
                                  <a
                                    onClick={() => handleDelete(job.id)}
                                    className="text-danger"
                                    title="Xóa công việc"
                                  >
                                    <i
                                      style={{ color: "#333 " }}
                                      className="fas fa-trash-alt"
                                    />
                                  </a>
                                </div>
                              </li>
                            </>
                          )}
                        </>
                      ))}
                    </ul>
                  </div>
                  <form
                    className="d-flex justify-content-center
                              align-items-center mb-5"
                    onSubmit={handleAddJob}
                  >
                    <div className="form-outline flex-fill">
                      <label style={{ textAlign: "left" }}>
                        Add to the todo list
                      </label>
                      <input
                        type="text"
                        style={{ color: "black", width: 200, height: 40 }}
                        ref={jobRef}
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                      />
                    </div>
                    <button
                      style={{ marginTop: 27 }}
                      type="submit"
                      className="btn btn-outline-light"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
