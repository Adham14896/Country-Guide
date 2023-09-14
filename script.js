let searchInput = document.querySelector(".search");
const btn = document.querySelector(".btn");
const results = document.querySelector(".results");
const getData = async function () {
  try {
    let countryName = searchInput.value;
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );

    if (!res.ok)
      throw new Error(`Could not fetch data 
    ${res.status}`);

    const data = await res.json();

    const html = `<img src="${data[0].flags.svg}" class="flag">
    <p class="country">${data[0].name.common}</p>
    <h3>Official Name: <p class="info">${data[0].name.official}</p></h3>
    <h3>Region:<p class="info">${data[0].region}</p></h3>
    <h3>Capital:<p class="info"> ${data[0].capital[0]}</p></h3>
    <h3>Population:<p class="info"> ${data[0].population}</p></h3>
    <h3>Subregion:<p class="info"> ${data[0].subregion}</p></h3>`;
    results.innerHTML = html;
    searchInput.value = "";
  } catch (err) {
    const manualErr = `<p class="error">${err}</p>`;
    results.innerHTML = manualErr;
    if (searchInput.value.length === 0) {
      searchInput.classList.add("empty-input");
      results.innerHTML = `<h3 class="error"> please Enter A valid Country Name ...!</h3>`;
    }
  }
};

btn.addEventListener("click", function () {
  getData();
  searchInput.classList.remove("empty-input");
});
