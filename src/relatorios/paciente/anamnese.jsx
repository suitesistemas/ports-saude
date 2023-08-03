import pdfMake  from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

function anamnesePDF(anamnese, nomepessoa){
  pdfMake.vfs = pdfFonts.pdfMake.vfs; //configurando o pdfMake para trabalhar com as fontes customizadas
  
  const reportTitle = [
    {
      text: 'Anamnese',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45]
    }
  ];
  
  const details = [
    {
      table:{
        headerRows: 1,
        widths: ['*'],
        body: [
          [
            {text: nomepessoa, style: 'tableHeader', fontSize: 12}
          ],

          [
            {text: anamnese, fontSize: 11, margin: [0, 2, 0, 2]}
          ]
        ]
      },
      
      layout: 'headerLineOnly'
    }
  ];  
  
  function Rodape(currentPage, pageCount){
    return [
      {
        text: currentPage + ' / ' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 0]
      }
    ]
  }

  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40], //left, top, rigth, botton
    header: [reportTitle],
    content: [details], //corpo do relatorio
    footer: Rodape
  }

  pdfMake.createPdf(docDefinitions).download();
}

export default anamnesePDF;
