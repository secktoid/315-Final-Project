var idn = 0;

function initNavButtons() {
  homeNav();
  createRecipeNav();
  browseNav();
  bars();
}

function bars() {
  let navOpen = false;
  $(".bars").click(function (e) {
    if (navOpen) {
      $("#navBar").css("display", "none");
      navOpen = false;
    } else {
      $("#navBar").css("display", "flex");
      navOpen = true;
    }
  });
}

function createRecipeNav() {
  $("#createButt").click(function (e) {
    $(".linkActiveB").removeClass("active");
    $(".linkActiveH").removeClass("active");
    $(".linkActiveC").addClass("active");
    console.log("create page");
    $("#allContent").html(JUNGLECOOKFINAL.getcreateRecipeContent());
    IngredAddInput();
    InstructAddInput();
    saveButton();
  });
}

function homeNav() {
  $("#homeButt").click(function (e) {
    $(".linkActiveB").removeClass("active");
    $(".linkActiveH").addClass("active");
    $(".linkActiveC").removeClass("active");
    console.log("home page");
    $(".modal").css("display", "flex");
    $("#allContent").html(JUNGLECOOKFINAL.getHomeContent());
  });
}

function browseNav() {
  $("#browseButt").click(function (e) {
    $(".linkActiveB").addClass("active");
    $(".linkActiveH").removeClass("active");
    $(".linkActiveC").removeClass("active");
    console.log("browse page");
    $("#allContent").html(JUNGLECOOKFINAL.getBrowseContent());
    JUNGLECOOKFINAL.getAllData(displayData);
    console.log(idn);
  });
}

function editRecipeNav() {
  $(".editRecipeBtn").click(function (e) {
    var id = e.currentTarget.id;
    $("#allContent").html(JUNGLECOOKFINAL.getEditDataContent(id));
    JUNGLECOOKFINAL.getAllData(editRecipe);
  });
}

function IngredAddInput() {
  let testArray = [];
  let num = 1;
  $(".IngredAddInput").click(function (e) {
    let ingredientName = `$(<input type="text" class="fieldname${num}" />`;
    let testConsole = testArray.push(ingredientName);
    num += 1;
    $(".ingredientList").append(
      `<input name="ingreds[]" type="text" class="fieldname${num}" placeholder="Ingredient #${num}" />`
    );
    console.log("AI" + testArray);
  });
}

function InstructAddInput() {
  let testArray = [];
  let num = 1;
  $(".instructAddInput").click(function (e) {
    console.log("clicked");
    let ingredientName = `$(<input type="text" class="fieldname${num}" />`;
    let testConsole = testArray.push(ingredientName);
    num += 1;
    $(".instructionList").append(
      `<input name="instruct[]" type="text" class="instruction${num}" placeholder="Instruction #${num}" />`
    );
    console.log("AI" + testArray);
  });
}

function editSaveButton(id) {
  $(".editSaveData").click(function (e) {
    e.preventDefault();

    var ingreds = $("input[name^=ingreds]")
      .map(function (idx, elem) {
        return $(elem).val();
      })
      .get();

    var instructs = $("input[name^=instruct]")
      .map(function (idx, elem) {
        return $(elem).val();
      })
      .get();

    console.log("update data");
    let rImage = $("#rImageE").val().trim().toLowerCase();
    let rName = $("#rNameE").val().trim().toLowerCase();
    let rDesc = $("#rDescE").val().trim().toLowerCase();
    let rTime = $("#rTimeE").val().trim().toLowerCase();
    let rSize = $("#rSizeE").val().trim().toLowerCase();
    let ingredient = ingreds;
    let instruction = instructs;

    if (
      rImage != "" &&
      rName != "" &&
      rDesc != "" &&
      instruction != "" &&
      rTime != "" &&
      rSize != ""
    ) {
      console.log("add data");

      JUNGLECOOKFINAL.updateData(
        id,
        rImage,
        rName,
        rDesc,
        rTime,
        rSize,
        ingredient,
        instruction
      );
      //   $("#name-input").val("");
      //   $("#rating-input").val("");
      //   $("#number-input").val("");
    } else {
      alert("add data");
    }
    $("#allContent").html(JUNGLECOOKFINAL.getBrowseContent());
    JUNGLECOOKFINAL.getAllData(displayData);
  });
}

function saveButton() {
  $(".saveData").click(function (e) {
    e.preventDefault();

    var ingreds = $("input[name^=ingreds]")
      .map(function (idx, elem) {
        return $(elem).val();
      })
      .get();

    var instructs = $("input[name^=instruct]")
      .map(function (idx, elem) {
        return $(elem).val();
      })
      .get();

    console.log("add data");
    let rImage = $("#rImage").val();
    let rName = $("#rName").val().trim().toLowerCase();
    let rDesc = $("#rDesc").val().trim().toLowerCase();
    let rTime = $("#rTime").val().trim().toLowerCase();
    let rSize = $("#rSize").val().trim().toLowerCase();
    let ingredient = ingreds;
    let instruction = instructs;
    console.log(rImage);
    if (
      rImage != "" &&
      rName != "" &&
      rDesc != "" &&
      instruction != "" &&
      rTime != "" &&
      rSize != ""
    ) {
      console.log("add data");

      JUNGLECOOKFINAL.addData(
        rImage,
        rName,
        rDesc,
        rTime,
        rSize,
        ingredient,
        instruction
      );
      //   $("#name-input").val("");
      //   $("#rating-input").val("");
      //   $("#number-input").val("");
    } else {
      alert("add data");
    }
    $("#allContent").html(JUNGLECOOKFINAL.getBrowseContent());
    JUNGLECOOKFINAL.getAllData(displayData);
  });
}

function clickRecipe() {
  $(".clicker").click(function (e) {
    var id = e.currentTarget.id;
    $("#allContent").html(JUNGLECOOKFINAL.getDisplayRecipeContent(id));
    console.log("clicked");
    JUNGLECOOKFINAL.getAllData(displayRecipe);
    idn = id;
  });
}

function displayData(addData) {
  console.log(addData);
  var container = `<div>`;
  var num = 0;
  addData.forEach(function (doc) {
    var id = doc.id;
    var rawData = doc.data();
    container += ` <div class="recipes">
    <div class="recipeBox">
        <div id="${num}" class="rPLeft clicker" style="cursor: pointer; background-color: white;
        background-image: 
        url(${rawData.recipeImage})"></div>
            <span class="recipeData">
              <div class="rPRight">
                <p class="rName" id="${id}">${rawData.recipeName}</p>
                <span class="recipeText"> 
                  <p class="rDesc" id="${id}">${rawData.recipeDescription}</p>
                    <div class="timeServingsContainer">
                      <span class="timeImages">
                        <img src="../img/time.svg" alt="time" style="width: 23px;" />
                        <img src="../img/servings.svg" alt="servings" style="width: 23px;" />
                      </span>
                      <span class="timeP>
                        <p class="rMin" id="${id}">${rawData.recipeTotalTime} min</p>
                        <p class="rSize" id="${id}"> ${rawData.recipeServingSize} servings</p>
                      </span>
                    </div>
                </div>
            </span>
        </div>
    </div>
    </div>`;
    num += 1;
    console.log(num);
  });
  container += "</div>";
  $(".mainContentBrowse").html(container);
  clickRecipe();
}

function displayRecipeNav() {
  $("#browseButt").click(function (e) {
    console.log("browse page");
    $("#allContent").html(JUNGLECOOKFINAL.getDisplayRecipeContent());
  });
}

function editRecipe(addData) {
  var doc = addData.docs[idn];
  var id = doc.id;
  var rawData = doc.data();
  var instNum = 0;
  let end = `" /></br>`;
  let abs = `<div class="instruction"><input name="instruct[]"  type="text" placeholder="instruction" value="`;

  var instructArray = rawData.instructions;
  var rHTML = $.map(instructArray, function (value) {
    instNum += 1;
    return abs + value + end;
  });
  rHTML = rHTML.toString().replace(/,/g, "");

  let asd = `<div class="ingredientList"><input name="ingreds[]"  type="text" placeholder="Ingredient" value="`;

  var ingHTML = rawData.ingredients;
  console.log(ingHTML);
  var ingHTML = $.map(ingHTML, function (value) {
    instNum += 1;
    return asd + value + end;
  });
  ingHTML = ingHTML.toString().replace(/,/g, "");
  console.log(ingHTML);

  // $(".vrInstruction").html(rHTML.join(""));
  // console.log(rHTML);

  var container = `
        <div class="editContainer">
          <div class="editContainerTop">
              <p style="font-family: 'caveat-bold'; font-size: '25px';">Hey User, create your recipe!</p>
              <input id="rImageE" type="text" placeholder="Add Recipe Image(put url of image)" value="${rawData.recipeImage}" />
              <input id="rNameE" type="text" placeholder="Recipe Name" value="${rawData.recipeName}" />
              <input id="rDescE" type="text" placeholder="Recipe Description" value="${rawData.recipeDescription}" />
              <input id="rTimeE" type="text" placeholder="Recipe Total Time" value="${rawData.recipeTotalTime}" />
              <input id="rSizeE" type="text" placeholder="Recipe Serving Size" value="${rawData.recipeServingSize}" />
            </div>

            <div class="editContainerMiddle">
              <p>Enter Ingredients:</p>
                <div class="ingredientList">
                  ${ingHTML}
                </div>
              <button id="" class="IngredAddInput">add input</button>
            </div>
            </div>

            <div class="editContainerBottom">
              <p>Enter Instructions:</p>
                <div class="instructionList">
                  ${rHTML}
                </div>
              <button id="" class="instructAddInput">add input</button>
            </div>
            
            </div></div>
    `;
  $(".mainContentEditRecipeE").html(container);
  IngredAddInput();
  InstructAddInput();
  editSaveButton(id);
  deleteDataButton(id);
}

function displayRecipe(addData) {
  var doc = addData.docs[idn];
  console.log(doc);
  var id = doc.id;
  var rawData = doc.data();
  console.log(rawData.instruction);
  var instNum = 0;
  var instructArray = rawData.instructions;
  var rHTML = $.map(instructArray, function (value) {
    instNum += 1;
    return "<span>" + instNum + ". " + value + "</span></br>";
  });
  rHTML = rHTML.toString().replace(/,/g, "");

  var ingredArray = rawData.ingredients;
  ingredArray = ingredArray.toString().replace(/,/g, "</br>");
  // $(".vrInstruction").html(rHTML.join(""));
  // console.log(rHTML);

  var container = ` </div>
  <div class="viewRecipeContent">
  <h1 style="writing-mode: vertical-lr;
  transform: rotate(-180deg); 
  text-align: right; 
  margin-right: 10px; 
  margin-top: 50px;">${rawData.recipeName}</h1>
    <div class="receipeContainer">
      <div class="recipeTop">
        <div class="recipeTopImage">
        <img style="width: 500px; padding-right:30px;" src="${rawData.recipeImage}" alt=""></div>
        <div class="recipeTopText">
          <h1>Description:</h1>
          <p>${rawData.recipeDescription}</p>
          <h2>Total Time:</h2>
          <p>${rawData.recipeTotalTime}</p>
          <h2>Servings:</h2>
          <p>${rawData.recipeServingSize}</p>
        </div>
      </div>
      <div class="recipeBottom">
        <div class="viewRecipeIngredients">
          <h2>Ingredients:</h2>
          <p>${ingredArray}</p>
        </div>
        <div class="viewRecipeInstructions">
          <h2>Instructions:</h2>
          <p class="vrInstruction">${rHTML}</p>
        </div>
        <button id="${id}" class="editRecipeBtn">Edit</button>
      </div>
    </div>`;
  $("#allContent").html(container);
  editRecipeNav();
}

function deleteDataButton() {
  $(".deleteData").click(function (e) {
    var id = e.currentTarget.id;
    JUNGLECOOKFINAL.deleteData(id);
    $("#allContent").html(JUNGLECOOKFINAL.getBrowseContent());
    JUNGLECOOKFINAL.getAllData(displayData);
  });
}

function alertUser(result) {
  alert(result);
}

$(document).ready(function () {
  JUNGLECOOKFINAL.initFirebase();
  $("#allContent").html(JUNGLECOOKFINAL.getHomeContent());
  // displayRecipeNav();
  // browseNav();
  initNavButtons();
});
