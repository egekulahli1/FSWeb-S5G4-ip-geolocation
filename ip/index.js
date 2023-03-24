//axios import buraya gelecek
import axios from 'axios';
var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
		return response.data
	})
	.then(function (a) {
		benimIP=a
	});
}				
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/
axios.get('https://apis.ergineer.com/ipgeoapi/46.196.78.48')
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(`Error: ${err}`);
    });
/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

function IPcard(ipInfo) {
	const card = document.createElement('div');
	card.className = 'card';

	const flag = document.createElement('img');
	flag.src = ipInfo.ülkebayrağı;
	card.appendChild(flag);

	const cardInfo = document.createElement('div');
	cardInfo.className = 'card-info';
	card.appendChild(cardInfo);
	
	const ip = document.createElement('h3');
	ip.className = 'ip';
	ip.textContent =  ipInfo.sorgu;
	cardInfo.appendChild(ip);

	const country = document.createElement('p');
	country.className = 'ulke';
	country.textContent = ipInfo.ülke + ' (' + ipInfo.ülkeKodu + ')';
	cardInfo.appendChild(country); 

	const latLong = document.createElement('p');
	latLong.textContent = 'Enlem: ' + ipInfo.enlem + ' Boylam: ' + ipInfo.boylam;
	cardInfo.appendChild(latLong);

	const city = document.createElement('p');
	city.textContent = 'Şehir: ' + ipInfo.şehir;
	cardInfo.appendChild(city);

	const timezone = document.createElement('p');
	timezone.textContent = 'Saat dilimi: ' + ipInfo.saatdilimi;
	cardInfo.appendChild(timezone);

	const currency = document.createElement('p');
	currency.textContent = 'Para birimi: ' + ipInfo.parabirimi;
	cardInfo.appendChild(currency);

	const isp = document.createElement('p');
	isp.textContent = 'ISP: ' + ipInfo.isp;
	cardInfo.appendChild(isp);

	return card;
}
	


/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

axios.get('https://apis.ergineer.com/ipgeoapi/46.196.78.48')
.then(response => {
	const ipInfo = response.data;
	const card = IPcard(ipInfo);
	cardsContainer.appendChild(card);
})
.catch(err => {
	console.error(`Error: ${err}`);
});

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

const cardsContainer = document.querySelector('.cards');

ipAdresimiAl().then(() => {

  var url = "https://apis.ergineer.com/ipgeoapi/" + benimIP;


  axios.get(url)
    .then(response => {
      const ipInfo = response.data;
      const card = IPcard(ipInfo);
      cardsContainer.appendChild(card);
    })
    .catch(err => {
      console.error(`Error: ${err}`);
    });
});

//kodlar buraya gelecek