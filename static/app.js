const clear = document.querySelector('#clear');
const getRequestButton = document.querySelector('#get-request');
const postRequestButton = document.querySelector('#post-request');
const putRequestButton = document.querySelector('#put-request');
const deleteRequestButton = document.querySelector('#delete-request');
let getRequest, postRequest, putRequest, deleteRequest;

const request = new XMLHttpRequest();

const urlTarget = `${window.location.href}request`;

window.addEventListener('load', () => {
    if (localStorage.getItem('GET') === null) {
        localStorage.setItem('GET', '0');
    }
    getRequest = localStorage.getItem('GET');
    if (localStorage.getItem('POST') === null) {
        localStorage.setItem('POST', '0');
    }
    postRequest = localStorage.getItem('POST');
    if (localStorage.getItem('PUT') === null) {
        localStorage.setItem('PUT', '0');
    }
    putRequest = localStorage.getItem('PUT');
    if (localStorage.getItem('DELETE') === null) {
        localStorage.setItem('DELETE', '0');
    }
    deleteRequest = localStorage.getItem('DELETE');

    let chart_data = [getRequest, postRequest, deleteRequest, putRequest];
    const labels = [
        'GET',
        'POST',
        'DELETE',
        'PUT'
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'Requests',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(125, 220, 125)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4,
            data: chart_data
        }]
    };

    const config = {
        type: 'pie',
        data: data,
        options: {}
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
});

clear.addEventListener('click', () => {
    localStorage.clear();
    localStorage.setItem('GET', '0');
    localStorage.setItem('POST', '0');
    localStorage.setItem('PUT', '0');
    localStorage.setItem('DELETE', '0');
    location.reload();
});

getRequestButton.addEventListener('click', () => {
    request.open('GET', urlTarget, true);
    request.onload = () => {
        console.log(request.response);
        let getResponse = JSON.parse(request.response);
        getRequest = Number(getRequest + getResponse['GET']);
        localStorage.setItem('GET', String(getRequest));
        location.reload();
    };
    request.send(null);
});

postRequestButton.addEventListener('click', () => {
    // post
    request.open('POST', urlTarget, true);
    request.onreadystatechange = () => {
        postRequest = JSON.parse(request.response);
        localStorage.setItem('POST', String(postRequest['POST']));
        location.reload();
    };
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({'POST': postRequest}));
});

putRequestButton.addEventListener('click', () => {
    // put
    request.open('PUT', urlTarget, true);
    request.onreadystatechange = () => {
        putRequest = JSON.parse(request.response);
        localStorage.setItem('PUT', String(putRequest['PUT']));
        location.reload();
    };
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({'PUT': putRequest}));
});

deleteRequestButton.addEventListener('click', () => {
    // delete
    request.open('DELETE', urlTarget, true);
    request.onreadystatechange = () => {
        deleteRequest = JSON.parse(request.response);
        localStorage.setItem('DELETE', String(deleteRequest['DELETE']));
        location.reload();
    };
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({'DELETE': deleteRequest}));
});
