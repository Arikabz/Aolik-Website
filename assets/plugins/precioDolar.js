var today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDate();



function getFetch(){
    const token = 'bb58f8e32551c64b613e7d2540de86db6de991c3a631053bdc70b7852f43ff18';
    const url = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF60653/datos/oportuno?token=${token}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        localStorage.setItem('precioDolar',data.bmx.series[0].datos[0].dato);
        localStorage.setItem('date',`${day}.${month}.${year}`);
        console.log(data.bmx.series[0].datos[0].dato);
      })
      .catch(err => {
          console.log(`error ${err}`);
      });
}
window.addEventListener("load", function(event) {
    if(!localStorage.getItem('precioDolar')){
        getFetch();
    }
    else if(localStorage.getItem('date')!==`${day}.${month}.${year}`){
        getFetch();
    }
  });