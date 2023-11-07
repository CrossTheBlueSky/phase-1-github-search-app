const searchForm = document.getElementById("github-form")
const paramToggle = document.getElementById("search-param")
const userList = document.getElementById("user-list")
const repoList = document.getElementById("repos-list")
let currentParam = "Username"

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    searchHandler(e.target[0].value)
})

paramToggle.addEventListener("change", (e)=>{
    currentParam = e.target.value
})


function searchHandler(query){

    const searchObj = {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    }

    if(currentParam === "Username"){

    fetch(`https://api.github.com/search/users?q=${query}`, {searchObj})
    .then((res)=>res.json())
    .then((data)=>{
        userList.innerHTML = ""
        repoList.innerHTML = ""
        data.items.forEach((user)=>displayUser(user))
    })
    }else if(currentParam === "Repositories"){
    
    fetch(`https://api.github.com/users/${query}/repos`, {searchObj})
    .then((res)=>res.json())
    .then((data)=>{
        repoList.innerHtml = ""
        userList.innerHTML = ""
        data.forEach((result)=>displayRepos(result))
    })

    }

}

function displayUser(user){

    const card = document.createElement("div")
    card.innerHTML = `
    <a href=${user.html_url}> <h4>${user.login}</h4></a>
    <img src=${user.avatar_url} />
    `
    userList.append(card)
    
}

function displayRepos(repo){
    const card = document.createElement("div")
    card.innerHTML = `
    <a href=${repo.html_url}><h5>${repo.name}</a></h5>
    `
    repoList.append(card)
}