function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export class OPDService {}
_defineProperty(OPDService, "EventAPi", async (selectedProgramValue, show) => {
  const requestOptions = {
    method: 'GET'
  };
  let response = await fetch(`../../events.json?skipPaging=true&program=${selectedProgramValue}&trackedEntityInstance=${show.id}&fields=dataValues[dataElement,value],eventDate,programStage,status`, requestOptions);
  return response.json();
});
// static patientSMSnotify = async (body) => {
//     const { data } = await geneateABDMToken();
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${data.accessToken}`,
//             'X-CM-ID': 'sbx'
//         },
//         body: JSON.stringify(body)
//     }
//     let response = await fetch(PROXY_SERVER + ABDM_TOKEN_URL + "/patients/sms/notify2", requestOptions)
//     return response
// }
_defineProperty(OPDService, "ProgramStages", async () => {
  const requestOptions = {
    method: 'GET'
  };
  let response = await fetch(`../../programStages.json?paging=false&fields=id,name`, requestOptions);
  return response.json();
});
_defineProperty(OPDService, "AllDataelement", async () => {
  const requestOptions = {
    method: 'GET'
  };
  let response = await fetch(`../../dataElements.json?paging=false&domainType=TRACKER&fields=id,name`, requestOptions);
  return response.json();
});
_defineProperty(OPDService, "Programoptions", async () => {
  const requestOptions = {
    method: 'GET'
  };
  let response = await fetch(`../../29/sqlViews/oZAXWFlZgI7/data?paging=false`, requestOptions);
  return response.json();
});
_defineProperty(OPDService, "tableDataplot", async selectedProgramValue => {
  const requestOptions = {
    method: 'GET'
  };
  let response = await fetch(`../../trackedEntityInstances.json?ou=Fn51zf6ifbm&program=${encodeURIComponent(selectedProgramValue)}&ouMode=DESCENDANTS`, requestOptions);
  return response.json();
});
_defineProperty(OPDService, "tableHeaderData", async selectedProgramValue => {
  const requestOptions = {
    method: 'GET'
  };
  let response = await fetch(`../../programs/${selectedProgramValue}.json?fields=programTrackedEntityAttributes%5BtrackedEntityAttribute%5Bid,name,formName,attributeValues%5Battribute%5Bid,name,code%5D,value%5D%5D%5D`, requestOptions);
  return response.json();
});