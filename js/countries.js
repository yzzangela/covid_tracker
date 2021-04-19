var listofcountries = [
    { countryname: 'USA', countrycode: 'US' },
    { countryname: 'India', countrycode: 'IN' },
    { countryname: 'Brazil', countrycode: 'BR' },
    { countryname: 'Spain', countrycode: 'ES' },
    { countryname: 'France', countrycode: 'FR' },
    { countryname: 'Italy', countrycode: 'IT' },
    { countryname: 'Russia', countrycode: 'RU' },
    { countryname: 'Turkey', countrycode: 'TR' },
    { countryname: 'Iran', countrycode: 'IR' },
    { countryname: 'Germany', countrycode: 'DE' },
    { countryname: 'UK', countrycode: 'GB' },
    { countryname: 'Poland', countrycode: 'PL' },
    { countryname: 'Colombia', countrycode: 'CO' },
    { countryname: 'Argentina', countrycode: 'AR' },
    { countryname: 'Mexico', countrycode: 'MX' },
    { countryname: 'Ukraine', countrycode: 'UA' },
    { countryname: 'Peru', countrycode: 'PE' },
    { countryname: 'Czechia', countrycode: 'CZ' },
    { countryname: 'Indonesia', countrycode: 'ID' },
    { countryname: 'South Africa', countrycode: 'ZA' },
    { countryname: 'Netherlands', countrycode: 'NL' },
    { countryname: 'Chile', countrycode: 'CL' },
    { countryname: 'Canada', countrycode: 'CA' },
    { countryname: 'Romania', countrycode: 'RO' },
    { countryname: 'Iraq', countrycode: 'IQ' },
    { countryname: 'Belgium', countrycode: 'BE' },
    { countryname: 'Philippines', countrycode: 'PH' },
    { countryname: 'Sweden', countrycode: 'SE' },
    { countryname: 'Pakistan', countrycode: 'PK' },
    { countryname: 'Portugal', countrycode: 'PT' }
];

const searchcountryelement = document.querySelector(".searchcountry");
const countrylistelement= document.querySelector(".listofcountries");
const input = document.getElementById('searchinput');
const changcountrybtn= document.querySelector(".changecountry");

var numberofullists = 1;
createCountryList();
var value = input.value.toUpperCase();

function createCountryList(){
    const numberofcountries= listofcountries.length;
    var i = 0;
    var ullistid =`list-${i}`;

    listofcountries.forEach( (country, index) => {
        if(index % Math.ceil(numberofcountries/numberofullists) ==0){
            countrylistelement.innerHTML += `<ul id='${ullistid}'></ul>`;
            i++;}

        document.getElementById(`${ullistid}`).innerHTML += `
            <li onclick="fetchData('${country.countryname}')" id="${country.countryname}">
            ${country.countryname}
            </li>`;})}

input.addEventListener("input", function(){
    let value = input.value.toUpperCase();
    
    listofcountries.forEach( country => {
        if( country.countryname.toUpperCase().startsWith(value)){
            document.getElementById(country.countryname).classList.remove("hide");
        }else{
            document.getElementById(country.countryname).classList.add("hide");}})});

changcountrybtn.addEventListener("click", function(){
    input.value = "";
    resetCountryList();
    searchcountryelement.classList.add("fadeIn");
    searchcountryelement.classList.toggle("hide");});

countrylistelement.addEventListener("click", function(){
    searchcountryelement.classList.toggle("hide");});

function resetCountryList(){
    listofcountries.forEach( country => {
        document.getElementById(country.countryname).classList.remove("hide");})}
