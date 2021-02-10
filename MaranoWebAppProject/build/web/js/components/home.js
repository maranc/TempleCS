function home () {
    var cont = `
        
        <h2>Dota Team Central</h2>
        <img src="dota_heroes.png" alt="heroes" 
        style="width:17%;margin-right:32px;border-radius:9px;">
        <p>
        This is Dota Team Central. Our goal here is to provide our users with the most accurate and informative information on
        the strongest team comps in dota right now. We seek to allow our users to input their ideas for the greatest teams possible and
        let your peers review and rate your ideas given their opinions. If you are looking for more information on just dota heroes alone,
        please check out <a href="https://www.dotabuff.com" id="aid">Dotabuff</a>.
        </p> 
    `;
    var elem = document.createElement("div");
    elem.innerHTML = cont;
    return elem; 
}