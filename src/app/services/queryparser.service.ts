
export class QueryParser {


  constructor() {}

  parse(userQuery: string): string {

    // var isStandardTerm = function(str) { return (str.includes('=')) }
    var isStandardTerm = function(str) { return (str.indexOf("=") > -1) }
    // var isBareTerm = function(str) { return !(str.includes('=')) }
    var isBareTerm = function(str) { return (str.indexOf("=") == -1) }

    var terms = userQuery.split(' ')
    console.log(terms.length + ' QUERY TERMS: ' + terms)

    var standardTerms = terms.filter(isStandardTerm)
    var bareTerms = terms.filter(isBareTerm)


    if (standardTerms == undefined) { standardTerms = [] }
    if (bareTerms == undefined) { bareTerms = [] }

    var standardSearchTerm = ""
    var bareSearchTerm = ""

    standardTerms.forEach(function(term) {standardSearchTerm += term+"&" })
    bareTerms.forEach(function(term) {bareSearchTerm += "title="+term+"&" })

    standardSearchTerm = standardSearchTerm.slice(0,-1)
    bareSearchTerm = bareSearchTerm.slice(0,-1)

    console.log('standardSearchTerm: ' + standardSearchTerm)
    console.log('bareSearchTerm: ' + bareSearchTerm)

    var apiQuery

    var regexNumber = /^[1-9][0-9]*$/

    if (regexNumber.test(userQuery) ) {

      return `id=${userQuery}`
    }

    if ((standardSearchTerm == undefined) || (standardSearchTerm == '')) {

      apiQuery = bareSearchTerm

    } else if ((bareSearchTerm == undefined) || (bareSearchTerm == '')) {

      apiQuery = standardSearchTerm

    } else {

      apiQuery = bareSearchTerm + '&' + standardSearchTerm
    }

    console.log('PARSED QUERY: ' + apiQuery)

    return apiQuery

  }

}

