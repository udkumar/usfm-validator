var parentArr =[]

var childArr = [ 'ft Some older versions read, ',
      'fqa And we are writing these things to you so that your joy will be complete. ',
      'fqb  ',
      'f*' ];

var data = {};
data.children = [];
for (var j = 0; j < childArr.length; j++) {
  let split = childArr[j].split(" ");
  data.children.push({
     marker: split[0],
     value: ((split[1] == "" ||split[1] == undefined) ? null : split.slice(1).join(" "))
  });
}
console.log(data.children);

parentArr.push(data.children)
console.log(parentArr)
