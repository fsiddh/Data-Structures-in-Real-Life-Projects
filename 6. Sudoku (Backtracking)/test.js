//to be completed by student
function isSafe(board, sr, sc, val) {
    for (var row = 0; row < 9; row++) {
        if (board[row][sc] == val) {
            return false;
        }
    }

    for (var col = 0; col < 9; col++) {
        if (board[sr][col] == val) {
            return false;
        }
    }

    var x = (sr/3)*3;
    var y = (sc/3)*3;

    for (var i=x; i<x+3; x++){
        for (var j=y; j<y+3; y++){
            if (board[i][j] == val){
                return false;
            }
        }
    }

    return true;
}

//to be completed by student
function solveSudokuHelper(board, sr, sc) {
    console.log("1234")
    if (sr == 9){
        changeBoard(board);
        return;
    }

    if (sc == 9){
        solveSudokuHelper(board, sr+1, 0)
        return;
    }

    if (board[sr][sc] != 0){
        solveSudokuHelper(board, sr, sc+1);
        return;
    }

    for (var i=1; i<=9; i++){
        if (isSafe(board, sr, sc, i)){
            board[sr][sc] = i;
            solveSudokuHelper(board, sr, sc+1);
            board[sr][sc] = 0;
        }
    }
}