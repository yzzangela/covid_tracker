const deathselement = document.querySelector(".deathcases .cases");
const totalcaseselement = document.querySelector(".totalcases .cases");
const countrynameelement= document.querySelector(".country .countryname");
const newdeathselement = document.querySelector(".deathcases .updatedcasestwo");
const newcaseselement =document.querySelector(".totalcases .updatedcasesone");
const ctx= document.getElementById("linechart").getContext("2d");

var appdata = [],
  caseslist = [],
  deathslist = [],
  deaths = [],
  formatedDates = [];

function geoplugin_countryCode() { return 'US'; }
let countrycode = geoplugin_countryCode();
var usercountry;
listofcountries.forEach((country) => {
  if (country.countrycode == countrycode) {
    usercountry = country.countryname;
  }});

function fetchData(country) {
  usercountry = country;
  countrynameelement.innerHTML = "Loading...";
 
  (caseslist= []),
    (deathslist= []),
    (dates = []),
    (formatedDates = []);

  var requestOptions ={
    method: "GET",
    redirect: "follow",};

  const api_fetch =async (country) => {
    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/confirmed",
      requestOptions)
      .then((res) => {
        return res.json();})
      .then((data) => {
        data.forEach((entry) => {
          dates.push(entry.Date);
          caseslist.push(entry.Cases);});});
    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/deaths",
      requestOptions)
      .then((res) => {
        return res.json();})
      .then((data) => {
        data.forEach((entry) => {
          deathslist.push(entry.Cases);});});
    updateUI();
  };
  api_fetch(country);
}
fetchData(usercountry);

function updateUI() {
  updateStats();
  axesLinearChart();
}

function updateStats() {
  const totalcases = caseslist[caseslist.length - 1];
  const updatedtotalcases = totalcases - caseslist[caseslist.length - 2];
  const totaldeaths = deathslist[deathslist.length - 1];
  const updateddeathscases = totaldeaths - deathslist[deathslist.length - 2];
  countrynameelement.innerHTML = usercountry;
  totalcaseselement.innerHTML = totalcases;
  newcaseselement.innerHTML = `${updatedtotalcases}`;
  deathselement.innerHTML = totaldeaths;
  newdeathselement.innerHTML = `${updateddeathscases}`;
  dates.forEach((date) => {formatedDates.push(formatDate(date));});}

function formatDate(dateString) {
  const nameofmonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var date = new Date(dateString);
  return `${date.getDate()} ${nameofmonths[date.getMonth()]}`;}

function axesLinearChart() {
  var linechart;
  if (linechart) {
    linechart.destroy();}

  linechart= new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Cases",
          data: caseslist,
          fill: false,
          borderColor: "#03d3fc",
          backgroundColor: "#03d3fc",
          borderWidth: 0.5,
        },
        {
          label: "Deaths",
          data: deathslist,
          fill: false,
          borderColor: "#ed0047",
          backgroundColor: "#ed0047",
          borderWidth: 0.5,
        },
      ],
      labels: formatedDates,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { 
        display: false ,
      }
    },
  });
}
