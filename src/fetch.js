import { rapidapi } from "./env";
const Serverdomain = "https://bookandshoprails.herokuapp.com/";


const Serverdomainurls = {
    "Return all items in db": `${Serverdomain}items`,
    "Return all users in db": `${Serverdomain}users`,
    "Return item picture using id":(id) => `${Serverdomain}res/${id}.jpeg`
}

const dbkeys = {
    "domain": Serverdomain,
    ...Serverdomainurls,
}


const Defaultstate = {
    Pagehomepath: {
        previewid: 0,
    },
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
    const { listfields } = dbkeys

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
                    debugger;
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