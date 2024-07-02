import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Table, TableBody, TableRow, TableCell, Button } from "@dhis2/ui-core";
import ReactPaginate from "react-js-pagination";
import { CircularProgress } from "@material-ui/core";
import classes from "./App.module.css";
import Modal from "./common/Modal/Modal";
import "./Pagination.css"; // Custom CSS file for pagination
import { OPDService } from "./Services/api";

const Home = () => {
  const [options, setOptions] = useState([]);
  const [selectedProgramValue, setSelectedProgramValue] = useState("");
  const [event, setEvent] = useState([]);
  const [Data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [header1, setHeader1] = useState([]);
  const [result, setResult] = useState([]);
  const [searchValues, setSearchValues] = useState({});
  const [show, setShow] = useState({ value: false, id: "" });
  const [eventData, setEventData] = useState([]);
  const [programStages, setProgramStages] = useState([]);
  const [dataElements, setDataElements] = useState([]);
  const [programName, setProgramName] = useState("");

  const [darkMode, setDarkMode] = useState(true);
  const [modifyheader, setModifyheader] = useState([]);
  const [resultHeader, setResultHeader] = useState([]);
  const [pagesize, setPagesize] = useState(10);

  const componentRef = useRef(null);
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  //Table Excel funtion
  // const tableToExcel = (function () {
  //   var uri = "data:application/vnd.ms-excel;base64,",
  //     template =
  //       '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
  //     base64 = function (s) {
  //       return window.btoa(unescape(encodeURIComponent(s)));
  //     },
  //     format = function (s, c) {
  //       return s.replace(/{(\w+)}/g, function (m, p) {
  //         return c[p];
  //       });
  //     };
  //   return function (table, name, filename) {
  //     if (!table.nodeType) table = document.getElementById(table);

  //     var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
  //     document.getElementById("dlink").href =
  //       uri + base64(format(template, ctx));
  //     document.getElementById("dlink").download = `${name}.xls`;
  //     document.getElementById("dlink").click();
  //   };
  // })();

  const tableToExcel = (function () {
    var uri = "data:application/vnd.ms-excel;base64,",
      template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p];
        });
      };
    return function (table, name, filename) {
      if (!table.nodeType) table = document.getElementById(table);
      var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
      document.getElementById("dlink").href =
        uri + base64(format(template, ctx));
      document.getElementById("dlink").download = `${name}.xls`;
      document.getElementById("dlink").click();
    };
  })();

  useEffect(() => {
    if (show.value == true) {
      fetchRecords();
    }
  }, [show]);
  useEffect(() => {
    fetchProgramOptions();
    fetchRecordsAll();
  }, []);
  useEffect(() => {
    tableDatafetch();

    tableHeaderDatafetch();
  }, [selectedProgramValue]);
  useEffect(() => {
    HeaderData(header1);
    HeaderModify(modifyheader);
  }, [header1, modifyheader]);
  async function fetchRecordsAll() {
    const AllprogramStages = await OPDService.ProgramStages();
    const allDataElements = await OPDService.AllDataelement();
    const ModifyHeaderData = await OPDService.ModifyTableHeader();
    setProgramStages(AllprogramStages);
    setDataElements(allDataElements);
    setModifyheader(ModifyHeaderData);
  }

  async function fetchRecords() {
    const eventResponse = await OPDService.EventAPi(selectedProgramValue, show);

    setEventData(eventResponse);
  }
  async function fetchProgramOptions() {
    const programResponse = await OPDService.Programoptions();
    setOptions(programResponse?.listGrid?.rows);
  }
  async function tableDatafetch() {
    const allTableData = await OPDService.tableDataplot(selectedProgramValue);
    setEvent(allTableData?.trackedEntityInstances);
    setData(allTableData?.trackedEntityInstances?.length);
  }
  async function tableHeaderDatafetch() {
    const allTableHeaderData = await OPDService.tableHeaderData(
      selectedProgramValue
    );
    setHeader1(allTableHeaderData);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = pagesize; // Adjust this value to set the number of items per page

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const val = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    if (event !== undefined) {
      const filteredData = event
        .filter((ele) => {
          return Object.keys(searchValues).every((attributeId) => {
            const searchValue = searchValues[attributeId];
            const attribute = ele.attributes.find(
              (attr) => attr.attribute === attributeId
            );
            return (
              !searchValue ||
              (attribute && attribute.value.includes(searchValue))
            );
          });
        })
        .slice(indexOfFirstItem, indexOfLastItem);
      // console.log("filteredData>>>>>", filteredData);

      return filteredData.map((ele, index) => {
        return (
          <TableRow
            key={index}
            className={`${classes.zebraStriping} ${classes.borderRemove}`}
          >
            {header1?.programTrackedEntityAttributes?.map((attribute) => {
              //change here
              const matchedHeader = resultHeader.find((header) => {
                const final =
                  header?.attribute === attribute?.trackedEntityAttribute?.id;

                return final;
              });

              const colorId = matchedHeader?.attribute;

              const foundAttribute = ele.attributes.find(
                (attr) => attr.attribute === matchedHeader?.attribute
              );
              // const colorId = attribute?.trackedEntityAttribute?.id;

              // const foundAttribute = ele.attributes.find(
              //   (attr) =>
              //     attr.attribute === attribute?.trackedEntityAttribute?.id
              // );

              const TrackID = ele.trackedEntityInstance;
              // console.log("TrackID>>>", TrackID);
              return (
                <>
                  {matchedHeader &&
                  colorId === "EMY2mCFePQj" &&
                  foundAttribute &&
                  foundAttribute.value >= 4 ? (
                    <TableCell
                      key={attribute?.trackedEntityAttribute?.id}
                      className={`${classes.uniqueColorRed} ${classes.itemAlign} ${classes.borderRemove}`}
                    >
                      <div
                        onClick={() => setShow({ value: true, id: TrackID })}
                      >
                        {foundAttribute ? foundAttribute.value : ""}
                      </div>
                    </TableCell>
                  ) : matchedHeader &&
                    colorId === "EMY2mCFePQj" &&
                    foundAttribute &&
                    foundAttribute.value <= 4 ? (
                    <TableCell
                      key={attribute?.trackedEntityAttribute?.id}
                      className={`${classes.uniqueColorGreen} ${classes.itemAlign} ${classes.borderRemove}`}
                    >
                      <div
                        onClick={() => setShow({ value: true, id: TrackID })}
                      >
                        {foundAttribute ? foundAttribute.value : ""}
                      </div>
                    </TableCell>
                  ) : (
                    matchedHeader && (
                      <TableCell
                        key={attribute?.trackedEntityAttribute?.id}
                        className={`${classes.itemAlign} ${classes.borderRemove}`}
                      >
                        <div
                          onClick={() => setShow({ value: true, id: TrackID })}
                        >
                          {foundAttribute ? foundAttribute.value : ""}
                        </div>
                      </TableCell>
                    )
                  )}
                </>
              );
            })}
          </TableRow>
        );
      });
    } else {
      return null;
    }
  };

  const handleSelectChange = (e) => {
    const selectedValue = JSON.parse(e.target.value);

    setSelectedProgramValue(selectedValue.id);
    setProgramName(selectedValue.name);
  };
  const handleSearchChange = (attributeId, value) => {
    setSearchValues((prevSearchValues) => ({
      ...prevSearchValues,
      [attributeId]: value,
    }));
  };

  function HeaderData(header1) {
    const Blank = [];

    if (header1?.programTrackedEntityAttributes !== undefined) {
      for (var j = 0; j < header1.programTrackedEntityAttributes.length; j++) {
        if (
          header1.programTrackedEntityAttributes[j]?.trackedEntityAttribute
            ?.attributeValues !== undefined
        ) {
          for (
            var k = 0;
            k <
            header1.programTrackedEntityAttributes[j].trackedEntityAttribute
              .attributeValues.length;
            k++
          ) {
            if (
              header1.programTrackedEntityAttributes[j].trackedEntityAttribute
                .attributeValues[k]?.attribute?.code === "showInConsent" &&
              header1.programTrackedEntityAttributes[j].trackedEntityAttribute
                .attributeValues[k]?.value === "true"
            ) {
              const customIDAttribute = {
                attribute:
                  header1.programTrackedEntityAttributes[j]
                    .trackedEntityAttribute.id,
                displayName:
                  header1.programTrackedEntityAttributes[j]
                    .trackedEntityAttribute.name,
                value: "",
              };

              Blank.push(customIDAttribute);
              setResult(Blank);
              console.log("getting the Blank array data", Blank);
              // If you want to continue checking other elements, remove the 'return' statement
              // return;
            }
          }
        }
      }
    }
  }

  function HeaderModify(modifyheader) {
    const ModifyBlank = [];

    if (modifyheader.trackedEntityAttributes !== undefined) {
      for (var j = 0; j < modifyheader.trackedEntityAttributes.length; j++) {
        if (
          modifyheader.trackedEntityAttributes[j].attributeValues !== undefined
        ) {
          for (
            var k = 0;
            k < modifyheader.trackedEntityAttributes[j].attributeValues.length;
            k++
          ) {
            if (
              modifyheader?.trackedEntityAttributes[j]?.attributeValues[k]
                ?.attribute?.code === "showInLineListTEA" &&
              modifyheader?.trackedEntityAttributes[j]?.attributeValues[k]
                ?.value === "true"
            ) {
              const customIDAttribute = {
                attribute: modifyheader.trackedEntityAttributes[j].id,
                displayName: modifyheader.trackedEntityAttributes[j].name,
                value: "",
              };
              ModifyBlank.push(customIDAttribute);
              setResultHeader(ModifyBlank);
            }
          }
        }
      }
    }
  }

  const getNameProgameStage = (id) => {
    const programStage = programStages?.programStages?.find(
      (stage) => stage.id === id
    );
    return programStage ? programStage.name : "Unknown";
  };
  const getNameDataElement = (id) => {
    const dataelementName = dataElements?.dataElements?.find(
      (stage) => stage.id === id
    );
    return dataelementName ? dataelementName.name : "Unknown";
  };

  return (
    <>
      <div className={classes.container}>
        <div
          className={darkMode ? classes["dark-mode"] : classes["light-mode"]}
          style={{ overflow: "auto", borderRadius: "10px" }}
        >
          <div style={{ padding: "5px" }}>
            <div>
              {options.length > 0 && (
                <select
                  onChange={handleSelectChange}
                  style={{
                    marginRight: "5px",
                    background: darkMode ? "#474d84" : "#e9ecef",
                    color: darkMode ? "rgba(244, 244, 245, .6)" : "black",
                  }}
                >
                  <option value="">Select Program for Event List</option>
                  {options.map((option) => (
                    <option
                      key={option[0]}
                      value={JSON.stringify({ id: option[0], name: option[1] })}
                    >
                      {option[1]}
                    </option>
                  ))}
                </select>
              )}

              <button
                onClick={toggleMode}
                style={{
                  marginRight: "5px",
                  background: darkMode ? "#474d84" : "#e9ecef",
                  color: darkMode ? "rgba(244, 244, 245, .6)" : "black",
                }}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                style={{
                  marginRight: "5px",
                  background: darkMode ? "#474d84" : "#e9ecef",
                  color: darkMode ? "rgba(244, 244, 245, .6)" : "black",
                }}
                onClick={() => tableToExcel("report-table", "Timor Event List")}
              >
                Export Data
              </button>

              <select
                style={{
                  marginRight: "5px",
                  background: darkMode ? "#474d84" : "#e9ecef",
                  color: darkMode ? "rgba(244, 244, 245, .6)" : "black",
                }}
                onChange={(e) => setPagesize(Number(e.target.value))}
              >
                <option value="10">Show 10</option>
                <option value="50">Show 50</option>
                <option value="100">Show 100</option>
              </select>
            </div>

            <Modal show={show.value} onClose={() => setShow({ value: false })}>
              <Table
                className={darkMode ? classes.darkTable : classes.lightTable}
              >
                <TableRow>
                  <TableCell>Selected Program:</TableCell>
                  <TableCell>{programName ? programName : ""}</TableCell>
                </TableRow>
                {eventData?.events?.map((event, index) => (
                  <React.Fragment key={index}>
                    <TableRow className={classes.zebraStriping}>
                      <TableCell className={classes.borderRemove}>
                        Program Stage:
                      </TableCell>
                      <TableCell className={classes.borderRemove}>
                        {getNameProgameStage(event?.programStage)}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.zebraStriping}>
                      <TableCell className={classes.borderRemove}>
                        Event Date:
                      </TableCell>
                      <TableCell className={classes.borderRemove}>
                        {event.eventDate ? event.eventDate.split("T")[0] : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.zebraStriping}>
                      <TableCell className={classes.borderRemove}>
                        Status:
                      </TableCell>
                      <TableCell className={classes.borderRemove}>
                        {event.status}
                      </TableCell>
                    </TableRow>
                    {event?.dataValues?.length > 0 && (
                      <React.Fragment>
                        <TableRow className={classes.zebraStriping}>
                          <TableCell
                            colSpan={2}
                            style={{ marginLeft: "12px", lineHeight: "35px" }}
                            className={classes.borderRemove}
                          >
                            DataElements
                          </TableCell>
                        </TableRow>
                        {event?.dataValues?.map((dataValue, idx) => (
                          <TableRow key={idx} className={classes.zebraStriping}>
                            <TableCell className={classes.borderRemove}>
                              {getNameDataElement(dataValue?.dataElement)}:
                            </TableCell>
                            <TableCell className={classes.borderRemove}>
                              {dataValue.value === "true"
                                ? "YES"
                                : dataValue.value === "false"
                                ? "NO"
                                : dataValue.value}
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ))}
              </Table>
            </Modal>

            <div className={classes.desgin}>
              <a id="dlink"></a>
              <div id="report-table">
                <Table
                  className={darkMode ? classes.darkTable : classes.lightTable}
                >
                  <TableRow>
                    {header1?.programTrackedEntityAttributes?.map((ele) => {
                      const matchedHeader = resultHeader.find((header) => {
                        const final =
                          header?.displayName ===
                          ele?.trackedEntityAttribute?.name;

                        return final;
                      });

                      return (
                        <>
                          {matchedHeader && (
                            <TableCell
                              key={matchedHeader?.attribute}
                              style={{ whiteSpace: "nowrap" }}
                              className={classes.itemAlign}
                            >
                              {matchedHeader ? (
                                <b>{matchedHeader?.displayName}</b>
                              ) : // <b>{ele?.trackedEntityAttribute?.name}</b>
                              null}
                              {/* <b>{ele?.trackedEntityAttribute?.name}</b> */}
                            </TableCell>
                          )}
                        </>
                      );
                    })}
                  </TableRow>

                  <TableRow>
                    {header1?.programTrackedEntityAttributes?.map((ele) => {
                      const matchedHeader = resultHeader.find((header) => {
                        const final =
                          header?.displayName ===
                          ele?.trackedEntityAttribute?.name;

                        return final;
                      });

                      return (
                        <>
                          {matchedHeader && (
                            <TableCell
                              key={matchedHeader?.attribute}
                              style={{ whiteSpace: "nowrap" }}
                              className={
                                darkMode
                                  ? `${classes.searchBackground} ${classes.itemAlign}`
                                  : ` ${classes.itemAlign}`
                              }
                              // className={darkMode ? classes.darkTable : classes.lightTable}
                            >
                              <input
                                type="text"
                                placeholder={`Search ${matchedHeader?.displayName}`}
                                className={classes.searchBackgroundColor}
                                onChange={(e) =>
                                  handleSearchChange(
                                    matchedHeader?.attribute,
                                    e.target.value
                                  )
                                }
                              />
                            </TableCell>
                          )}
                        </>
                      );
                    })}
                  </TableRow>
                  {isLoading ? (
                    <div>
                      <CircularProgress />
                    </div>
                  ) : (
                    <TableBody className={classes.borderRemove}>
                      {val()}
                    </TableBody>
                  )}
                </Table>
              </div>
              <ReactPaginate
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={Data}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
