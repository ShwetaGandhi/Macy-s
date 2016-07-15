/**
 * Created by sgandhi on 7/14/16.
 */
/* make a jsonp call to externally stored data */
function cmsCallback(json) {
    resultData = json.categories.EnglishEvents2015.entries;
    createListView(resultData);
}

$.ajax({
    url: "http://d345h07ts0fu2m.cloudfront.net/379/data48.json",
    dataType: "jsonp"
});

/* creating element directly on webPage*/
function createListView(resultData) {
    var mainDiv = document.createElement('div');
    mainDiv.className = "outerDiv";
    var divBody = document.createElement('div');
    var i = 0;
    resultData.forEach(function (eachData) {
        var insideDiv = document.createElement('div');
        insideDiv.className = "infoDiv";

        var whenDiv = document.createElement('div');
        whenDiv.className = "whenDiv";
        var cell1 = document.createElement('div');
        cell1.appendChild(document.createTextNode("WHEN : " + eachData.day + "th " + eachData.month));
        whenDiv.appendChild(cell1);

        var cell2 = document.createElement('div');
        cell2.className = "timeDiv";
        cell2.appendChild(document.createTextNode(eachData.time));
        whenDiv.appendChild(cell2);

        insideDiv.appendChild(whenDiv);
        var cell3 = document.createElement('div');
        cell3.className = "locDiv";
        cell3.appendChild(document.createTextNode("WHERE: " + eachData.storename));
        insideDiv.appendChild(cell3);

        var ancorDiv = document.createElement('div');
        ancorDiv.className = "ancorDiv";
        var cell4 = document.createElement('a');
        cell4.href = "#" + "div" + i;
        cell4.id = "myBtn" + i;
        cell4.className = "trial";
        cell4.innerHTML = "See more details..."
        cell4.setAttribute('data-id', i)
        ancorDiv.appendChild(cell4);
        insideDiv.appendChild(ancorDiv);

        divBody.appendChild(insideDiv);
        i++;
    });


    mainDiv.appendChild(divBody);
    document.body.appendChild(mainDiv);

    //getting the exact clicked element and displaying data in rotating manner.
    $('a.trial').colorbox({
        html: function (index) {
            var id = $(this).attr('data-id')
            var data = '<div class="storeNm">' + resultData[id].storename + '</div>' + '<div>' + resultData[id].floor + '</div>';
            data += '<div class="otherinfo">' + 'Address: ' + resultData[id].street + ', ' + resultData[id].city + ', ' + resultData[id].state + ', ' + resultData[id].zip + '</div>';
            data += '<div class="otherinfo">' + resultData[id].desc + '</div>'
            if (resultData[id].rsvp != "N\/A") {
                data += '<div class="otherinfo">' + 'Click Here : <a href =>' + resultData[id].rsvp + '</a>' + '</div>'
            }
            return data;
        },
        rel: 'group1',
        width: '50%'
    })

}



