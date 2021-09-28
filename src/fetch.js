import { rapidapi } from "./env";
// const Serverdomain = "http://127.0.0.1:3000/";
const Serverdomain = "https://bookandshoprails.herokuapp.com/";

const Serverdomainurls = {
    "Return all items in db": `${Serverdomain}items`,
    "Return all users in db": `${Serverdomain}users`,
    "Return item picture using id":(id) => `${Serverdomain}res/${id}.jpeg`,
    "users_crud":`${Serverdomain}users`,
    "items_crud":`${Serverdomain}items`,
    "sessions_crud":`${Serverdomain}sessions`,
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
            id:undefined,
            user: undefined,
            bookcart: [],
            shopcart: []
        }
    },
    system: { isfocusinput: false }
}
function buildFormData(formData, data, parentKey) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
  
      formData.append(parentKey, value);
    }
  }
  
function jsonToFormData(data) {
const formData = new FormData();

buildFormData(formData, data);

return formData;
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
                },
                method: operation,
                body: operation === 'GET' ? undefined : jsonToFormData(body)
            }).then(resp => {
                
                return resp.json()
            }).then(call)
        }
    }

    return d;
}

export { dbkeys, fetcher, Defaultstate }