import { rapidapi } from "./env";
const Serverdomain = "https://bookandshoprails.herokuapp.com/";
const Serverrapidapi = "https://motorcycle-specs-database.p.rapidapi.com";

const Rapidapiurls = {
    "Get all Models by Make ID and Year": (makeid,year) => `https://motorcycle-specs-database.p.rapidapi.com/model/make-id/${makeid}/${year}`,
    "Get Article image as media content": (articleid) =>`https://motorcycle-specs-database.p.rapidapi.com/article/${articleid}/image/media`
}

const Serverdomainurls = {
}

const dbkeys = {
    "domain": Serverdomain,
    "domainthemealdb": Serverrapidapi,
    ...Rapidapiurls,
    ...Serverdomainurls,
}


const Defaultstate = {
    appstate: {
        bookcart: [],
        shopcart: []
    },
    session: {
        active: false,
        activesession: {
            id: false,
            valid: false,
            nick: undefined,
            mail: undefined,
            password: undefined,
            bookcart: [],
            shopcart: []
        }
    },
}

const detectItems = (item) => {
    let ans;
    const { listfields } = mealdbkeys

    Object.keys(listfields).forEach(e => {
        ans = listfields[e].every(ee => item.hasOwnProperty(ee)) ? e : ans;
    })

    return ans;
}

function fetcher(url, call) {
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": rapidapi,
            "x-rapidapi-host": "motorcycle-specs-database.p.rapidapi.com",
        },
    }

    let d = {
        fetch: (u) => {
            fetch(u || url, options)
                .then((res) => res.json())
                .then(call,
                    (error) => {
                        console.log(error)
                    }
                );
        },
        fetchAll: () => {
            let cond_0 = url.hasOwnProperty(0)
            if (cond_0) {
                url.forEach(u =>
                    d.fetch(u)
                )
            }
        },
        fetchandwaitAll: () => {
            let cond_0 = url.hasOwnProperty(0)
            if (cond_0) {
                Promise.all(url.map(e => fetch(e, options).then(resp => {
                    console.log(resp); return resp.json()
                }))).then(call)
            }
        },
        fetchcrudOperation: (operation = 'GET', body, parameters = '') => {
            
            let fetchurl = url + parameters + ((operation === 'GET') ? `?${body}` : '')

            fetch(fetchurl, {
                ...options,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: operation,
                body: operation === 'GET' ? undefined : JSON.stringify(body)
            }).then(resp => {
                
                return resp.json()
            }).then(call)
        }
    }

    return d;
}

export { dbkeys, fetcher, detectItems, Defaultstate }