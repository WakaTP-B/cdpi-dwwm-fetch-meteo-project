function main() {

    const search = document.querySelector('.search-bar');
    const cityInput = document.querySelector('.city');

    if (search) {
        search.addEventListener('submit', e => {
            e.preventDefault();

        });
    }
}
main();

function searchCity (){
    
}



/**
 * S'execute quand l'utilisateur a accepté la geolocalisation.
 * 
 * @param {*} position_obj 
 */
function onPosition(position_obj) {

}