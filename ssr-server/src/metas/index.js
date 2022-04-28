// expressとvue両方のpassを含めます。そのためjsで書いてます。
export const DEFAULT_TITLE = 'Apps'

export const metas = {
  // Vue
  "/" :{
    title: 'top',
    description: 'top'
  },
  "/about" :{
    title: 'about',
    description: 'about'
  },
  "/yamabiko" :{
    title: 'やまびこ',
    description: '書き込むとやまびこが帰ってきます。'
  },
  "/history" :{
    title: 'やまびこ履歴',
    description: 'やまびこの履歴を表示します。'
  },
  "/yamabiko-res" :{
    title: 'YamabikoResponse',
    description: 'YamabikoResponse'
  },

  // exprss
}

export const getMeta = (path)=>{
  if(path === '') path = '/'
  
  let htmlTitle = DEFAULT_TITLE
  let htmlDescription = ''
  try{
    htmlTitle = metas[path].title
    htmlDescription = metas[path].description
  }catch{
    htmlTitle = DEFAULT_TITLE
    htmlDescription = ''
  }
  return {htmlTitle, htmlDescription}
}