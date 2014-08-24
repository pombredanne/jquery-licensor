var lc = ['c','cc','ccby','ccnc', 'ccsa', 'ccnd', 'rars0', 'rars6', 'rars12', 'rars16', 'rars18'];

var logotimer = setInterval(updateLogo, 2000);

function updateLogo(){
    $('#logolic').removeClass().addClass('avkl-' + lc[Math.floor(Math.random()*lc.length)]);    
}

//$('#logolic').velocity({opacity: 0}, {duration: "slow", loop: true})