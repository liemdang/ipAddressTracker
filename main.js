const api_key = "at_QJZHIyDJgJj9tCF3ZhIlwwPVUe0Ir"

let input = document.querySelector(".header_input_container")
let ipInfo = document.getElementById("ip_id")
let locationInfo = document.getElementById("location_id")
let timezoneInfo = document.getElementById("timezone_id")
let ispInfo = document.getElementById("isp_id")
let mymap

input.addEventListener("submit", function(event) {
    event.preventDefault()
    loadIpData()
});

function loadIpData() {

    let ipValue
    if(mymap !== undefined) {
        ipValue = input[0].value
    } else {
        ipValue = ""
    }
    
    $(function () { 
        $.ajax({ 
            url: "https://geo.ipify.org/api/v1", 
            data: {apiKey: api_key, ipAddress: ipValue, domain: ipValue}, 
            success: function(data) { 
                if(mymap !== undefined) {
                    mymap.remove()
                }

                mymap = L.map('mapid').setView([data.location.lat, data.location.lng], 14); 
                L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoibGllbTkxIiwiYSI6ImNrcHh1OHN4bTAxYXAyb3JyczJrcmg5Y3MifQ.uchYUbWz84KPtY5nrv7HfA'
                }).addTo(mymap);
                const customIcon = L.divIcon({
                    html: '<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>'
                })
                    L.marker([data.location.lat, data.location.lng], {icon: customIcon}).addTo(mymap)

                    ipInfo.innerHTML = data.ip; 
                    locationInfo.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`; 
                    timezoneInfo.innerHTML = data.location.timezone;
                    ispInfo.innerHTML = data.isp
            },
            error: function(){
                alert("Please enter valid domain or ip address")
            }
        });
    }); 
}

if(ipInfo.innerHTML === "") {
    loadIpData()
}

        