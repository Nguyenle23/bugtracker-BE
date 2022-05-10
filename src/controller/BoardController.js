const showBoard = async(req, res, next) => {
    res.send(`
      <form method="post" action="/v1/board">
      <input type="text" name="title" placeholder="Board name">
        <button id="create-board">Create board</button>
      </form>
    `);
}

const createBoard = async(req, res, next) => {
    var req = req.body.title;
    console.log(req)
}

module.exports = { showBoard, createBoard };