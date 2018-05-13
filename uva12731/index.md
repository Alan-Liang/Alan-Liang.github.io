UVa 12731 emulator
========
[Original Problem](https://uva.onlinejudge.org/external/127/12731.pdf) || [play](./robot.html) || ![Code Style: Really Bad](https://alan.liangcn.ml/CodeStyle.svg)

## Controls
you may perform the  `MoveRobot` task by clicking on the arrows. The result will be shown on the center of the arrow keys. Click on a cell to change its state (black:transport portal). Click on the center of arrow keys which shows the result normally to check your answer. A wrong answer is noted as a "x".

## Customizing the "space station"
By default, there is only one map - the sample case (I haven't thought of an effective way to generate maps.) To change the default map, you need to:
0. download the code.
1. count how many rows and columns ypur map has and set it to variables  `row` and  `column` separately.
2. encode your map in the following format:
```JavaScript
map=[
[0/*blocked*/,0/*blocked*/,1/*empty*/,1/*empty*/,1/*empty*/], //row 0
[1,1,1,[2,1]/*teleport to second of row 2*/,1], //row 1
[1,[1,3],1,1,1], //row 2
[1,1,1,1,0] //row 3
];
var pos=[2,0]; //starting position is the first one in row 2
```
and replace the variables in  `robot.js` .

3. open the page and enjoy!
