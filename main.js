

if (!sessionStorage.getItem('token')) {
    location.pathname = 'D:/desktop/old/23yangi/index.html'
}

let tb = document.querySelector('tbody')
let frm = document.querySelector('#addform')
let efrm = document.querySelector('#editform')

function sendQuery() {
    fetch('https://cyberss.uz/api/dars', {
        method: 'GET',
        headers: {
            'Authorization': sessionStorage.getItem('tokenType') + ' ' + sessionStorage.getItem('token')
        }
    })
        .then(res => {
            if (res.status === 401) {
                location.pathname = 'D:/desktop/old/23yangi/index.html'
            }
            return res.json(res)
        }).then(data => render(data))
}
sendQuery()

function render(users) {
    tb.innerHTML = ''
    users.forEach(user => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.age}</td>
                <td>${user.tel}</td>
                <td>
                <button 
                data-index="${user.firstname}|${user.lastname}|${user.age}|${user.tel}|${user.id}" 
                data-bs-toggle="modal" data-bs-target="#editModal" 
                class="btn btn-success updbtn">Taxrirlash</button>
                <button data-id="${user.id}" class="btn btn-danger delbtn">O'chirish</button>
                </td>
        `
        tb.append(tr)
    });
    onDelete()
    onEdit()
}

frm.addEventListener('submit', (e) => {
    e.preventDefault()
    let user = {
        firstname: frm.firstname.value,
        lastname: frm.lastname.value,
        age: frm.age.value,
        tel: frm.tel.value,
    }
    fetch('https://cyberss.uz/api/dars', {
        method: 'POST',
        headers: {
            "Content-type": 'application/json',
            'Authorization': sessionStorage.getItem('tokenType') + ' ' + sessionStorage.getItem('token')
        },
        body: JSON.stringify(user)
    }).then((res) => {
        if (res.status === 401) {
            location.pathname = 'D:/desktop/old/23yangi/index.html'
        }
        if (res.status === 200) {
            sendQuery()
        }
    })
})

function onDelete() {
    let btns = document.querySelectorAll('.delbtn')
    console.log(btns);
    btns.forEach(el => {
        el.addEventListener('click', (e) => {
            console.log(e.target.dataset.id);
            fetch('https://cyberss.uz/api/dars/' + e.target.dataset.id, {
                method: 'DELETE',
                headers: {
                    'Authorization': sessionStorage.getItem('tokenType') + ' ' + sessionStorage.getItem('token')
                }
            }).then(res => {
                if (res.status === 401) {
                    location.pathname = 'D:/desktop/old/23yangi/index.html'
                }
                if (res.status === 200) {
                    sendQuery()
                }
            })
        })
    })
}

function onEdit() {
    let editbtns = document.querySelector('.updbtn')
    editbtns.forEach(btn => {
        btn.addEventListener('click', ()=>{
            let datas = btn.dataset.index.split('|')
            console.log(datas);
            efrm.firstname.value = datas[0]
            efrm.lastname.value = datas[1]
            efrm.age.value = datas[2]
            efrm.tel.value = datas[3]
            efrm.id.value = datas[4]
        })
    })
}

efrm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let user = {
        firstname: efrm.firstname.value,
        lastname: efrm.lastname.value,
        age: efrm.age.value,
        tel: efrm.tel.value
    }
    fetch('https://cyberss.uz/api/dars/' + efrm.id.value, {
        method: 'PUT',
        headers: {
            "Content-type": 'application/json',
            'Authorization': sessionStorage.getItem('tokenType') + ' ' + sessionStorage.getItem('token')
        },
        body: JSON.stringify(user)
    }).then((res) => {
        if (res.status === 401) {
            location.pathname = 'D:/desktop/old/23yangi/index.html'
        }
        if (res.status === 200) {
            sendQuery()
        }
    })
})
