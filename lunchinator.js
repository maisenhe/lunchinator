$(document).ready(function () {
    // Setup some variables. 
    // This is where we read in the contents of LocalStorage. I may need to add in a check to
    // see if it exsits and if not init it.
    console.log(localStorage.getItem("tester"));
    if (localStorage.getItem("tester") === null) {
        var resturantList = [];
        console.log("Setup new empty array");
        alert("no storage found setting up new array");
    } else if (localStorage.getItem("tester") !== null) {
        var initList = localStorage.getItem('tester');
        var resturantList = JSON.parse(initList);
        console.log("using existing array");
        alert("Found existing storage using it");
    }
    var resturantTypesList = ['none', 'American', 'Chinese', 'Indian', 'Pizza', 'Italian', 'Japanese', 'Sushi', 'Sandwich', 'Burger', 'Mexican', 'Thai', 'fast food', 'BBQ', 'German', 'Tapas', 'Pub food', 'Seafood', 'Greek', 'Chicken Fingers'];
    var dataFields = ['name', 'tags', 'userid', 'dateVisted', 'rating', 'foodType', 'cost'];
    var searchCriteria = {};


    // Time to hardcode the list for now.
    /*
    resturantList.push(
    Resturant("applebees", "crap", "maisenhe", "00/00/0000", 0, "American", 1),
    Resturant("Jimmy Johns", "yum, fast", "maisenhe", "12/04/2013", 4, "Sandwich", 1),
    Resturant("SugarFire Smoke House", "yum, PORK", "maisenhe", "11/15/2013", 5, "BBQ", 2),
    Resturant("Raising Cains", "chicken", "maisenhe", "12/02/2013", 4, "Chicken Fingers", 1),
    Resturant("Elephant Bar", "Shrimp", "maisenhe", "11/29/2013", 3, "American", 3),
    Resturant("Blue Sky", "bar, pub grub", "maisenhe", "11/15/2013", 3, "Pub food", 2),
    Resturant("Bristols Seafood", "seafood, date night", "emilym", "10/29/2013", 5, "Seafood", 4),
    Resturant("McAlisters", "patatoe, tea", "maisenhe", "09/29/2013", 3, "American", 3),
    Resturant("Buffalo Wild Wings", "wings, long wait", "maisenhe", "09/29/2010", 3, "American", 3),
    Resturant("Llwelyns", "Welsh, beer", "maisenhe", "10/29/2010", 4, "Pub grub", 3),
    Resturant("Deweys", "pizza, Dr Dre", "maisenhe", "10/29/2010", 5, "Pizza", 3),
    Resturant("Oishi", "sushi", "maisenhe", "10/29/2010", 3, "Sushi", 3),
    Resturant("El Magua\'s", "yummy", "maisenhe", "10/29/2010", 4, "Mexican", 3),
    Resturant("Sam\'s Chowder House", "seafood", "maisenhe", "07/19/2012", 5, "Seafood", 4),
    Resturant("Olympia", "greek, fire cheese", "maisenhe", "00/00/0000", 4, "Greek", 3));
    */



    var setupDrops = function (selector, list) {
        $.each(list, function (key, value) {
            $(selector).append($('<option></option>', {
                value: value
            }).text(value));
        });
    };
    setupDrops('#foodType', resturantTypesList);
    setupDrops('#addFoodType', resturantTypesList);

    function Resturant(name, tags, userid, dateVisted, rating, foodType, cost) {
        this.name = name;
        this.tags = tags;
        this.userid = userid;
        this.dateVisted = dateVisted;
        this.rating = rating;
        this.foodType = foodType;
        this.cost = cost;
        return {
            name: name,
            tags: tags,
            userid: userid,
            dateVisted: dateVisted,
            rating: rating,
            foodType: foodType,
            cost: cost
        };
    }
    //    result = Math.floor(Math.random() * resturantList.length);


    Resturant.searchByCatagory = function () {
        $("#resultOutput").empty();
        $("#resultOutput").append("<hr> <b> Results resturant </b> <hr>");
        var resultResturant = resturantList.filter(

        function (place) {
            return (
            contains(place,
            searchCriteria));
        });

        for (var items = 0; items < resultResturant.length; items++) {

            for (var temp = 0; temp < dataFields.length; temp++) {
                $("#resultOutput").append("<br />", dataFields[temp], " |  ", resultResturant[items][dataFields[temp]]);
            }
            $("#resultOutput").append("<hr />");

        }
    };

    Resturant.saveToDisk = function (arrayName) {
        localStorage.setItem('tester', JSON.stringify(resturantList));
        console.log("Data saved to localStorage");
    };

    Resturant.add = function (name, tags, userid, dateVisted, rating, foodType, cost) {
        resturantList.push(Resturant(name, tags, userid, dateVisted, rating, foodType, cost));
        console.log("yeah I put it in the array");
        console.log(resturantList);
    };

    Resturant.displayDisk = function () {
        var retrievedObject = localStorage.getItem('tester');
        var messedUp = JSON.parse(retrievedObject);
        $("#debug").empty();
        for (var counter = 0; counter < messedUp.length; counter++) {

            for (var inner = 0; inner < dataFields.length; inner++) {
                $("#debug").append("<br />", dataFields[inner], " |  ", messedUp[counter][dataFields[inner]]);
            }
            $("#debug").append("<hr />");
        }
    };
    Resturant.deleteAllItemsOnDisk = function () {
        localStorage.removeItem('tester');
        console.log("It's all GONE!");
    };




    //From Calvin
    var contains = function (obj, other) {
        return Object.keys(other).every(function (key) {
            if (key == 'rating') {
                return other[key] <= obj[key];
            } else if (key == 'cost') {
                return other[key] >= obj[key];
            } else {
                return other[key] == obj[key];

            }
        });
    };

    $('#rating').change(function () {
        if ($(this).val() == ("none" || "")) {
            delete searchCriteria.rating;
        } else {
            searchCriteria.rating = $(this).val();
        }
    });
    $('#cost').change(function () {
        if ($(this).val() == ("none" || "")) {
            delete searchCriteria.cost;
        } else {
            searchCriteria.cost = $(this).val();
        }
    });
    $('#foodType').change(function () {
        if ($(this).val() == ("none" || "")) {
            delete searchCriteria.foodType;
        } else {
            searchCriteria.foodType = $(this).val();
        }
    });
    // end donated code




    $("#searchplace").click(function () {
        console.log(searchCriteria);
        Resturant.searchByCatagory();
    });
    $("#addplace").click(function () {
        if ($("#newplace").val()) {
            Resturant.add($("#newplace").val(), $("#tags").val(), $("#userid").val(), $("#date").val(), $("#rating").val(), $("#type").val(), $("#cost").val());

        } else {
            //   $("#foo").html(placeList);
        }

    });
    $("#saveMe").click(function () {
        Resturant.saveToDisk(resturantList);
    });
    $("#showMe").click(function () {
        Resturant.displayDisk();
    });
    $("#deleteMe").click(function () {
        Resturant.deleteAllItemsOnDisk();
    });


});