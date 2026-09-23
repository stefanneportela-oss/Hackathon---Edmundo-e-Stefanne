RETRATOS FLUTUANTES — Seção "Text Reveal" (manifesto)
=====================================================

Coloque aqui as IMAGENS DEFINITIVAS que emolduram a frase central da seção de
texto (componente src/components/TextReveal.jsx).

COMO SUBIR
----------
1. Adicione seus arquivos NESTA pasta (public/portraits/) com exatamente estes
   nomes:

     portrait-1.jpg
     portrait-2.jpg
     portrait-3.jpg
     portrait-4.jpg
     portrait-5.jpg
     portrait-6.jpg

   (pode ser .jpg / .png / .webp — se mudar a extensão, ajuste a constante
    LOCAL_EXT no topo de TextReveal.jsx)

2. No TextReveal.jsx, troque a flag USE_LOCAL_PORTRAITS para true (fica logo no
   topo do arquivo). Enquanto estiver false, a seção usa placeholders do
   Unsplash.

RECOMENDAÇÕES
-------------
- Formato retrato (vertical), proporção ~4:5.
- ~320x400px já basta (os cards são pequenos). Evite arquivos pesados.
- Figura centralizada — os cards têm cantos arredondados e um leve gradiente
  escuro por cima para integrar ao tema dark.

Arquivos em public/ são servidos direto pela raiz, então o caminho final fica
"/portraits/portrait-1.jpg" etc. Não precisa importar no código.
