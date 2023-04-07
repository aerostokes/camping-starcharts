
const authString = btoa("ea9664be-c82f-48f1-acb7-3226214a38fb:e666dcfef554590bed0540538be22b6c278cb6b2cf58b6a1a09cfbf6c70bee4f7485ef3585e14f139bccfb85fe86025358856b4e114dc39a65c902da164dd07a935b84c7f4bb0d88df64375645b67e317db68daee7419a2a60f73e44d455314bb817459dbf995184a51ca614936814d7");

init()

// Callback functions
function init() {
    fetch("https://api.astronomyapi.com/api/v2/bodies", {
        headers: {
            Authorization: `basic ${authString}`
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
    })
}