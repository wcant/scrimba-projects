export default function PlayerNumForm() {
  const numPlayerForm = document.createElement("form");
  numPlayerForm.id = "playerNumForm";
  numPlayerForm.insertAdjacentHTML(
    "afterbegin",
    `
          <h2>Select the Number of Players</h2>
              <legend>
                  <div class='btn-container'>
                      <div>
                          <label for='2players' tabindex='0' class='label-btn checked'>2</label>
                          <input type='radio' name='numplayers' id='2players' value='2' checked required>
                      </div>
                      <div>
                          <label for='3players' tabindex='0' class='label-btn'>3</label>
                          <input type='radio' name='numplayers' id='3players' value='3'>
                      </div>
                      <div>
                          <label for='4players' tabindex='0' class='label-btn'>4</label>
                          <input type='radio' name='numplayers' id='4players' value='4'>
                      </div>
                      <div>
                          <label for='5players' tabindex='0' class='label-btn'>5</label>
                          <input type='radio' name='numplayers' id='5players' value='5'>
                      </div>
                      <div>
                          <label for='6players' tabindex='0' class='label-btn'>6</label>
                          <input type='radio' name='numplayers' id='6players' value='6'>
                      </div>
                  </div>
                  <div class='btn-container'>
                      <button type='submit' class='btn btn-red' tabindex='0' id='playersSetBtn'>Go!!!</button>
                  </div>
              </legend>
              `
  );

  return numPlayerForm;
}
