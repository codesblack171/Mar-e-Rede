/* Conteúdo da reportagem separado da estrutura visual. */
const DADOS_REPORTAGEM = window.DADOS_REPORTAGEM;

document.addEventListener("DOMContentLoaded", () => {
  const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
  const hero = DADOS_REPORTAGEM.capa;

  $("#heroKicker").textContent = hero.kicker;
  $("#heroTitulo").textContent = hero.titulo;
  $("#heroSubtitulo").textContent = hero.subtitulo;
  $("#heroAutoria").textContent = hero.autoria;
  $("#heroImagem").style.backgroundImage = `url("${hero.foto}")`;

  const introducao = $("#introducao");
  DADOS_REPORTAGEM.intro.forEach(paragrafo => {
    const p = document.createElement("p");
    p.textContent = paragrafo;
    introducao.appendChild(p);
  });

  // Brasão enviado junto ao material: identificação visual do município retratado.
  const selo = document.createElement("figure");
  selo.className = "territorio-selo";
  const brasao = document.createElement("img");
  brasao.src = "imagens/brasao-imbituba.png";
  brasao.alt = "Brasão do município de Imbituba";
  brasao.loading = "lazy";
  const legendaBrasao = document.createElement("figcaption");
  legendaBrasao.textContent = "Imbituba, Santa Catarina · território desta fotorreportagem";
  selo.append(brasao, legendaBrasao);
  introducao.appendChild(selo);

  const capitulos = $("#capitulos");
  DADOS_REPORTAGEM.capitulos.forEach((capitulo, indice) => {
    const secao = document.createElement("section");
    secao.className = "capitulo";
    if (indice === 1) secao.id = "capitulo-tainha";

    const cabecalho = document.createElement("header");
    cabecalho.className = "capitulo-cabecalho";
    const numero = document.createElement("span");
    numero.className = "capitulo-numero";
    numero.textContent = `Capítulo ${String(indice + 1).padStart(2, "0")}`;
    const titulo = document.createElement("h2");
    titulo.textContent = capitulo.titulo;
    cabecalho.append(numero, titulo);
    secao.appendChild(cabecalho);

    const corpo = document.createElement("div");
    corpo.className = "capitulo-corpo";
    capitulo.texto.forEach(texto => {
      const p = document.createElement("p");
      p.textContent = texto;
      corpo.appendChild(p);
    });
    secao.appendChild(corpo);

    if (capitulo.citacao) {
      const citacao = document.createElement("blockquote");
      citacao.className = "citacao";
      citacao.appendChild(document.createTextNode(capitulo.citacao.texto));
      const autor = document.createElement("small");
      autor.textContent = capitulo.citacao.autor;
      citacao.appendChild(autor);
      secao.appendChild(citacao);
    }

    if (capitulo.fotos && capitulo.fotos.length) {
      const galeria = document.createElement("div");
      galeria.className = "galeria";
      capitulo.fotos.forEach(foto => {
        const figura = document.createElement("figure");
        figura.className = `foto ${foto.layout === "larga" ? "larga" : "meia"}`;
        const imagem = document.createElement("img");
        imagem.className = "foto-img";
        imagem.src = foto.src;
        imagem.alt = foto.legenda || "Imagem ilustrativa da costa";
        imagem.loading = "lazy";
        imagem.decoding = "async";
        const legenda = document.createElement("figcaption");
        legenda.appendChild(document.createTextNode(foto.legenda || ""));
        const credito = document.createElement("small");
        credito.textContent = foto.credito || "";
        legenda.appendChild(credito);
        figura.append(imagem, legenda);
        galeria.appendChild(figura);
      });
      secao.appendChild(galeria);
    }
    capitulos.appendChild(secao);
  });

  $("#rodapeTitulo").textContent = DADOS_REPORTAGEM.rodape.titulo;
  $("#rodapeTexto").textContent = DADOS_REPORTAGEM.rodape.texto;

  // Navegação compacta para celulares.
  const botaoMenu = $("#menuToggle");
  const menu = $("#menu");
  botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    botaoMenu.textContent = aberto ? "×" : "☰";
  });
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.setAttribute("aria-label", "Abrir menu");
      botaoMenu.textContent = "☰";
    });
  });
});
