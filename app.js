const continentSelect = document.querySelector('#continent-select')
const countriesList = document.querySelector('#countries-list')

const URL = "https://countries.trevorblades.com/"
const query = `
query{
    continents{
        name
        code
    }
}
`

const continentCountriesQuery = `
query getCountries($code :ID!){
    continent(code: $code ){
      countries{
        name
        capital
        code
      }
    }
  }
`
queryFetch(query)
    .then(data => {
        data.data.continents.forEach(continent => {
            const optionELement = document.createElement('option')
            optionELement.value = continent.code
            optionELement.innerText = continent.name
            continentSelect.append(optionELement)
        });

        console.log(data.data.continents)
    })

continentSelect.addEventListener('change', async e => {
    countriesList.innerHTML = ''
    const { data } = await queryFetch(continentCountriesQuery, e.target.value)
    data.continent.countries.forEach(country => {
        const liElement = document.createElement('li')
        liElement.innerText = country.name
        countriesList.append(liElement)
    })



    // console.log(data.continent.countries)
})

function queryFetch(query, code) {
    return fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query,
            variables: {
                "code": code
            }
        }),

    }).then(res => res.json())
}