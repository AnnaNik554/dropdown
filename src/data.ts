interface ILangData {
  prefix: string,
  file: string,
  title: string
}

const reqSvgs = require.context('./img', true, /\.svg$/)
const languagesList: {[key: string]: string} = {
  'ru': 'Русский', 
  'ang': 'Английский', 
  'esp': 'Испанский',
  'de': 'Немецкий', 
  'it': 'Итальянский', 
  'po': 'Польский',
}

export const langData: ILangData[] = reqSvgs
  .keys()
  .map(path => ({
  prefix: path.split('.')[1].substring(1), 
  file: reqSvgs(path),
  title: languagesList[path.split('.')[1].substring(1)]
}))
  .sort((a, b) => Object.keys(languagesList).indexOf(a.prefix) - Object.keys(languagesList).indexOf(b.prefix))