let newsession = Object.entries({
    "user": {
        holder: "Type an email",
        type: "email",
        regex: '([a-zA-Z0-9]+[\.|_|\-]*)*@(gmail|hotmail|live|yahoo)\.(com|es)?'
    },
    "password": {
        holder: "Type a Password",
        type: "password",
    }
})

let newuser = Object.entries({
    "user": {
        holder: "Type an email",
        type: "email",
        regex: '([a-zA-Z0-9]+[\.|_|\-]*)*@(gmail|hotmail|live|yahoo)\.(com|es)?',
    },
    "password": {
        holder: "Type a Password",
        type: "password",
    },
    "password_confirmation": {
        holder: "Confirm Password",
        type: "password",
    },
    "nick": {
        holder: "Type a Nickname",
    }
})

let newrecipe = Object.entries({
    name: {
        holder: 'Name',
    },
    duration: {
        holder: 'Duration'
    },
    description: {
        holder: 'Quick description'
    },
    reference: {
        holder: 'Reference'
    },
    steps: {
        object: true,
        limit: 100,
        pace: {
            holder: 'Pace'
        },
        keys: {
            object: true,
            name: {
                holder: 'Name'
            }
        }
    },
    ingredients: {
        object: true,
        limit: 100,
        name: {
            holder: 'Name'
        },
        amount: {
            holder: 'amount'
        },
        reference: {
            holder: 'Reference'
        }
    }

});

let newtimer = Object.entries({
    sec: {
        holder: "Seconds",
        type: "number"
    },
    name: {
        holder: "Timer name"
    }
});

let newgrocerylist = Object.entries({
    "name": {
        holder: "Name"
    },
    "ingredients": {
        object: true,
        limit: 10,
        "ingredient": {
            holder: 'Ingredient',
        },
        "stock": {
            holder: 'Stock Amount',
            maxedcorebox_x: 8
        },
        "market_reference": {
            holder: 'Market Reference'
        }
    }
})

let newprofilesettings = {
    "mail": {
        holder: "Type an email",
    },
    "password": {
        holder: "Type a Password",
        type: "password",
    },
    "confirmpassword": {
        holder: "Confirm Password",
    },
    "nick": {
        holder: "Type a Nickname",
    }
};

let newcomment = Object.entries({
    author: {
        holder: 'Author',
        required: false,
        regex: "",
    },
    body: {
        holder: 'Body'
        
    },
    entry_date: {
        holder: 'Entry Date',
        required: false,
        regex: "",
    },
    reference: {
        object: true,
        limit: 1,
        required: false,
        regex: "",
        
        reference_type: {
            holder: '0: Recipe | 1: Post | 2: Comment',
            required: false,
            regex: "",
        },
        reference_id: {
            holder: 'Reference id',
            required: false,
            regex: "",
        }
    },
})

let settingskeys = ["object", "limit", "holder", "type", "required", "regex"]
function surroundedbrackets(string) { return string.split("]").filter(e => (e[0] === '[')).map(e => e.replace('[', '')) }

export {
    newsession,
    newtimer,
    newuser,
    newprofilesettings,
    newgrocerylist,
    settingskeys,
    newrecipe,
    newcomment,
    surroundedbrackets
}
