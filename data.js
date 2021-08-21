function Data () {
  this.getData = () => {
    //top
    planesStyle[0] = [
      {x: 0, y: 0},
      {x: 0, y: -1},
      {x: 0, y: 1},
      {x: 0, y: 2},
      {x: -1, y: 0},
      {x: 1, y: 0},
      {x: -1, y: 2},
      {x: 1, y: 2}
    ]
    //right
    planesStyle[1] = [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: -1, y: 0},
      {x: -2, y: 0},
      {x: 0, y: -1},
      {x: 0, y: 1},
      {x: -2, y: -1},
      {x: -2, y: 1}
    ]
    //bottom
    planesStyle[2] = [
      {x: 0, y: 0},
      {x: 0, y: 1},
      {x: 0, y: -1},
      {x: 0, y: -2},
      {x: -1, y: 0},
      {x: 1, y: 0},
      {x: -1, y: -2},
      {x: 1, y: -2}
    ]
    //left
    planesStyle[3] = [
      {x: 0, y: 0},
      {x: -1, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 0, y: -1},
      {x: 0, y: 1},
      {x: 2, y: -1},
      {x: 2, y: 1}
    ]
  }
}