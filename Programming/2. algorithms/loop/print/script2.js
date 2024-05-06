let show = "";
for (let i = 1; i <= 5; i++) {
  for (let j = 1; j <= 5; j++) {
    if (i === 1 || i === 5) {
      show += "* ";
    } else {
      show += " ";
    }
  }
  show += "<br/>";
}

document.write(show);
