
import FetchApi from './Functionapi';
const FetchApis = new FetchApi()

export async function runnumberDocument(idtype) {
  let arraydata = null
  let numbers = 0;

  await FetchApis.FethcGet(`/runningdocument/runningByYear/${idtype}`).then(res => {

    if (res) {
      console.log(res)
        let count = parseInt(res.data[0].running) + 1
        numbers = count
      //  arraydata=res.data[0].runningformate+'-'+res.data[0].years+'-'+numbers
      arraydata = res.data[0].runningformate + '-' + formatNumber(numbers)

    }

  })
  
  return arraydata;

}

function formatNumber(num) {
  return String(num).padStart(5, '0')
}



