/**
 * <b>selectTab</b> Ação que seleciona uma determinada aba e retorna o tipo da action creator e o payload com o id da tab 
 * @param tabId (id da aba)
 * OBS: Ação do tipo Action Creator
 * retorna a action e o payload com o target(ancora) da aba
 */

 export function selectTab(tabId) {

    return {
        type: 'TAB_SELECTED',
        payload: tabId
    }
 }

/**
 * <b>showTabs</b> Recebe um conjunto de IDS (ancoras) separados por virgulas os ids informados serão exibidos sem o parametro disabled
 * defido ao parametro recebido por meio do spread (...) irá ser gerado um array
 * @param  {...any} tabIds 
 */
 export function showTabs(...tabIds) {

   
    const tabsToShow = {}
    //para cada item do array ele irá criar um objeto em tabsToShow exemplo : {tabList: true, tabCreate: true}
    tabIds.forEach( e => tabsToShow[e] = true );
    console.log(tabsToShow);
    return {
        type: 'TAB_SHOWED',
        payload: tabsToShow
    }

 }