// Chave da API para autenticação com o serviço OpenWeatherMap
const key = "0adc1b192a9e1bcd9145899a43368bbd";

// Função assíncrona para buscar os dados da cidade no servidor da API
async function SearchServerCity(city) {
  // Verifica se o usuário digitou alguma cidade
  if (city !== "") {
    // Faz uma requisição à API do OpenWeatherMap e aguarda a resposta em JSON
    const apiserver = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    ).then((response) => response.json());

    // Chama a função para exibir os dados retornados na tela
    showDataOnScreen(apiserver);
  } else {
    // Exibe um alerta caso o campo esteja vazio
    alert("Por favor, digite um nome de uma cidade !");
  }
}

// Função que pega o valor digitado no input e chama a função de busca
const Search = () => {
  // Obtém o valor do input de cidade pelo ID
  const inputcity = document.getElementById("inputnamecity").value;

  // Chama a função para buscar dados do servidor usando a cidade informada
  SearchServerCity(inputcity);
};

// Adiciona um evento de clique ao ícone de busca
document.getElementById("search").addEventListener("click", Search);

// Função que exibe os dados retornados da API na interface
const showDataOnScreen = (data) => {
  // Atualiza o nome da cidade no elemento com ID "namecity"
  document.getElementById("namecity").innerHTML = `Tempo em ${data.name}`;

  // Exibe a temperatura arredondada no elemento com ID "temp"
  document.getElementById("temp").innerHTML = `${Math.floor(data.main.temp)}ºC`;

  // Exibe a descrição do clima (ex.: nublado, ensolarado) no elemento "description"
  document.getElementById("description").innerHTML = `${data.weather[0].description}`;

  // Exibe a umidade no elemento com ID "humidity"
  document.getElementById("humidity").innerHTML = `Umidade: ${data.main.humidity}%`;

  // Define o ícone correspondente ao clima retornado pela API
  document.getElementById('img-description').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
};
