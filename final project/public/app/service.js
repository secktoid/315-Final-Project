var JUNGLECOOKFINAL = (function () {
  var _db;

  var _getAllData = function (callback) {
    _db
      .collection("Recipe")
      .get()
      .then(function (querySnapshot) {
        callback(querySnapshot);
      });
  };

  var _updateData = function (
    id,
    rImage,
    rName,
    rDesc,
    rTime,
    rSize,
    ingredient,
    instruction
  ) {
    let recipeData = {
      recipeImage: rImage,
      recipeName: rName,
      recipeDescription: rDesc,
      recipeTotalTime: rTime,
      recipeServingSize: rSize,
      ingredients: ingredient,
      instructions: instruction,
    };

    _db

      .collection("Recipe")
      .doc(id)
      .update(recipeData)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        callback("New Recipe Added");
      })
      .catch(function (error) {
        console.log("Error adding document: ", error);
      });
  };

  var _addData = function (
    rImage,
    rName,
    rDesc,
    rTime,
    rSize,
    ingredient,
    instruction
  ) {
    console.log(rImage);
    console.log(rName);
    let recipeData = {
      recipeImage: rImage,
      recipeName: rName,
      recipeDescription: rDesc,
      recipeTotalTime: rTime,
      recipeServingSize: rSize,
      ingredients: ingredient,
      instructions: instruction,
    };

    _db

      .collection("Recipe")
      .add(recipeData)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        callback("New Recipe Added");
      })
      .catch(function (error) {
        console.log("Error adding document: ", error);
      });
  };

  var _deleteData = function (id) {
    _db.collection("Recipe").doc(id).delete();
    console.log("DELETED!!");
  };

  var _getBrowseContent = function () {
    let browseContent = `<div class="mainContentBrowse"></div>`;
    return browseContent;
  };

  var _getHomeContent = function () {
    let homeContent = `<div class="mainContentHome">
    <div class="indexPinkCircle">
      <div class="pinkContent">
        Want to be a Jungle Cook? Go ahead and the kitchen is yours!
      </div>
    </div>
    <div class="indexYellowCircle">
      <div class="yellowContent">
        <h4>The Jungle Cook</h4></br>
        <p>
          The home to various recipes of your choice. Add your own recipe
          today and fill the world with joy!
        </p>
      </div>
    </div>
  </div>`;

    return homeContent;
  };

  var _getcreateRecipeContent = function (id) {
    let cRContent = `
       <div class="mainContentEditRecipe">
        <div class="cRTop cRContainers">
        <p style="font-family: 'caveat-bold'; font-size: '25px';">Hey User, create your recipe!</p>
          <input id="rImage" type="text" placeholder="Add Recipe Image(put url of image)" />
          <input id="rName" type="text" placeholder="Recipe Name" />
          <input id="rDesc" type="text" placeholder="Recipe Description" />
          <input id="rTime" type="text" placeholder="Recipe Total Time" />
          <input id="rSize" type="text" placeholder="Recipe Serving Size" />
        </div>
        <div class="cRMiddle cRContainers">
        <p>Enter Ingredients:</p>
          <div class="ingredientList"><input name="ingreds[]" id="ingredient" type="text" placeholder="Ingredient #1" />
          </div>
          <button id="${id}" class="IngredAddInput">add input</button>
        </div>
        <div class="cRBottom cRContainers">
        <p>Enter Instructions:</p>
          <div class="instructionList"><input name="instruct[]" id="instruction" type="text" placeholder="Instruction #1" />
          </div>
          <button id="${id}" class="instructAddInput">add input</button>
          
        </div>
        <div class=bottomSaveButton><button id="${id}" class="saveData">Save Data</button></div>
      </div>`;

    return cRContent;
  };

  var _getDisplayRecipeContent = function (id) {
    let recipeContent = ``;
    return recipeContent;
  };

  var _getEditDataContent = function (id) {
    let editContent = `<div class="mainContentEditRecipeE"></div><div class="bottomEditSaveButton" style="align-text:center;"><button id="${id}" class="editSaveData">Save Data</button><button id="${id}" class="deleteData">Delete Data</button></div>`;

    return editContent;
  };

  var _initFirebase = function (callback) {
    firebase
      .auth()
      .signInAnonymously()
      .then(function (result) {
        console.log("connected");
        _db = firebase.firestore();
        callback();
      });
  };

  return {
    initFirebase: _initFirebase,
    addData: _addData,
    updateData: _updateData,
    getAllData: _getAllData,
    deleteData: _deleteData,
    getcreateRecipeContent: _getcreateRecipeContent,
    getHomeContent: _getHomeContent,
    getBrowseContent: _getBrowseContent,
    getDisplayRecipeContent: _getDisplayRecipeContent,
    getEditDataContent: _getEditDataContent,
  };
})();
