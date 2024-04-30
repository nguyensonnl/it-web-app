/*
Print1:

 ******
 *****
 ***
 **
 *

*/

function print1(n) {
  let starLine = "";

  for (let row = 1; row <= n; row++) {
    for (let star = 1; star <= n; star++) {
      if (star <= n + 1 - row) {
        starLine += "* ";
      } else {
        starLine += " ";
      }
    }
    starLine += "<br/>";
  }
  document.write(starLine);
}

print1(10);
