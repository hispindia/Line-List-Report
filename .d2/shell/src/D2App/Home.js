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
  var _eventData$events, _header1$programTrack7, _header1$programTrack8;
  const [options, setOptions] = useState([]);
  const [selectedProgramValue, setSelectedProgramValue] = useState("");
  const [event, setEvent] = useState([]);
  const [Data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [header1, setHeader1] = useState([]);
  const [result, setResult] = useState([]);
  const [searchValues, setSearchValues] = useState({});
  const [show, setShow] = useState({
    value: false,
    id: ""
  });
  const [eventData, setEventData] = useState([]);
  const [programStages, setProgramStages] = useState([]);
  const [dataElements, setDataElements] = useState([]);
  const [programName, setProgramName] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  const componentRef = useRef(null);
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  //Table Excel funtion
  const tableToExcel = function () {
    var uri = "data:application/vnd.ms-excel;base64,",
      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
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
      var ctx = {
        worksheet: name || "Worksheet",
        table: table.innerHTML
      };
      document.getElementById("dlink").href = uri + base64(format(template, ctx));
      document.getElementById("dlink").download = `${name}.xls`;
      document.getElementById("dlink").click();
    };
  }();
  console.log("programStages>>>>>>>", programStages);
  console.log("eventData>>>>>", eventData);
  console.log("dataElements>>>>>>", dataElements);
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
  }, [header1]);
  async function fetchRecordsAll() {
    const AllprogramStages = await OPDService.ProgramStages();
    const allDataElements = await OPDService.AllDataelement();
    setProgramStages(AllprogramStages);
    setDataElements(allDataElements);
  }
  async function fetchRecords() {
    const eventResponse = await OPDService.EventAPi(selectedProgramValue, show);
    setEventData(eventResponse);
  }
  async function fetchProgramOptions() {
    var _programResponse$list;
    const programResponse = await OPDService.Programoptions();
    setOptions(programResponse === null || programResponse === void 0 ? void 0 : (_programResponse$list = programResponse.listGrid) === null || _programResponse$list === void 0 ? void 0 : _programResponse$list.rows);
  }
  async function tableDatafetch() {
    var _allTableData$tracked;
    const allTableData = await OPDService.tableDataplot(selectedProgramValue);
    setEvent(allTableData === null || allTableData === void 0 ? void 0 : allTableData.trackedEntityInstances);
    setData(allTableData === null || allTableData === void 0 ? void 0 : (_allTableData$tracked = allTableData.trackedEntityInstances) === null || _allTableData$tracked === void 0 ? void 0 : _allTableData$tracked.length);
  }
  async function tableHeaderDatafetch() {
    const allTableHeaderData = await OPDService.tableHeaderData(selectedProgramValue);
    setHeader1(allTableHeaderData);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this value to set the number of items per page

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };
  // var val = () => {
  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // //   const currentData = event(indexOfFirstItem, indexOfLastItem);
  // //  {console.log("currrrrrr",currentData)}
  //   if (event != undefined) {
  //     const v = event.map((ele, index) => {
  //      {console.log("777",ele)}
  //       if (ele) {
  //         var proId = ele.program;
  //         var name = [],
  //           attribute = [],
  //           // data = [],
  //           date = [];
  //           const data = ele.attributes;
  //           // setData(data.length)

  //         //date['value'] =  JSON.stringify(new Date(ele.eventDate)).slice(1,11);
  //         // date["value"] = ele.eventDate.substring(0, 10);

  //         // for (let program of options) {
  //         //   if (program.id == proId) {
  //         //     name["value"] = program.name;
  //         //   }
  //         // }

  //         // sashikat
  //         // for (let value of ele.attributes) {
  //         //   attribute["0"] = name;
  //         //   if (value.attribute == "oh9MPiyR2Vl") {
  //         //     attribute["1"] = value;
  //         //   }
  //         //   if (value.attribute == "HkdYrf7NPbr") {
  //         //     attribute["2"] = value;
  //         //   }
  //         //   if (value.attribute == "ssCmTkWjung") {
  //         //     attribute["3"] = value;
  //         //   }
  //         //   if (value.attribute == "hAfeN4FmzHa") {
  //         //     attribute["4"] = value;
  //         //   }

  //         // for(let i=0; i< atrribeyesArr.length; i++){
  //         //   attribute.push({i:atrribeyesArr[i]})
  //         // }

  //         // }
  //         // if (!attribute["1"]) {
  //         //   let data = [{ value: "" }];
  //         //   attribute["1"] = data;
  //         // }
  //         // if (!attribute["2"]) {
  //         //   let data = [{ value: "" }];
  //         //   attribute["2"] = data;
  //         // }
  //         // if (!attribute["3"]) {
  //         //   let data = [{ value: "" }];
  //         //   attribute["3"] = data;
  //         // }
  //         // if (!attribute["4"]) {
  //         //   let data = [{ value: "" }];
  //         //   attribute["4"] = data;
  //         // }

  //         console.log('data',data)
  //         // console.log("DATA",Data)
  //         return (
  //           <>
  //             {data.length ? (
  //               <TableRow>
  //                 {data.map((ele) => (
  //                   <>
  //                   <TableCell>{ele.value}</TableCell>

  //                   </>
  //                 ))}
  //                 {/* <Button primary={true} onClick={() => onEdit(ele.orgUnit, ele.event, ele.dataValues)}>Edit</Button> */}
  //               </TableRow>
  //             ) : (
  //               ""
  //             )}
  //           </>
  //         );
  //       }
  //     });
  //     return v;
  //   }
  // };

  // const val = () => {
  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //   if (event !== undefined) {
  //     const filteredData = event
  //       .filter((ele) => {
  //         return Object.keys(searchValues).every((attributeId) => {
  //           const searchValue = searchValues[attributeId];
  //           const attribute = ele.attributes.find(
  //             (attr) => attr.attribute === attributeId
  //           );
  //           return (
  //             !searchValue ||
  //             (attribute && attribute.value.includes(searchValue))
  //           );
  //         });
  //       })
  //       .slice(indexOfFirstItem, indexOfLastItem);

  //     return filteredData.map((ele, index) => (
  //       <TableRow key={index}>
  //         {ele.attributes.map((attr, attrIndex) => (
  //           <TableCell key={attrIndex}>{attr.value}</TableCell>
  //         ))}
  //       </TableRow>
  //     ));
  //   } else {
  //     return null; // Handle case where event is undefined or empty
  //   }
  // };
  const val = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    if (event !== undefined) {
      const filteredData = event.filter(ele => {
        return Object.keys(searchValues).every(attributeId => {
          const searchValue = searchValues[attributeId];
          const attribute = ele.attributes.find(attr => attr.attribute === attributeId);
          return !searchValue || attribute && attribute.value.includes(searchValue);
        });
      }).slice(indexOfFirstItem, indexOfLastItem);
      console.log("filteredData>>>>>", filteredData);
      return filteredData.map((ele, index) => {
        var _header1$programTrack;
        return /*#__PURE__*/React.createElement(TableRow, {
          key: index,
          className: classes.zebraStriping
        }, header1 === null || header1 === void 0 ? void 0 : (_header1$programTrack = header1.programTrackedEntityAttributes) === null || _header1$programTrack === void 0 ? void 0 : _header1$programTrack.map(attribute => {
          var _attribute$trackedEnt, _attribute$trackedEnt2, _attribute$trackedEnt4, _attribute$trackedEnt5, _attribute$trackedEnt6;
          console.log("ele>>>>>>>>>>", attribute === null || attribute === void 0 ? void 0 : (_attribute$trackedEnt = attribute.trackedEntityAttribute) === null || _attribute$trackedEnt === void 0 ? void 0 : _attribute$trackedEnt.id);
          const colorId = attribute === null || attribute === void 0 ? void 0 : (_attribute$trackedEnt2 = attribute.trackedEntityAttribute) === null || _attribute$trackedEnt2 === void 0 ? void 0 : _attribute$trackedEnt2.id;
          const foundAttribute = ele.attributes.find(attr => {
            var _attribute$trackedEnt3;
            return attr.attribute === (attribute === null || attribute === void 0 ? void 0 : (_attribute$trackedEnt3 = attribute.trackedEntityAttribute) === null || _attribute$trackedEnt3 === void 0 ? void 0 : _attribute$trackedEnt3.id);
          });
          console.log("foundAttribute>>>>", foundAttribute);
          const TrackID = ele.trackedEntityInstance;
          console.log("TrackID>>>", ele);
          return /*#__PURE__*/React.createElement(React.Fragment, null, colorId === "EMY2mCFePQj" && foundAttribute && foundAttribute.value >= 4 ? /*#__PURE__*/React.createElement(TableCell, {
            key: attribute === null || attribute === void 0 ? void 0 : (_attribute$trackedEnt4 = attribute.trackedEntityAttribute) === null || _attribute$trackedEnt4 === void 0 ? void 0 : _attribute$trackedEnt4.id,
            className: `${classes.uniqueColorRed} ${classes.itemAlign}`
          }, /*#__PURE__*/React.createElement("div", {
            onClick: () => setShow({
              value: true,
              id: TrackID
            })
          }, foundAttribute ? foundAttribute.value : "")) : colorId === "EMY2mCFePQj" && foundAttribute && foundAttribute.value <= 4 ? /*#__PURE__*/React.createElement(TableCell, {
            key: attribute === null || attribute === void 0 ? void 0 : (_attribute$trackedEnt5 = attribute.trackedEntityAttribute) === null || _attribute$trackedEnt5 === void 0 ? void 0 : _attribute$trackedEnt5.id,
            className: `${classes.uniqueColorGreen} ${classes.itemAlign}`
          }, /*#__PURE__*/React.createElement("div", {
            onClick: () => setShow({
              value: true,
              id: TrackID
            })
          }, foundAttribute ? foundAttribute.value : "")) : /*#__PURE__*/React.createElement(TableCell, {
            key: attribute === null || attribute === void 0 ? void 0 : (_attribute$trackedEnt6 = attribute.trackedEntityAttribute) === null || _attribute$trackedEnt6 === void 0 ? void 0 : _attribute$trackedEnt6.id,
            className: classes.itemAlign
          }, /*#__PURE__*/React.createElement("div", {
            onClick: () => setShow({
              value: true,
              id: TrackID
            })
          }, foundAttribute ? foundAttribute.value : "")));
        }));
      });
    } else {
      return null;
    }
  };
  const handleSelectChange = e => {
    const selectedValue = JSON.parse(e.target.value);
    setSelectedProgramValue(selectedValue.id);
    setProgramName(selectedValue.name);
  };
  const handleSearchChange = (attributeId, value) => {
    setSearchValues(prevSearchValues => ({
      ...prevSearchValues,
      [attributeId]: value
    }));
  };
  function HeaderData(header1) {
    const Blank = [];
    if ((header1 === null || header1 === void 0 ? void 0 : header1.programTrackedEntityAttributes) !== undefined) {
      for (var j = 0; j < header1.programTrackedEntityAttributes.length; j++) {
        var _header1$programTrack2, _header1$programTrack3;
        if (((_header1$programTrack2 = header1.programTrackedEntityAttributes[j]) === null || _header1$programTrack2 === void 0 ? void 0 : (_header1$programTrack3 = _header1$programTrack2.trackedEntityAttribute) === null || _header1$programTrack3 === void 0 ? void 0 : _header1$programTrack3.attributeValues) !== undefined) {
          for (var k = 0; k < header1.programTrackedEntityAttributes[j].trackedEntityAttribute.attributeValues.length; k++) {
            var _header1$programTrack4, _header1$programTrack5, _header1$programTrack6;
            if (((_header1$programTrack4 = header1.programTrackedEntityAttributes[j].trackedEntityAttribute.attributeValues[k]) === null || _header1$programTrack4 === void 0 ? void 0 : (_header1$programTrack5 = _header1$programTrack4.attribute) === null || _header1$programTrack5 === void 0 ? void 0 : _header1$programTrack5.code) === "showInConsent" && ((_header1$programTrack6 = header1.programTrackedEntityAttributes[j].trackedEntityAttribute.attributeValues[k]) === null || _header1$programTrack6 === void 0 ? void 0 : _header1$programTrack6.value) === "true") {
              const customIDAttribute = {
                attribute: header1.programTrackedEntityAttributes[j].trackedEntityAttribute.id,
                displayName: header1.programTrackedEntityAttributes[j].trackedEntityAttribute.name,
                value: ""
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

  const getNameProgameStage = id => {
    var _programStages$progra;
    const programStage = programStages === null || programStages === void 0 ? void 0 : (_programStages$progra = programStages.programStages) === null || _programStages$progra === void 0 ? void 0 : _programStages$progra.find(stage => stage.id === id);
    return programStage ? programStage.name : "Unknown";
  };
  const getNameDataElement = id => {
    var _dataElements$dataEle;
    const dataelementName = dataElements === null || dataElements === void 0 ? void 0 : (_dataElements$dataEle = dataElements.dataElements) === null || _dataElements$dataEle === void 0 ? void 0 : _dataElements$dataEle.find(stage => stage.id === id);
    return dataelementName ? dataelementName.name : "Unknown";
  };
  console.log("header1?.programTrackedEntityAttributes>>>>", header1 === null || header1 === void 0 ? void 0 : header1.programTrackedEntityAttributes);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: classes.container
  }, /*#__PURE__*/React.createElement("div", {
    className: darkMode ? classes["dark-mode"] : classes["light-mode"],
    style: {
      overflow: "auto",
      borderRadius: "10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "5px"
    }
  }, /*#__PURE__*/React.createElement("div", null, options.length > 0 && /*#__PURE__*/React.createElement("select", {
    onChange: handleSelectChange
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select Program for Event List"), options.map(option => /*#__PURE__*/React.createElement("option", {
    key: option[0],
    value: JSON.stringify({
      id: option[0],
      name: option[1]
    })
  }, option[1]))), /*#__PURE__*/React.createElement("button", {
    onClick: toggleMode
  }, darkMode ? "Light Mode" : "Dark Mode"), /*#__PURE__*/React.createElement("button", {
    onClick: () => tableToExcel("report-table", "Timor Event List")
  }, "Export Data")), /*#__PURE__*/React.createElement(Modal, {
    show: show.value,
    onClose: () => setShow({
      value: false
    })
  }, /*#__PURE__*/React.createElement(Table, {
    className: darkMode ? classes.darkTable : classes.lightTable
  }, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null, "Selected Program:"), /*#__PURE__*/React.createElement(TableCell, null, programName ? programName : "")), eventData === null || eventData === void 0 ? void 0 : (_eventData$events = eventData.events) === null || _eventData$events === void 0 ? void 0 : _eventData$events.map((event, index) => {
    var _event$dataValues, _event$dataValues2;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null, "Program Stage:"), /*#__PURE__*/React.createElement(TableCell, null, getNameProgameStage(event === null || event === void 0 ? void 0 : event.programStage))), /*#__PURE__*/React.createElement(TableRow, {
      className: classes.zebraStriping
    }, /*#__PURE__*/React.createElement(TableCell, null, "Event Date:"), /*#__PURE__*/React.createElement(TableCell, null, event.eventDate ? event.eventDate.split("T")[0] : "")), /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableCell, null, "Status:"), /*#__PURE__*/React.createElement(TableCell, null, event.status)), (event === null || event === void 0 ? void 0 : (_event$dataValues = event.dataValues) === null || _event$dataValues === void 0 ? void 0 : _event$dataValues.length) > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "DataElements"), /*#__PURE__*/React.createElement(TableRow, {
      className: classes.zebraStriping
    }, event === null || event === void 0 ? void 0 : (_event$dataValues2 = event.dataValues) === null || _event$dataValues2 === void 0 ? void 0 : _event$dataValues2.map((dataValue, idx) => /*#__PURE__*/React.createElement(TableRow, {
      key: idx,
      className: classes.zebraStriping
    }, /*#__PURE__*/React.createElement(TableCell, null, getNameDataElement(dataValue === null || dataValue === void 0 ? void 0 : dataValue.dataElement), ":"), /*#__PURE__*/React.createElement(TableCell, null, " ", dataValue.value))))));
  }))), /*#__PURE__*/React.createElement("div", {
    className: classes.desgin
  }, /*#__PURE__*/React.createElement("a", {
    id: "dlink"
  }), /*#__PURE__*/React.createElement("div", {
    id: "report-table"
  }, /*#__PURE__*/React.createElement(Table, {
    className: darkMode ? classes.darkTable : classes.lightTable
  }, /*#__PURE__*/React.createElement(TableRow, null, header1 === null || header1 === void 0 ? void 0 : (_header1$programTrack7 = header1.programTrackedEntityAttributes) === null || _header1$programTrack7 === void 0 ? void 0 : _header1$programTrack7.map(ele => {
    var _ele$trackedEntityAtt, _ele$trackedEntityAtt2;
    return /*#__PURE__*/React.createElement(TableCell, {
      key: ele === null || ele === void 0 ? void 0 : (_ele$trackedEntityAtt = ele.trackedEntityAttribute) === null || _ele$trackedEntityAtt === void 0 ? void 0 : _ele$trackedEntityAtt.id,
      style: {
        whiteSpace: "nowrap"
      },
      className: classes.itemAlign
    }, /*#__PURE__*/React.createElement("b", null, ele === null || ele === void 0 ? void 0 : (_ele$trackedEntityAtt2 = ele.trackedEntityAttribute) === null || _ele$trackedEntityAtt2 === void 0 ? void 0 : _ele$trackedEntityAtt2.name));
  })), /*#__PURE__*/React.createElement(TableRow, null, header1 === null || header1 === void 0 ? void 0 : (_header1$programTrack8 = header1.programTrackedEntityAttributes) === null || _header1$programTrack8 === void 0 ? void 0 : _header1$programTrack8.map(ele => {
    var _ele$trackedEntityAtt3, _ele$trackedEntityAtt4, _ele$trackedEntityAtt5;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: ele === null || ele === void 0 ? void 0 : (_ele$trackedEntityAtt3 = ele.trackedEntityAttribute) === null || _ele$trackedEntityAtt3 === void 0 ? void 0 : _ele$trackedEntityAtt3.id
    }, /*#__PURE__*/React.createElement(TableCell, {
      key: ele === null || ele === void 0 ? void 0 : (_ele$trackedEntityAtt4 = ele.trackedEntityAttribute) === null || _ele$trackedEntityAtt4 === void 0 ? void 0 : _ele$trackedEntityAtt4.id,
      style: {
        whiteSpace: "nowrap"
      },
      className: darkMode ? `${classes.searchBackground} ${classes.itemAlign}` : ` ${classes.itemAlign}`
      // className={darkMode ? classes.darkTable : classes.lightTable}
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      placeholder: `Search ${ele === null || ele === void 0 ? void 0 : (_ele$trackedEntityAtt5 = ele.trackedEntityAttribute) === null || _ele$trackedEntityAtt5 === void 0 ? void 0 : _ele$trackedEntityAtt5.name}`,
      onChange: e => {
        var _ele$trackedEntityAtt6;
        return handleSearchChange(ele === null || ele === void 0 ? void 0 : (_ele$trackedEntityAtt6 = ele.trackedEntityAttribute) === null || _ele$trackedEntityAtt6 === void 0 ? void 0 : _ele$trackedEntityAtt6.id, e.target.value);
      }
    })));
  })), isLoading ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CircularProgress, null)) : /*#__PURE__*/React.createElement(TableBody, null, val()))), /*#__PURE__*/React.createElement(ReactPaginate, {
    activePage: currentPage,
    itemsCountPerPage: itemsPerPage,
    totalItemsCount: Data,
    pageRangeDisplayed: 5,
    onChange: handlePageChange,
    itemClass: "page-item",
    linkClass: "page-link"
  }))))));
};
export default Home;