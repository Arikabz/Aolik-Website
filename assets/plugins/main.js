// const consultar = document.querySelector('#consultarBtn');
// consultar.addEventListener('click',popupText());
const consultar = document.querySelector('#consultarBtn');
consultar.addEventListener('click',popupText());


function popupText(){

    let productName = document.querySelector('#productName').innerText;
    document.querySelector('#productTitle').innerText = productName;
    let usdPrice = document.querySelector('#usdPrice').innerText;
    document.querySelector('#usdPrice2').innerText = usdPrice;
    document.querySelector('#productDescription').innerText = `Para obtener informes de ${productName}, por favor llene la siguiente información y nos pondremos en contacto.`;
    let qty = document.querySelector('#product-quantity').value;
    document.querySelector('#message').innerText = `¡Hola! me gustaría conseguir informes acerca de ${productName}. \n Cantidad: ${qty}`;

}


// Precio dolar
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
        const prizeDl = data.bmx.series[0].datos[0].dato;
        document.querySelector('#usdToMxn').innerText += prizeDl + ' MXN';
        let priceMxn = (Number(prizeDl) * Number(document.querySelector('#usdPrice2').innerText));
        document.querySelector('#priceToMxn').innerText += Math.round(priceMxn*100)/100;    
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
    else{
        setPrice();
    }

    });

function setPrice(){
const precioDolar = localStorage.getItem('precioDolar');
document.querySelector('#usdToMxn').innerText += precioDolar + ' MXN';
var priceMxn = (Number(precioDolar) * Number(document.querySelector('#usdPrice2').innerText));
document.querySelector('#priceToMxn').innerText += Math.round(priceMxn*100)/100;    
}    


