import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentTable = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { name: "Country Name", selector: (row) => row.name },
    { name: "Country Native Name", selector: (row) => row.nativeName },
    { name: "Country Capital", selector: (row) => row.captial },
    {
      name: "Country Flag",
      selector: (row) => <img width={50} height={50} src={row.flag} />,
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Show",
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilteredCountries(result);
  }, [search]);

  return (
    <>
      <div className="w-100 px-5">
        <div className="pt-5">
          <h2>Countries</h2>
        </div>
        <div className="data-table">
          <DataTable
            className="position-relative"
            columns={columns}
            data={filteredCountries}
            pagination
            paginationIconNext=""
            paginationIconPrevious=""
            paginationIconFirstPage=""
            paginationIconLastPage=""
            paginationComponentOptions={paginationComponentOptions}
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 240px)"
            highlightOnHover
            onRowClicked={() => alert("clicked")}
            subHeader
            subHeaderComponent={
              <div className="w-100 d-flex">
                <input
                  type="text"
                  placeholder="Search country"
                  className="w-25 form-control"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  data-toggle="modal"
                  className="btn btn-success"
                  type="button"
                  data-target="#exampleModal"
                  style={{ marginLeft: "20px" }}
                >
                  + Add New
                </button>
                {/* modal - not working */}
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Modal title
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">...</div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" class="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <span
            className="position-absolute"
            style={{
              right: "210px",
              bottom: "55px",
              width: "100px",
              background: "white",
            }}
          >
            entries
          </span>
        </div>
      </div>
    </>
  );
};

export default StudentTable;
